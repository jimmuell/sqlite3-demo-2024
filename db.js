const sqlite3 = require('sqlite3');
const { promisify } = require('util');

class Database {
  constructor() {
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Connected to in-memory SQLite database');
      }
    });
    
    // Promisify database operations
    this.run = promisify(this.db.run.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
  }

  async init() {
    try {
      await this.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
      console.log('Users table created');
      return true;
    } catch (err) {
      console.error('Table creation error:', err);
      return false;
    }
  }

  async addUsers(users) {
    const stmt = this.db.prepare("INSERT INTO users (name) VALUES (?)");
    for (const user of users) {
      await promisify(stmt.run.bind(stmt))(user);
    }
    await promisify(stmt.finalize.bind(stmt))();
    console.log('Users added successfully');
  }

  async getUsers() {
    try {
      const users = await this.all("SELECT id, name FROM users");
      return users;
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    }
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = Database;