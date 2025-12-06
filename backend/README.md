# web_project_around_express

Proyecto del Sprint 16 de TripleTen.  
Backend inicial de la aplicación “Alrededor de los EE. UU.” desarrollado con **Node.js + Express**.

## Descripción
Este servidor implementa:
- Rutas GET para `/users`, `/cards` y `/users/:id`
- Lectura asincrónica de archivos JSON (`fs.promises`)
- Manejo básico de errores y respuestas en formato JSON
- Estructura inicial para futuros controladores y conexión a MongoDB

## 📂 Tecnologías
- Node.js  
- Express  
- fs.promises  
- Path  
- Git & GitHub  

## 🔌 Endpoints
- **GET /users** – Lista completa de usuarios  
- **GET /users/:id** – Usuario por ID 
- **GET /cards** – Lista de tarjetas  
- Rutas no definidas → `404 { message: "Recurso solicitado no encontrado" }`

## ▶️ Ejecución
```bash
npm install
npm run start     # iniciar servidor
npm run dev       # modo desarrollo con nodemon
