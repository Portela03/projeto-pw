const mongoose = require('mongoose');

/**
 * Configuração da conexão com MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/multimidia', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
