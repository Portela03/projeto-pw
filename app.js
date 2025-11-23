const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/database');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const cdsRouter = require('./routes/cds');
const dvdsRouter = require('./routes/dvds');
const app = express();


connectDB();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.json({
    message: 'API de Multimídia - Sistema de Gerenciamento',
    version: '1.0.0',
    endpoints: {
      authors: '/authors',
      books: '/books',
      cds: '/cds',
      dvds: '/dvds'
    },
    authentication: {
      type: 'Basic Authentication',
      note: 'GET requests são públicas. POST, PUT, DELETE requerem autenticação.',
      credentials: {
        username: 'admin',
        password: 'password'
      }
    }
  });
});


app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/cds', cdsRouter);
app.use('/dvds', dvdsRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erro interno do servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 API de Multimídia`);
  console.log(`\n🔗 Endpoints:`);
  console.log(`   http://localhost:${PORT}/authors`);
  console.log(`   http://localhost:${PORT}/books`);
  console.log(`   http://localhost:${PORT}/cds`);
  console.log(`   http://localhost:${PORT}/dvds`);
  console.log(`\n🔐 Autenticação: admin / password\n`);
});

module.exports = app;
