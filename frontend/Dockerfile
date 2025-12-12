# Etapa 1: build del frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json / pnpm-lock / yarn.lock si existen
COPY package*.json ./

RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos el bundle de producción
RUN npm run build

# Etapa 2: imagen final, solo para servir archivos estáticos
FROM node:20-alpine

WORKDIR /app

# Servidor estático
RUN npm install -g serve

# Copiamos la carpeta compilada desde la etapa anterior
COPY --from=build /app/dist ./dist

# Cloud Run escucha en el 8080
EXPOSE 8080

# Comando para servir el frontend
CMD ["serve", "-s", "dist", "-l", "8080"]
