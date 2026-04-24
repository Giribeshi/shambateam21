const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class User {
  constructor() {
    this.dbPath = path.join(__dirname, '../database/agrimind.db');
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
      'shambasmart-jwt-secret-key-2024',
      { expiresIn: '7d' }
    );
  }

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users', (err, rows) => {
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
