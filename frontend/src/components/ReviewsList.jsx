import React, { useEffect, useState } from 'react';
import { reviewsService } from '../services/reviewsService';
import { useAuth } from '../contexts/AuthContext';
import './Reviews.css';

const ReviewsList = ({ bookId, refreshKey }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const load = async () => {
    try {
      setLoading(true);
      const data = await reviewsService.getByBook(bookId);
      setReviews(data);
    } catch (err) {
      console.error('Erro ao carregar reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) load();
  }, [bookId, refreshKey]);

  const handleDelete = async (id) => {
    try {
      await reviewsService.remove(id);
      load();
    } catch (err) {
      console.error('Erro ao remover review:', err);
      alert('Não foi possível remover o review');
    }
  };

  if (loading) return <div>Carregando reviews...</div>;
  if (!reviews.length) return <div className="reviews-empty">Nenhum review ainda.</div>;

  return (
    <div className="reviews-list">
      {reviews.map(r => (
        <div key={r.id} className="review-item">
          <div className="review-meta">
            <strong>{r.rating} ⭐</strong>
            <span className="review-date">{new Date(r.created_at).toLocaleString()}</span>
          </div>
          {r.comment && <p className="review-comment">{r.comment}</p>}
          {user && user.id === r.user_id && (
            <button className="btn btn-small btn-danger" onClick={() => handleDelete(r.id)}>Remover</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
