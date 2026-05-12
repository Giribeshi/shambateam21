const express = require('express');
const router = express.Router();
const User = require('../../models/models/User');
const { authenticateToken, requireAdmin } = require('../../middleware/middleware/auth');

// All admin routes require authenticated admin
router.use(authenticateToken, requireAdmin);

// GET /api/admin/stats - dashboard metrics
router.get('/stats', async (req, res) => {
  try {
    const stats = await User.getStats();
    res.json({ stats });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Failed to load stats', message: err.message });
  }
});

// GET /api/admin/users - list with optional search/filter
router.get('/users', async (req, res) => {
  try {
    const { q, role, location } = req.query;
    let users = await User.getAllUsers();

    if (q) {
      const needle = String(q).toLowerCase();
      users = users.filter(u =>
        (u.name || '').toLowerCase().includes(needle) ||
        (u.email || '').toLowerCase().includes(needle) ||
        (u.phone || '').toLowerCase().includes(needle)
      );
    }
    if (role)     users = users.filter(u => u.role === role);
    if (location) users = users.filter(u => u.location === location);

    res.json({ users, total: users.length });
  } catch (err) {
    console.error('Admin users list error:', err);
    res.status(500).json({ error: 'Failed to load users', message: err.message });
  }
});

// GET /api/admin/users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...safe } = user;
    res.json({ user: safe });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load user', message: err.message });
  }
});

// POST /api/admin/users - create user with role
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role, location, phone, farmSize, primaryCrops } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Validation failed', message: 'name, email, password required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Validation failed', message: 'Password must be at least 6 chars' });
    }
    const user = await User.adminCreate({ name, email, password, role, location, phone, farmSize, primaryCrops });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: 'Create failed', message: err.message });
  }
});

// PUT /api/admin/users/:id - update user
router.put('/users/:id', async (req, res) => {
  try {
    // Guard: prevent admin from demoting themselves and locking out
    if (req.params.id === req.user.id && req.body.role && req.body.role !== 'admin') {
      return res.status(400).json({ error: 'Forbidden', message: 'You cannot demote your own admin account' });
    }
    const user = await User.adminUpdate(req.params.id, req.body);
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(400).json({ error: 'Update failed', message: err.message });
  }
});

// POST /api/admin/users/:id/password - reset password
router.post('/users/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    await User.adminSetPassword(req.params.id, password);
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(400).json({ error: 'Password update failed', message: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ error: 'Forbidden', message: 'You cannot delete your own account' });
    }
    await User.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', message: err.message });
  }
});

// GET /api/admin/activity - recent activity (derived from users for now)
router.get('/activity', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const recent = users
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, 20)
      .map(u => ({
        id: u.id,
        type: u.updatedAt && u.updatedAt !== u.createdAt ? 'user.updated' : 'user.created',
        actor: u.name,
        email: u.email,
        role: u.role,
        at: u.updatedAt || u.createdAt,
      }));
    res.json({ activity: recent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load activity', message: err.message });
  }
});

// GET /api/admin/health - simple system info
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    node: process.version,
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
