const FavoritesRepository = require('../repositories/favorites.repository');
const LivrosRepository = require('../repositories/livros.repository');

class FavoritesController {
    constructor() {
        this.favoritesRepo = new FavoritesRepository();
        this.livrosRepo = new LivrosRepository();
    }

    async addFavorite(req, res, next) {
        try {
            const userId = req.session.userId;
            const { bookId } = req.body;

            if (!userId) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            if (!bookId || typeof bookId !== 'number') {
                return res.status(400).json({ erro: 'bookId é obrigatório e deve ser um número' });
            }

            // Verificar se o livro existe
            const livro = await this.livrosRepo.findById(bookId);
            if (!livro) {
                return res.status(404).json({ erro: 'Livro não encontrado' });
            }

            // Verificar se já é favorito
            const isFavorite = await this.favoritesRepo.isFavorite(userId, bookId);
            if (isFavorite) {
                return res.status(409).json({ erro: 'Este livro já está nos favoritos' });
            }

            const favorite = await this.favoritesRepo.addFavorite(userId, bookId);
            res.status(201).json({
                mensagem: 'Livro adicionado aos favoritos',
                favorite: favorite.toJSON()
            });
        } catch (err) {
            next(err);
        }
    }

    async removeFavorite(req, res, next) {
        try {
            const userId = req.session.userId;
            const { bookId } = req.params;

            if (!userId) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            const bookIdNum = parseInt(bookId);
            if (isNaN(bookIdNum)) {
                return res.status(400).json({ erro: 'bookId inválido' });
            }

            // Verificar se é favorito
            const isFavorite = await this.favoritesRepo.isFavorite(userId, bookIdNum);
            if (!isFavorite) {
                return res.status(404).json({ erro: 'Este livro não está nos favoritos' });
            }

            const removed = await this.favoritesRepo.removeFavorite(userId, bookIdNum);
            if (removed) {
                res.status(200).json({ mensagem: 'Livro removido dos favoritos' });
            } else {
                res.status(500).json({ erro: 'Erro ao remover favorito' });
            }
        } catch (err) {
            next(err);
        }
    }

    async listFavorites(req, res, next) {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            const livros = await this.favoritesRepo.findBooksForUser(userId);
            res.status(200).json({
                total: livros.length,
                favoritos: livros
            });
        } catch (err) {
            next(err);
        }
    }

    async checkFavorite(req, res, next) {
        try {
            const userId = req.session.userId;
            const { bookId } = req.params;

            if (!userId) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            const bookIdNum = parseInt(bookId);
            if (isNaN(bookIdNum)) {
                return res.status(400).json({ erro: 'bookId inválido' });
            }

            const isFavorite = await this.favoritesRepo.isFavorite(userId, bookIdNum);
            res.status(200).json({ isFavorite });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = FavoritesController;
