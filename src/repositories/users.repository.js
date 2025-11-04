const db = require('../database/sqlite');
const User = require('../models/user.model');

class UsersRepository {
    async findById(id) {
        const row = await db.get('SELECT id, username, name, email, created_at FROM users WHERE id = ?', [id]);
        return row ? User.fromDB(row) : null;
    }
    async findByUsername(username) {
        const row = await db.get('SELECT id, username, password_hash, name, email, created_at FROM users WHERE username = ?', [username]);
        if (!row) return null;
        const user = User.fromDB(row);
        // manter o hash disponível para comparação, mas não incluí-lo em toJSON()
        user.password_hash = row.password_hash;
        return user;
    }
    async findByEmail(email) {
        const row = await db.get('SELECT id, username, password_hash, name, email, created_at FROM users WHERE email = ?', [email]);
        if (!row) return null;
        const user = User.fromDB(row);
        user.password_hash = row.password_hash;
        return user;
    }
    async create({ username, password, name, email }) {
        const result = await db.run('INSERT INTO users (username, password_hash, name, email) VALUES (?, ?, ?, ?)', [username, password, name, email]);
        console.log(result);
        const row = await db.get('SELECT id, username, created_at FROM users WHERE id = ?', [result.lastInsertRowid]);
        return User.fromDB(row);
    }
}

module.exports = UsersRepository;