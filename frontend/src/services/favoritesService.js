const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const favoritesService = {
  async addFavorite(bookId) {
    const response = await fetch(`${API_BASE_URL}/favoritos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ bookId })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao adicionar favorito');
    }
    return response.json();
  },

  async removeFavorite(bookId) {
    const response = await fetch(`${API_BASE_URL}/favoritos/${bookId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao remover favorito');
    }
    return response.json();
  },

  async listFavorites() {
    const response = await fetch(`${API_BASE_URL}/favoritos`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao listar favoritos');
    }
    return response.json();
  },

  async checkFavorite(bookId) {
    const response = await fetch(`${API_BASE_URL}/favoritos/check/${bookId}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao verificar favorito');
    }
    return response.json();
  }
};
