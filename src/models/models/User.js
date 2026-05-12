const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class User {
  constructor() {
    this.dbPath = path.join(__dirname, '../../../backend/database/agrimind.db');
    this.db = null;
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to SQLite database for User model');
      }
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            // Parse primaryCrops from JSON string to array
            const user = {
              ...row,
              primaryCrops: JSON.parse(row.primaryCrops || '[]')
            };
            resolve(user);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            // Parse primaryCrops from JSON string to array
            const user = {
              ...row,
              primaryCrops: JSON.parse(row.primaryCrops || '[]')
            };
            resolve(user);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  async create(userData) {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: 'farmer',
      location: userData.location || '',
      phone: userData.phone || '',
      farmSize: userData.farmSize || '',
      primaryCrops: JSON.stringify(userData.primaryCrops || []),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return new Promise((resolve, reject) => {
      const stmt = `
        INSERT INTO users (id, email, password, name, role, location, phone, farmSize, primaryCrops, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(stmt, [
        newUser.id,
        newUser.email,
        newUser.password,
        newUser.name,
        newUser.role,
        newUser.location,
        newUser.phone,
        newUser.farmSize,
        newUser.primaryCrops,
        newUser.createdAt,
        newUser.updatedAt
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          // Return user without password
          const { password, ...userWithoutPassword } = newUser;
          userWithoutPassword.primaryCrops = JSON.parse(newUser.primaryCrops);
          resolve(userWithoutPassword);
        }
      });
    });
  }

  async validatePassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(id, updateData) {
    // Convert primaryCrops to JSON string if it exists
    const updateFields = { ...updateData };
    if (updateFields.primaryCrops) {
      updateFields.primaryCrops = JSON.stringify(updateFields.primaryCrops);
    }

    const setClause = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updateFields);
    values.push(new Date().toISOString()); // updatedAt
    values.push(id);

    return new Promise((resolve, reject) => {
      const stmt = `UPDATE users SET ${setClause}, updatedAt = ? WHERE id = ?`;

      this.db.run(stmt, values, async function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error('User not found'));
          } else {
            // Get updated user without password
            const updatedUser = await User.prototype.findById.call({ db: User.prototype.db }, id);
            const { password, ...userWithoutPassword } = updatedUser;
            resolve(userWithoutPassword);
          }
        }
      });
    });
  }

  generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'shambasmart-jwt-secret-key-2024',
      { expiresIn: '7d' }
    );
  }

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users ORDER BY createdAt DESC', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const users = rows.map(row => {
            const { password, ...userWithoutPassword } = row;
            userWithoutPassword.primaryCrops = JSON.parse(row.primaryCrops || '[]');
            return userWithoutPassword;
          });
          resolve(users);
        }
      });
    });
  }

  // Admin: update any field on a user (role, email, name, etc.)
  async adminUpdate(id, updateData) {
    const allowed = ['name', 'email', 'role', 'location', 'phone', 'farmSize', 'primaryCrops'];
    const updateFields = {};
    for (const key of allowed) {
      if (updateData[key] !== undefined) updateFields[key] = updateData[key];
    }
    if (updateFields.primaryCrops) {
      updateFields.primaryCrops = JSON.stringify(updateFields.primaryCrops);
    }
    if (updateFields.email) updateFields.email = updateFields.email.toLowerCase();

    if (Object.keys(updateFields).length === 0) {
      return this.findById(id);
    }

    const setClause = Object.keys(updateFields).map((k) => `${k} = ?`).join(', ');
    const values = Object.values(updateFields);
    values.push(new Date().toISOString());
    values.push(id);

    const db = this.db;
    return new Promise((resolve, reject) => {
      const stmt = `UPDATE users SET ${setClause}, updatedAt = ? WHERE id = ?`;
      db.run(stmt, values, function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error('User not found'));
        db.get('SELECT * FROM users WHERE id = ?', [id], (e, row) => {
          if (e) return reject(e);
          const { password, ...rest } = row;
          rest.primaryCrops = JSON.parse(row.primaryCrops || '[]');
          resolve(rest);
        });
      });
    });
  }

  // Admin: reset/change password
  async adminSetPassword(id, newPassword) {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    const db = this.db;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET password = ?, updatedAt = ? WHERE id = ?',
        [hashed, new Date().toISOString(), id],
        function (err) {
          if (err) return reject(err);
          if (this.changes === 0) return reject(new Error('User not found'));
          resolve(true);
        }
      );
    });
  }

  // Admin: create user with role
  async adminCreate(userData) {
    const existing = await this.findByEmail(userData.email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      name: userData.name,
      role: userData.role || 'farmer',
      location: userData.location || '',
      phone: userData.phone || '',
      farmSize: userData.farmSize || '',
      primaryCrops: JSON.stringify(userData.primaryCrops || []),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const db = this.db;
    return new Promise((resolve, reject) => {
      const stmt = `INSERT INTO users (id, email, password, name, role, location, phone, farmSize, primaryCrops, createdAt, updatedAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.run(
        stmt,
        [newUser.id, newUser.email, newUser.password, newUser.name, newUser.role,
         newUser.location, newUser.phone, newUser.farmSize, newUser.primaryCrops,
         newUser.createdAt, newUser.updatedAt],
        function (err) {
          if (err) return reject(err);
          const { password, ...rest } = newUser;
          rest.primaryCrops = JSON.parse(newUser.primaryCrops);
          resolve(rest);
        }
      );
    });
  }

  async deleteUser(id) {
    const db = this.db;
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error('User not found'));
        resolve(true);
      });
    });
  }

  async getStats() {
    const db = this.db;
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', (err, rows) => {
        if (err) return reject(err);
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;

        const stats = {
          totalUsers: rows.length,
          admins: 0,
          farmers: 0,
          newToday: 0,
          newThisWeek: 0,
          newThisMonth: 0,
          byLocation: {},
          byFarmSize: {},
          byCrop: {},
          signupsByDay: [], // last 14 days
        };

        // signupsByDay buckets
        const dayBuckets = {};
        for (let i = 13; i >= 0; i--) {
          const d = new Date(now - i * dayMs);
          const key = d.toISOString().slice(0, 10);
          dayBuckets[key] = 0;
        }

        for (const r of rows) {
          if (r.role === 'admin') stats.admins++;
          else stats.farmers++;

          const created = new Date(r.createdAt).getTime();
          const age = now - created;
          if (age < dayMs) stats.newToday++;
          if (age < 7 * dayMs) stats.newThisWeek++;
          if (age < 30 * dayMs) stats.newThisMonth++;

          const dayKey = new Date(r.createdAt).toISOString().slice(0, 10);
          if (dayKey in dayBuckets) dayBuckets[dayKey]++;

          if (r.location) stats.byLocation[r.location] = (stats.byLocation[r.location] || 0) + 1;
          if (r.farmSize) stats.byFarmSize[r.farmSize] = (stats.byFarmSize[r.farmSize] || 0) + 1;

          try {
            const crops = JSON.parse(r.primaryCrops || '[]');
            for (const c of crops) stats.byCrop[c] = (stats.byCrop[c] || 0) + 1;
          } catch (_) {}
        }

        stats.signupsByDay = Object.entries(dayBuckets).map(([date, count]) => ({ date, count }));
        resolve(stats);
      });
    });
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        }
      });
    }
  }
}

module.exports = new User();
