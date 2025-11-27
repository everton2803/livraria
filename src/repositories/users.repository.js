const db = require('../database/sqlite');
const User = require('../models/user.model');

class UsersRepository {
    async findById(id) {
        const row = await db.get('SELECT id, username, created_at FROM users WHERE id = ?', [id]);
        return row ? User.fromDB(row) : null;
    }
    async findByUsername(username) {
        const row = await db.get('SELECT id, username, password_hash, email, created_at FROM users WHERE username = ?', [username]);
        return row || null; // inclui password_hash
    }
    async findByEmail(email) {
        const row = await db.get('SELECT id, username, password_hash, email,  created_at FROM users WHERE email = ?', [email]);
        return row || null; // inclui password_hash
    }
    async create({ username, passwordHash, email }) {
        const result = await db.run('INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)', [username, passwordHash, email]);
        console.log(result);

        const row = await db.get('SELECT id, username, email, created_at FROM users WHERE id = ?', [result.lastInsertRowid]);
        return User.fromDB(row);
    }
}

module.exports = UsersRepository;