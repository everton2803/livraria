const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/livros.json");

const router = express.Router(); // Roteador do Express

// Simulação de banco de dados em memória
let livros = [
    {
        id: 1,
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        categoria: "Programação",
        ano: 2008
    },
    {
        id: 2,
        titulo: "O Programador Pragmático",
        autor: "Andrew Hunt",
        categoria: "Programação",
        ano: 1999
    }
];

router.get("/", (req, res) => {
    const { titulo, categoria } = req.query;
    let resultados = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (titulo) {
        resultados = resultados.filter(l => l.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    if (categoria) {
        resultados = resultados.filter(l => l.categoria.toLowerCase() === categoria.toLowerCase());
    }
    res.status(200).json(resultados);
});

router.post("/", (req, res) => {
    const { titulo, autor, categoria, ano } = req.body;

    if (!titulo || !autor || !categoria || !ano) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    // Lê os livros atuais do arquivo
    const livros = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Gera novo ID com base no último livro
    const novoId = livros.length ? livros[livros.length - 1].id + 1 : 1;

    const novoLivro = { id: novoId, titulo, autor, categoria, ano };
    livros.push(novoLivro);

    // Salva o novo livro no arquivo
    fs.writeFileSync(filePath, JSON.stringify(livros, null, 2));

    res.status(201).json({ mensagem: "Livro adicionado", data: novoLivro });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);
    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }
    res.status(200).json(livro);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Lê os livros do arquivo
  const livros = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Busca pelo ID
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }

  res.status(200).json(livro);
});


router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, categoria, ano } = req.body;
    if (!titulo || !autor || !categoria || !ano) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }
    const livro = livros.find(l => l.id === id);
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

    // Object.assign: atualiza o objeto existente
    Object.assign(livro, { titulo, autor, categoria, ano });
    res.status(200).json({ mensagem: "Atualizado com sucesso", data: livro });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ erro: "Livro não encontrado" });

    const removido = livros.splice(index, 1);
    res.status(200).json({ mensagem: "Livro removido", data: removido[0] });
});

router.get("/categoria/:categoria", (req, res) => {
    const categoria = req.params.categoria;
    const filtrados = livros.filter(l => l.categoria.toLowerCase() === categoria.toLowerCase());
    res.status(200).json(filtrados);
});

module.exports = router;