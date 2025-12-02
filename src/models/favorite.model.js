class Favorite {
    constructor({ id = null, user_id, book_id, created_at = undefined }) {
        this.id = id ?? null;
        this.user_id = user_id;
        this.book_id = book_id;
        this.created_at = created_at;
        this._validar();
    }

    _validar() {
        const erros = [];
        if (!this.user_id || typeof this.user_id !== 'number') {
            erros.push('user_id deve ser um número válido');
        }
        if (!this.book_id || typeof this.book_id !== 'number') {
            erros.push('book_id deve ser um número válido');
        }
        if (erros.length) {
            const e = new Error('Dados de favorito inválidos');
            e.statusCode = 400;
            e.details = erros;
            throw e;
        }
    }

    static fromDB(row) {
        return new Favorite({
            id: row.id,
            user_id: row.user_id,
            book_id: row.book_id,
            created_at: row.created_at
        });
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            book_id: this.book_id,
            created_at: this.created_at
        };
    }
}

module.exports = Favorite;
