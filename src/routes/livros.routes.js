const express = require("express");
const router = express.Router();
// Controllers
const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();
// Middlewares
const { validarLivro, validarParamId } = require("../middleware/validar/livros.validar");

router.get("/", (req, res, next) => livrosController.listarLivros.bind(req, res, next));
router.get("/:id", validarParamId, (req, res, next) => livrosController.buscarLivroPorId.bind(req, res, next));
router.post("/", validarLivro, (req, res, next) => livrosController.criarLivro.bind(req, res, next));
router.put("/:id", validarParamId, validarLivro, (req, res, next) => livrosController.atualizarLivro.bind(req, res, next));
router.delete("/:id", validarParamId, (req, res, next) => livrosController.removerLivro.bind(req, res, next));
module.exports = router;