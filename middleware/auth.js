/**
 * Middleware de autenticação básica (Basic Authentication)
 * Protege rotas POST, PUT e DELETE
 * Libera GET sem autenticação
 */

const auth = (req, res, next) => {
  // Permite GET sem autenticação
  if (req.method === 'GET') {
    return next();
  }

  // Para POST, PUT, DELETE - exige autenticação
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Autenticação necessária',
      message: 'Por favor, forneça credenciais de autenticação'
    });
  }

  // Decodifica Basic Auth
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Verifica credenciais
  const validUsername = 'admin';
  const validPassword = 'password';

  if (username === validUsername && password === validPassword) {
    return next();
  }

  // Credenciais inválidas
  return res.status(401).json({
    error: 'Autenticação falhou',
    message: 'Credenciais inválidas'
  });
};

module.exports = auth;
