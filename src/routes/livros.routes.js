const express = require("express");
const router = express.Router();
// Controllers
const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();
// Middlewares
const { validarLivro, validarParamId } = require("../middleware/validar/livros.validar");
//const { requireAuth } = require("../middleware/auth");

// exige autenticação para todas as rotas deste router
//router.use(requireAuth);

router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", validarParamId, livrosController.buscarLivroPorId.bind(livrosController));
router.post("/", livrosController.criarLivro.bind(livrosController));
router.put("/:id", validarParamId, validarLivro, livrosController.atualizarLivro.bind(livrosController));
router.delete("/:id", validarParamId, livrosController.removerLivro.bind(livrosController));

module.exports = router;