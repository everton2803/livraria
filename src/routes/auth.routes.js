const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

const { requireAuth } = require('../middleware/auth');

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.get('/me', requireAuth, (req, res, next) => authController.me(req, res, next));
router.post('/logout', requireAuth, (req, res, next) => authController.logout(req, res, next));

module.exports = router;