const mongoose = require('mongoose');

/**
 * Schema do CD
 */
const cdSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título do CD é obrigatório'],
    trim: true
  },
  genero: {
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

module.exports = mongoose.model('CD', cdSchema);
