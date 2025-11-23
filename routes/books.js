const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const auth = require('../middleware/auth');

/**
 * @route   GET /books
 * @desc    Listar todos os livros
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find().populate('autor', 'nome nacionalidade').sort({ titulo: 1 });
    res.json({
      success: true,
      count: livros.length,
      data: livros
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar livros',
      message: error.message
    });
  }
});

/**
 * @route   GET /books/:id
 * @desc    Buscar livro por ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id).populate('autor', 'nome bio nacionalidade');
    
    if (!livro) {
      return res.status(404).json({
        success: false,
        error: 'Livro não encontrado'
      });
    }

    res.json({
      success: true,
      data: livro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar livro',
      message: error.message
    });
  }
});

/**
 * @route   POST /books
 * @desc    Criar novo livro
 * @access  Private (requer autenticação)
 */
router.post('/', auth, async (req, res) => {
  try {
    const livro = await Livro.create(req.body);
    const livroPopulado = await Livro.findById(livro._id).populate('autor', 'nome nacionalidade');
    
    res.status(201).json({
      success: true,
      data: livroPopulado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao criar livro',
      message: error.message
    });
  }
});

/**
 * @route   PUT /books/:id
 * @desc    Atualizar livro
 * @access  Private (requer autenticação)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const livro = await Livro.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('autor', 'nome nacionalidade');

    if (!livro) {
      return res.status(404).json({
        success: false,
        error: 'Livro não encontrado'
      });
    }

    res.json({
      success: true,
      data: livro
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao atualizar livro',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /books/:id
 * @desc    Deletar livro
 * @access  Private (requer autenticação)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);

    if (!livro) {
      return res.status(404).json({
        success: false,
        error: 'Livro não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Livro deletado com sucesso',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao deletar livro',
      message: error.message
    });
  }
});

module.exports = router;
