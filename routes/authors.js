const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');
const auth = require('../middleware/auth');

/**
 * @route   GET /authors
 * @desc    Listar todos os autores
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const autores = await Autor.find().sort({ nome: 1 });
    res.json({
      success: true,
      count: autores.length,
      data: autores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar autores',
      message: error.message
    });
  }
});

/**
 * @route   GET /authors/:id
 * @desc    Buscar autor por ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor não encontrado'
      });
    }

    res.json({
      success: true,
      data: autor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar autor',
      message: error.message
    });
  }
});

/**
 * @route   POST /authors
 * @desc    Criar novo autor
 * @access  Private (requer autenticação)
 */
router.post('/', auth, async (req, res) => {
  try {
    const autor = await Autor.create(req.body);
    
    res.status(201).json({
      success: true,
      data: autor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao criar autor',
      message: error.message
    });
  }
});

/**
 * @route   PUT /authors/:id
 * @desc    Atualizar autor
 * @access  Private (requer autenticação)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor não encontrado'
      });
    }

    res.json({
      success: true,
      data: autor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao atualizar autor',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /authors/:id
 * @desc    Deletar autor
 * @access  Private (requer autenticação)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);

    if (!autor) {
      return res.status(404).json({
        success: false,
        error: 'Autor não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Autor deletado com sucesso',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao deletar autor',
      message: error.message
    });
  }
});

module.exports = router;
