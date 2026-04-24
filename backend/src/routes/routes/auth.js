const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location, phone, farmSize, primaryCrops } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Name, email, and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid email format'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Create user
    const userData = {
      name,
      email: email.toLowerCase(),
      password,
      location: location || '',
      phone: phone || '',
      farmSize: farmSize || '',
      primaryCrops: primaryCrops || []
    };

    const user = await User.create(userData);
    const token = User.generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      error: 'Registration failed',
      message: error.message
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Email and password are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid email format'
      });
    }

    // Authenticate user
    const user = await User.validatePassword(email.toLowerCase(), password);
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password'
      });
    }

    const token = User.generateToken(user);

    res.json({
      message: 'Login successful',
      user,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: 'Internal server error'
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile not found'
      });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, location, phone, farmSize, primaryCrops } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (phone !== undefined) updateData.phone = phone;
    if (farmSize !== undefined) updateData.farmSize = farmSize;
    if (primaryCrops !== undefined) updateData.primaryCrops = primaryCrops;

    const updatedUser = await User.updateProfile(req.user.id, updateData);

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

// Verify token (for frontend to check if token is valid)
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        valid: false,
        message: 'User not found'
      });
    }

    res.json({
      valid: true,
      user
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      valid: false,
      message: 'Verification failed'
    });
  }
});

// Logout (client-side token removal, but we can add server-side token blacklisting if needed)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    message: 'Logout successful'
  });
});

module.exports = router;
