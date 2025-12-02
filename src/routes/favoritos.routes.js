const express = require('express');
const router = express.Router();
const FavoritesController = require('../controllers/favoritos.controller');
const { requireAuth } = require('../middlewares/auth');

const favoritesController = new FavoritesController();

// Exige autenticação para todas as rotas de favoritos
router.use(requireAuth);

// Adicionar livro aos favoritos
router.post('/', (req, res, next) => favoritesController.addFavorite(req, res, next));

// Remover livro dos favoritos
router.delete('/:bookId', (req, res, next) => favoritesController.removeFavorite(req, res, next));

// Listar todos os favoritos do usuário
router.get('/', (req, res, next) => favoritesController.listFavorites(req, res, next));

// Verificar se um livro é favorito
router.get('/check/:bookId', (req, res, next) => favoritesController.checkFavorite(req, res, next));

module.exports = router;
