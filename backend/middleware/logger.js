const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
const fs = require('fs');

// Asegurar que la carpeta logs exista
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Logger de solicitudes
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'request.log'),
    }),
  ],
  format: winston.format.json(),
});

// Logger de errores
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
