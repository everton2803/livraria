const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function parseErrorResponse(res) {
  try {
    const json = await res.json();
    return json.message || json.erro || json.error || JSON.stringify(json);
  } catch (e) {
    try { return await res.text(); } catch (e2) { return `HTTP ${res.status}`; }
  }
}

export const reviewsService = {
  async getByBook(bookId) {
    const res = await fetch(`${API_BASE_URL}/reviews/livros/${bookId}`, { credentials: 'include' });
    if (!res.ok) throw new Error(await parseErrorResponse(res));
    const data = await res.json();
    return data.reviews || [];
  },

  async create({ book_id, rating, comment }) {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ book_id, rating, comment })
    });
    if (!res.ok) throw new Error(await parseErrorResponse(res));
    const data = await res.json();
    return data.review;
  },

  async getMine() {
    const res = await fetch(`${API_BASE_URL}/reviews/mine`, { credentials: 'include' });
    if (!res.ok) throw new Error(await parseErrorResponse(res));
    const data = await res.json();
    return data.reviews || [];
  },

  async remove(id) {
    const res = await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error(await parseErrorResponse(res));
    return res.json();
  }
};
