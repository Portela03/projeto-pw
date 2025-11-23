const express = require('express');
const router = express.Router();
const CD = require('../models/CD');
const auth = require('../middleware/auth');

/**
 * @route   GET /cds
 * @desc    Listar todos os CDs
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const cds = await CD.find().populate('autor', 'nome nacionalidade').sort({ titulo: 1 });
    res.json({
      success: true,
      count: cds.length,
      data: cds
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar CDs',
      message: error.message
    });
  }
});

/**
 * @route   GET /cds/:id
 * @desc    Buscar CD por ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const cd = await CD.findById(req.params.id).populate('autor', 'nome bio nacionalidade');
    
    if (!cd) {
      return res.status(404).json({
        success: false,
        error: 'CD não encontrado'
      });
    }

    res.json({
      success: true,
      data: cd
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar CD',
      message: error.message
    });
  }
});

/**
 * @route   POST /cds
 * @desc    Criar novo CD
 * @access  Private (requer autenticação)
 */
router.post('/', auth, async (req, res) => {
  try {
    const cd = await CD.create(req.body);
    const cdPopulado = await CD.findById(cd._id).populate('autor', 'nome nacionalidade');
    
    res.status(201).json({
      success: true,
      data: cdPopulado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao criar CD',
      message: error.message
    });
  }
});

/**
 * @route   PUT /cds/:id
 * @desc    Atualizar CD
 * @access  Private (requer autenticação)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const cd = await CD.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('autor', 'nome nacionalidade');

    if (!cd) {
      return res.status(404).json({
        success: false,
        error: 'CD não encontrado'
      });
    }

    res.json({
      success: true,
      data: cd
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Erro ao atualizar CD',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /cds/:id
 * @desc    Deletar CD
 * @access  Private (requer autenticação)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const cd = await CD.findByIdAndDelete(req.params.id);

    if (!cd) {
      return res.status(404).json({
        success: false,
        error: 'CD não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'CD deletado com sucesso',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao deletar CD',
      message: error.message
    });
  }
});

module.exports = router;
