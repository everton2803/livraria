function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        // Log de depuração - remover em produção
        console.log('[auth] sessão ausente ou sem userId. session =', req.session);
        console.log('[auth] cookies =', req.headers.cookie);
        console.log('[auth] authorization header =', req.headers.authorization);
        return res.status(401).json({ erro: 'Acesso não autorizado. Faça login.' });
    }
    next();
}
module.exports = { requireAuth };