const sqlite3 = require('sqlite3');
const { promisify } = require('util');

class Database {
  constructor() {
    this.db = new sqlite3.Database('./data.db', (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Connected to SQLite database');
        this.init();
      }
    });
    
    this.run = promisify(this.db.run.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
  }

  async init() {
    try {
      await this.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL
        )
      `);
      console.log('Users table initialized');
    } catch (err) {
      console.error('Table initialization error:', err);
    }
  }

  async getUsers() {
    return this.all("SELECT * FROM users ORDER BY id DESC");
  }

  async getUser(id) {
    return this.get("SELECT * FROM users WHERE id = ?", id);
  }

  async createUser(name, email) {
    return this.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
  }

  async updateUser(id, name, email) {
    return this.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
  }

  async deleteUser(id) {
    return this.run("DELETE FROM users WHERE id = ?", id);
  }
}

// Create a singleton instance
const db = new Database();
module.exports = db;