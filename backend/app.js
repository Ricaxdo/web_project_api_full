const express = require('express');
const mongoose = require('mongoose'); // <-- Mongoose
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conectado a MongoDB: aroundb');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

const db = mongoose.connection;

// Middleware temporal de autorización
app.use((req, res, next) => {
  req.user = {
    _id: '692ad209b630c2ff7caa5350',
  };
  next();
});

// Eventos de conexión
db.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
  console.log('Conectado a MongoDB: aroundb');
});

// Middleware para parsear JSON
app.use(express.json());

// Registrar rutas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());

// Middleware para rutas no definidas → devuelve 404 siempre
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
