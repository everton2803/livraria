class Review {
    constructor({ id, user_id, book_id, rating, comment, created_at }) {
        this.id = id;
        this.user_id = user_id;
        this.book_id = book_id;
        this.rating = rating;
        this.comment = comment;
        this.created_at = created_at;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            book_id: this.book_id,
            rating: this.rating,
            comment: this.comment,
            created_at: this.created_at,
        };
    }

    static fromDB(row) {
        return new Review(row);
    }
}

module.exports = Review;
