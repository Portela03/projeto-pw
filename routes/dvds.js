const express = require('express');
const router = express.Router();
const DVD = require('../models/DVD');
const auth = require('../middleware/auth');

/**
 * @route   GET /dvds
 * @desc    Listar todos os DVDs
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const dvds = await DVD.find().populate('autor', 'nome nacionalidade').sort({ titulo: 1 });
    res.json({
      success: true,
      count: dvds.length,
      data: dvds
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar DVDs',
      message: error.message
    });
  }
});

/**
 * @route   GET /dvds/:id
 * @desc    Buscar DVD por ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const dvd = await DVD.findById(req.params.id).populate('autor', 'nome bio nacionalidade');
    
    if (!dvd) {
      return res.status(404).json({
        success: false,
        error: 'DVD não encontrado'
      });
    }

    res.json({
      success: true,
      data: dvd
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar DVD',
      message: error.message
    });
  }
});

/**
 * @route   POST /dvds
 * @desc    Criar novo DVD
 * @access  Private (requer autenticação)
 */
router.post('/', auth, async (req, res) => {
  try {
    const dvd = await DVD.create(req.body);
    const dvdPopulado = await DVD.findById(dvd._id).populate('autor', 'nome nacionalidade');
    
    res.status(201).json({
      success: true,
      data: dvdPopulado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao criar DVD',
      message: error.message
    });
  }
});

/**
 * @route   PUT /dvds/:id
 * @desc    Atualizar DVD
 * @access  Private (requer autenticação)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const dvd = await DVD.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('autor', 'nome nacionalidade');

    if (!dvd) {
      return res.status(404).json({
        success: false,
        error: 'DVD não encontrado'
      });
    }

    res.json({
      success: true,
      data: dvd
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao atualizar DVD',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /dvds/:id
 * @desc    Deletar DVD
 * @access  Private (requer autenticação)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const dvd = await DVD.findByIdAndDelete(req.params.id);

    if (!dvd) {
      return res.status(404).json({
        success: false,
        error: 'DVD não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'DVD deletado com sucesso',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao deletar DVD',
      message: error.message
    });
  }
});

module.exports = router;
