import React, { useState } from 'react';
import { reviewsService } from '../services/reviewsService';
import { useAuth } from '../contexts/AuthContext';
import './Reviews.css';

const ReviewForm = ({ bookId, onCreated }) => {
  const { user, checkAuth } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Você precisa estar logado para enviar um review.');
      window.location.href = '/login';
      return;
    }
    try {
      setLoading(true);
      await reviewsService.create({ book_id: bookId, rating: Number(rating), comment });
      setComment('');
      setRating(5);
      if (onCreated) onCreated();
    } catch (err) {
      console.error('Erro ao criar review:', err);
      const msg = (err && err.message) ? err.message : 'Erro ao enviar review';
      if (msg.toLowerCase().includes('unauthorized') || msg.includes('Não autenticado') || msg.includes('Sessão')) {
        try { await checkAuth(); } catch (e) { }
        alert('Sessão expirada. Faça login novamente.');
        window.location.href = '/login';
        return;
      }
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <label>
        Nota:
        <select value={rating} onChange={e => setRating(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      <label>
        Comentário:
        <textarea value={comment} onChange={e => setComment(e.target.value)} />
      </label>
      <button className="btn btn-primary" type="submit" disabled={loading}>Enviar review</button>
    </form>
  );
};

export default ReviewForm;
