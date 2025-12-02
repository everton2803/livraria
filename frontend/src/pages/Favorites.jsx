import React, { useEffect, useState } from 'react';
import { favoritesService } from '../services/favoritesService';
import LivroCard from '../components/LivroCard';
import './Favorites.css';

const Favorites = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await favoritesService.listFavorites();
      setFavoritos(data.favoritos || []);
    } catch (err) {
      setError('Erro ao carregar favoritos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removerFavorito = async (bookId) => {
    try {
      await favoritesService.removeFavorite(bookId);
      setFavoritos(favoritos.filter(livro => livro.id !== bookId));
    } catch (err) {
      alert('Erro ao remover favorito');
    }
  };

  if (loading) {
    return <div className="container loading">Carregando favoritos...</div>;
  }

  return (
    <div className="container favorites-container">
      <div className="favorites-header">
        <h1>❤️ Meus Favoritos</h1>
        <p className="subtitle">Total: {favoritos.length} livro(s)</p>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {favoritos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro favoritado ainda.</p>
          <p>Volte para Livros e adicione seus favoritos!</p>
        </div>
      ) : (
        <div className="livros-grid">
          {favoritos.map(livro => (
            <div key={livro.id}>
              <LivroCard
                livro={livro}
                showFavoriteBtn={true}
                showActionBtns={false}
                onEdit={() => {}}
                onDelete={removerFavorito}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
