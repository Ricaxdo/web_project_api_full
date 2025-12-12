# web_project_around_fullstack

Proyecto Sprint 19 de TripleTen: **“Alrededor de los EE. UU.”** con **frontend en React + backend en Node/Express + MongoDB Atlas**, desplegados con una arquitectura moderna en **Google Cloud Run** (serverless, contenedores y HTTPS automático).

> El despliegue está hecho Google Cloud RUN que la propuesta clásica de “VM + Nginx + PM2”.

---

## URLs de producción

- **Frontend (React + Vite, Cloud Run):**  
  `https://around-frontend-882018883010.us-central1.run.app`

- **Backend (Node + Express, Cloud Run):**  
  `https://around-backend-882018883010.us-central1.run.app`

- **Base de datos (MongoDB Atlas):**  
  Cluster remoto en MongoDB Atlas (no expuesto públicamente; accesible solo desde el backend).

---

## Estructura del repositorio

Monorepo con frontend y backend separados:

```bash
.
├─ backend/      # API en Node.js + Express + MongoDB
├─ frontend/     # SPA en React (Vite)
└─ README.md
```

## Arquitectura en producción

La aplicación está desplegada con una arquitectura **serverless** usando Google Cloud Run y MongoDB Atlas:

```text
           Usuario
              ↓
Frontend (Cloud Run, React estático)
              ↓   fetch HTTPS
Backend API (Cloud Run, Node/Express)
              ↓   conexión TLS
MongoDB Atlas (DB administrada en la nube)
```

## Backend (Node.js + Express + MongoDB)

### Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **celebrate / Joi** para validaciones de entrada
- **validator** para validación estricta de URLs
- **bcryptjs** + **jsonwebtoken** para autenticación
- **cors** para solicitudes cross-domain
- **dotenv** (solo en modo desarrollo)

---

### Funcionalidad principal de la API

#### Autenticación
- **Registro** — `POST /signup`
- **Login** — `POST /signin`
- **Protección de rutas** mediante middleware de **JWT**

#### Usuarios
- **GET /users/me** — Obtener usuario actual
- **PATCH /users/me** — Actualizar perfil (nombre / about)
- **PATCH /users/me/avatar** — Actualizar avatar

#### Tarjetas (Cards)
- **POST /cards** — Crear tarjeta
- **GET /cards** — Obtener todas las tarjetas
- **DELETE /cards/:cardId** — Eliminar tarjeta (solo si es propietario)
- **PUT /cards/:cardId/likes** — Dar like
- **DELETE /cards/:cardId/likes** — Quitar like

---

## Frontend (React + Vite)

### Tecnologías utilizadas

- **React**
- **Vite**
- **JavaScript / JSX**
- **Fetch API** para consumir la API
- Manejo de autenticación con **JWT** (almacenado en navegador)
- **Rutas protegidas** para secciones privadas de la aplicación

---

### Funcionalidad visible

- Registro y login
- Edición de perfil (nombre/about)
- Actualización de avatar
- Listado de tarjetas
- Crear nueva tarjeta
- Eliminar tarjeta (solo si el usuario es el dueño)
- Dar “me gusta”
- Quitar “me gusta”

---

##  Conclusión

Este proyecto integra un stack completo de **React + Node.js + MongoDB**, desplegado con una arquitectura moderna basada en **Google Cloud Run**, siguiendo prácticas profesionales como:

- Contenerización con Docker
- Despliegue serverless escalable
- HTTPS automático y seguro
- Logging y monitoreo centralizados
- Validación robusta de datos y manejo centralizado de errores

Demostrando una transición completa desde un entorno local de desarrollo hacia una infraestructura cloud productiva, escalable y mantenible.
