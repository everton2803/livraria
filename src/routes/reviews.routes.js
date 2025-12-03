const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');

// POST /api/reviews
router.post('/', reviewsController.create);

// GET /api/reviews/livros/:bookId
router.get('/livros/:bookId', reviewsController.getByBook);

// GET /api/reviews/mine
router.get('/mine', reviewsController.getMine);

// DELETE /api/reviews/:id
router.delete('/:id', reviewsController.remove);

module.exports = router;
