const db = require('../database/sqlite');
const Favorite = require('../models/favorite.model');

class FavoritesRepository {
    async addFavorite(userId, bookId) {
        const favorite = new Favorite({ user_id: userId, book_id: bookId });
        const result = await db.run(
            'INSERT INTO favorites (user_id, book_id) VALUES (?, ?)',
            [favorite.user_id, favorite.book_id]
        );
        return this.findById(result.lastInsertRowid);
    }

    async removeFavorite(userId, bookId) {
        const result = await db.run(
            'DELETE FROM favorites WHERE user_id = ? AND book_id = ?',
            [userId, bookId]
        );
        return result.changes > 0;
    }

    async isFavorite(userId, bookId) {
        const row = await db.get(
            'SELECT id FROM favorites WHERE user_id = ? AND book_id = ?',
            [userId, bookId]
        );
        return row != null;
    }

    async findById(id) {
        const row = await db.get(
            'SELECT id, user_id, book_id, created_at FROM favorites WHERE id = ?',
            [id]
        );
        return row ? Favorite.fromDB(row) : null;
    }

    async findByUser(userId) {
        const rows = await db.all(
            'SELECT f.id, f.user_id, f.book_id, f.created_at FROM favorites f WHERE f.user_id = ? ORDER BY f.created_at DESC',
            [userId]
        );
        return rows.map(row => Favorite.fromDB(row));
    }

    async findBooksForUser(userId) {
        const rows = await db.all(
            `SELECT l.id, l.titulo, l.autor, l.categoria, l.ano, l.numeropaginas, l.editora
             FROM favorites f
             JOIN livros l ON f.book_id = l.id
             WHERE f.user_id = ?
             ORDER BY f.created_at DESC`,
            [userId]
        );
        return rows;
    }

    async deleteAllByUser(userId) {
        const result = await db.run(
            'DELETE FROM favorites WHERE user_id = ?',
            [userId]
        );
        return result.changes;
    }

    async deleteAllByBook(bookId) {
        const result = await db.run(
            'DELETE FROM favorites WHERE book_id = ?',
            [bookId]
        );
        return result.changes;
    }
}

module.exports = FavoritesRepository;
