const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'agrimind.db');

class Database {
  constructor() {
    this.db = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Error opening database:', err.message);
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          resolve();
        }
      });
    });
  }

  async initialize() {
    await this.connect();
    await this.createTables();
    await this.seedDefaultUsers();
  }

  async createTables() {
    return new Promise((resolve, reject) => {
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT NOT NULL,
          role TEXT DEFAULT 'farmer',
          location TEXT,
          phone TEXT,
          farmSize TEXT,
          primaryCrops TEXT,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        )
      `;

      this.db.run(createUsersTable, (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
          reject(err);
        } else {
          console.log('Users table created or already exists');
          resolve();
        }
      });
    });
  }

  async seedDefaultUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if admin user exists
        const adminExists = await this.userExists('admin@agrimind.co.tz');
        
        if (!adminExists) {
          // Create admin user
          const hashedPassword = await bcrypt.hash('admin123', 10);
          const adminUser = {
            id: '1',
            email: 'admin@agrimind.co.tz',
            password: hashedPassword,
            name: 'Agrimind Admin',
            role: 'admin',
            location: 'dar_es_salaam',
            phone: '+255123456789',
            farmSize: 'demo',
            primaryCrops: JSON.stringify(['maize', 'tomatoes']),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await this.insertUser(adminUser);
          console.log('Admin user created');
        }

        // Check if demo farmer user exists
        const farmerExists = await this.userExists('farmer@shambasmart.co.tz');
        
        if (!farmerExists) {
          // Create demo farmer user
          const hashedPassword = await bcrypt.hash('farmer123', 10);
          const farmerUser = {
            id: '2',
            email: 'farmer@shambasmart.co.tz',
            password: hashedPassword,
            name: 'John Farmer',
            role: 'farmer',
            location: 'arusha',
            phone: '+255987654321',
            farmSize: 'small',
            primaryCrops: JSON.stringify(['maize', 'tomatoes']),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await this.insertUser(farmerUser);
          console.log('Demo farmer user created');
        }

        resolve();
      } catch (error) {
        console.error('Error seeding users:', error);
        reject(error);
      }
    });
  }

  async userExists(email) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT email FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!row);
        }
      });
    });
  }

  async insertUser(user) {
    return new Promise((resolve, reject) => {
      const stmt = `
        INSERT INTO users (id, email, password, name, role, location, phone, farmSize, primaryCrops, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(stmt, [
        user.id,
        user.email,
        user.password,
        user.name,
        user.role,
        user.location,
        user.phone,
        user.farmSize,
        user.primaryCrops,
        user.createdAt,
        user.updatedAt
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed');
        }
      });
    }
  }
}

// Initialize database if run directly
if (require.main === module) {
  const database = new Database();
  database.initialize()
    .then(() => {
      console.log('Database initialized successfully');
      database.close();
    })
    .catch((error) => {
      console.error('Failed to initialize database:', error);
      database.close();
      process.exit(1);
    });
}

module.exports = Database;
