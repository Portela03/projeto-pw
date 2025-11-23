const mongoose = require('mongoose');

/**
 * Schema do DVD
 */
const dvdSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título do DVD é obrigatório'],
    trim: true
  },
  categoria: {
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

module.exports = mongoose.model('DVD', dvdSchema);
