const fs = require('fs').promises;
// Usamos fs con promesas para poder usar async/await
const path = require('path');

// Función async que lee el archivo users.json
const getUsers = async () => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');
  const data = await fs.readFile(filePath, 'utf8');
  // Convierte el JSON (string) a objeto/array JS
  return JSON.parse(data);
};

// Función async que lee el archivo cards.json
const getCards = async () => {
  const filePath = path.join(__dirname, '..', 'data', 'cards.json');
  const data = await fs.readFile(filePath, 'utf8');
  // Convierte el JSON (string) a objeto/array JS
  return JSON.parse(data);
};

module.exports = { getUsers, getCards };
