const mongoose = require('mongoose');

/**
 * Schema do Livro
 */
const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título do livro é obrigatório'],
    trim: true
  },
  categoria: {
    type: String,
    trim: true
  },
  descricao: {
    type: String,
    trim: true
  },
  preco: {
    type: Number,
    min: [0, 'Preço não pode ser negativo']
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'Autor é obrigatório']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Livro', livroSchema);
