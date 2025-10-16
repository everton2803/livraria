const express = require("express");
const router = express.Router();
// Controllers
const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();
// Middlewares
const { validarLivro, validarParamId } = require("../middleware/validar/livros.validar");

//router.get("/", (req, res, next) => livrosController.listarLivros(req, res, next));
//router.get("/:id", validarParamId, (req, res, next) => livrosController.buscarLivroPorId(req, res, next));
//router.post("/", validarLivro, (req, res, next) => livrosController.criarLivro(req, res, next));
//router.put("/:id", validarParamId, validarLivro, (req, res, next) => livrosController.atualizarLivro(req, res, next));
//router.delete("/:id", validarParamId, (req, res, next) => livrosController.removerLivro(req, res, next));

router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", validarParamId, livrosController.buscarLivroPorId.bind(livrosController));
router.post("/", livrosController.criarLivro.bind(livrosController));
router.put("/:id", validarParamId, validarLivro, livrosController.atualizarLivro.bind(livrosController));
router.delete("/:id", validarParamId, livrosController.removerLivro.bind(livrosController));

module.exports = router;