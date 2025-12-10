const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  // Obtener el encabezado Authorization
  const { authorization } = req.headers;

  // Verificar que exista y empiece con "Bearer "
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Autorización requerida' });
  }

  // Extraer el token
  const token = authorization.replace('Bearer ', '');

  try {
    // Verificar token y obtener payload
    const payload = jwt.verify(token, JWT_SECRET);

    // Guardar el payload en req.user
    req.user = payload;

    // Continuar a la siguiente capa
    return next();
  } catch (err) {
    // Token inválido o expirado
    return res.status(403).send({ message: 'Token inválido o expirado' });
  }
};
