const reviewsRepository = require('../repositories/reviews.repository');

function create(req, res) {
    try {
        const userId = req.session && req.session.userId;
        if (!userId) return res.status(401).json({ erro: 'Não autenticado' });

        const { book_id, rating, comment } = req.body;
        if (!book_id || !rating) return res.status(400).json({ erro: 'book_id e rating são obrigatórios' });

        const review = reviewsRepository.create({ user_id: userId, book_id, rating, comment });
        return res.status(201).json({ review });
    } catch (err) {
        console.error('Error creating review:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor', mensagem: err.message });
    }
}

function getByBook(req, res) {
    try {
        const bookId = req.params.bookId;
        const reviews = reviewsRepository.findByBook(bookId);
        return res.json({ reviews });
    } catch (err) {
        console.error('Error fetching reviews by book:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor', mensagem: err.message });
    }
}

function getMine(req, res) {
    try {
        const userId = req.session && req.session.userId;
        if (!userId) return res.status(401).json({ erro: 'Não autenticado' });
        const reviews = reviewsRepository.findByUser(userId);
        return res.json({ reviews });
    } catch (err) {
        console.error('Error fetching my reviews:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor', mensagem: err.message });
    }
}

function remove(req, res) {
    try {
        const userId = req.session && req.session.userId;
        if (!userId) return res.status(401).json({ erro: 'Não autenticado' });

        const id = req.params.id;
        const review = reviewsRepository.findById(id);
        if (!review) return res.status(404).json({ erro: 'Review não encontrado' });
        if (review.user_id !== userId) return res.status(403).json({ erro: 'Proibido' });

        const ok = reviewsRepository.remove(id);
        if (ok) return res.json({ mensagem: 'Removido' });
        return res.status(500).json({ erro: 'Não foi possível remover' });
    } catch (err) {
        console.error('Error removing review:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor', mensagem: err.message });
    }
}

module.exports = { create, getByBook, getMine, remove };
