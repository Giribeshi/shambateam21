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
    if (process.env.SEED_DEMO === 'true') {
      await this.seedDemoFarmers();
    }
  }

  async seedDemoFarmers() {
    const demoFarmers = [
      { name: 'Neema Joseph',     email: 'neema.j@demo.tz',    location: 'arusha',        farmSize: 'small',  crops: ['maize', 'beans'],            phone: '+255712110001' },
      { name: 'Juma Mwangi',      email: 'juma.m@demo.tz',     location: 'kilimanjaro',   farmSize: 'medium', crops: ['coffee', 'beans'],           phone: '+255712110002' },
      { name: 'Grace Mushi',      email: 'grace.m@demo.tz',    location: 'mbeya',         farmSize: 'small',  crops: ['rice', 'maize'],             phone: '+255712110003' },
      { name: 'Hassan Said',      email: 'hassan.s@demo.tz',   location: 'morogoro',      farmSize: 'large',  crops: ['rice', 'cassava'],           phone: '+255712110004' },
      { name: 'Amina Hamisi',     email: 'amina.h@demo.tz',    location: 'tanga',         farmSize: 'medium', crops: ['cassava', 'maize'],          phone: '+255712110005' },
      { name: 'Peter Kileo',      email: 'peter.k@demo.tz',    location: 'iringa',        farmSize: 'small',  crops: ['tomatoes', 'onions'],        phone: '+255712110006' },
      { name: 'Fatuma Bakari',    email: 'fatuma.b@demo.tz',   location: 'mwanza',        farmSize: 'medium', crops: ['rice', 'maize'],             phone: '+255712110007' },
      { name: 'Daniel Maro',      email: 'daniel.m@demo.tz',   location: 'dodoma',        farmSize: 'small',  crops: ['sorghum', 'millet'],         phone: '+255712110008' },
      { name: 'Esther Ng\'wandu', email: 'esther.n@demo.tz',   location: 'mbeya',         farmSize: 'medium', crops: ['maize', 'beans'],            phone: '+255712110009' },
      { name: 'Salim Khalid',     email: 'salim.k@demo.tz',    location: 'zanzibar',      farmSize: 'small',  crops: ['cassava', 'tomatoes'],       phone: '+255712110010' },
      { name: 'Rehema Mtui',      email: 'rehema.m@demo.tz',   location: 'arusha',        farmSize: 'large',  crops: ['maize', 'tomatoes', 'beans'],phone: '+255712110011' },
      { name: 'Joseph Mlay',      email: 'joseph.m@demo.tz',   location: 'kilimanjaro',   farmSize: 'small',  crops: ['coffee'],                    phone: '+255712110012' },
    ];

    const password = await bcrypt.hash('demo123', 10);
    const baseTime = Date.now();
    let created = 0;

    for (let i = 0; i < demoFarmers.length; i++) {
      const f = demoFarmers[i];
      if (await this.userExists(f.email)) continue;
      // Stagger createdAt over the last 30 days for a realistic activity feed
      const created_at = new Date(baseTime - (demoFarmers.length - i) * 1000 * 60 * 60 * 24 * 2.5).toISOString();
      await this.insertUser({
        id: `demo-${i + 10}`,
        email: f.email,
        password,
        name: f.name,
        role: 'farmer',
        location: f.location,
        phone: f.phone,
        farmSize: f.farmSize,
        primaryCrops: JSON.stringify(f.crops),
        createdAt: created_at,
        updatedAt: created_at,
      });
      created++;
    }
    if (created > 0) console.log(`Seeded ${created} demo farmers`);
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
