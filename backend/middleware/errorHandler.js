const BAD_REQUEST = 400;
const CONFLICT = 409;
const DEFAULT_ERROR = 500;

module.exports = (err, req, res, next) => {
  // Siempre log en servidor (para debug)
  // eslint-disable-next-line no-console
  console.error(err);

  // Errores de validación / casteo de Mongoose
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST).send({ message: 'Datos inválidos' });
  }

  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: 'ID inválido' });
  }

  // Error por email duplicado (índice único de Mongo)
  if (err.code === 11000) {
    return res
      .status(CONFLICT)
      .send({ message: 'El email ya está registrado' });
  }

  // Errores a los que tú mismo les pusiste statusCode (404, 403, etc.)
  if (err.statusCode) {
    return res
      .status(err.statusCode)
      .send({ message: err.message || 'Error en la solicitud' });
  }

  // Cualquier cosa no prevista → 500 genérico
  return res
    .status(DEFAULT_ERROR)
    .send({ message: 'Error interno del servidor' });
};
