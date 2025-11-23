const mongoose = require('mongoose');

/**
 * Schema do Autor
 */
const autorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do autor é obrigatório'],
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  nacionalidade: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Autor', autorSchema);
