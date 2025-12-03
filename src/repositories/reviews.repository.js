const db = require('../database/sqlite');
const Review = require('../models/review.model');

function create(reviewData) {
    const info = db.run(
        'INSERT INTO reviews (user_id, book_id, rating, comment) VALUES (?, ?, ?, ?)',
        [reviewData.user_id, reviewData.book_id, reviewData.rating, reviewData.comment || null]
    );

    const row = db.get('SELECT * FROM reviews WHERE id = ?', [info.lastInsertRowid]);
    return row ? new Review(row) : null;
}

function findByBook(bookId) {
    const rows = db.all('SELECT r.*, u.username FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.book_id = ? ORDER BY r.created_at DESC', [bookId]);
    return rows.map(r => new Review(r));
}

function findByUser(userId) {
    const rows = db.all('SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows.map(r => new Review(r));
}

function findById(id) {
    const row = db.get('SELECT * FROM reviews WHERE id = ?', [id]);
    return row ? new Review(row) : null;
}

function remove(id) {
    const info = db.run('DELETE FROM reviews WHERE id = ?', [id]);
    return info.changes > 0;
}

module.exports = {
    create,
    findByBook,
    findByUser,
    findById,
    remove,
};
