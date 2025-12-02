// frontend/src/components/LivroCard.jsx
import React, { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete, showFavoriteBtn = true, showActionBtns = true }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verificar se livro é favorito ao montar
  useEffect(() => {
    if (showFavoriteBtn && livro.id) {
      checkFavorite();
    }
  }, [livro.id, showFavoriteBtn]);

  const checkFavorite = async () => {
    try {
      const result = await favoritesService.checkFavorite(livro.id);
      setIsFavorite(result.isFavorite);
    } catch (err) {
      console.error('Erro ao verificar favorito:', err);
    }
  };

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      if (isFavorite) {
        await favoritesService.removeFavorite(livro.id);
        setIsFavorite(false);
      } else {
        await favoritesService.addFavorite(livro.id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Erro ao alternar favorito:', err);
      alert('Erro ao alternar favorito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="livro-card">
      <div className="card-header">
        <h3>{livro.titulo}</h3>
        {showFavoriteBtn && (
          <button
            onClick={toggleFavorite}
            className={`btn-favorite ${isFavorite ? 'favorited' : ''}`}
            title={isFavorite ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
            disabled={loading}
            aria-label={isFavorite ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Ano:</strong> {livro.ano}</p>
      {livro.editora && <p><strong>Editora:</strong> {livro.editora}</p>}
      {livro.categoria && <p><strong>Categoria:</strong> {livro.categoria}</p>}
      {livro.numeropaginas && <p><strong>Páginas:</strong> {livro.numeropaginas}</p>}
      
      {showActionBtns && (
        <div className="card-actions">
          <button onClick={() => onEdit(livro)} className="btn btn-primary">
            ✏️ Editar
          </button>
          <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
            🗑️ Remover
          </button>
        </div>
      )}
    </div>
  );
};

export default LivroCard;