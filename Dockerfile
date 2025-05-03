# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

# Copia el resto del código
COPY . .

# Etapa 2: Imagen más ligera
FROM node:18-slim

WORKDIR /app
COPY --from=builder /app /app

# Crear un usuario sin privilegios para mayor seguridad
RUN addgroup --system app && adduser --system --ingroup app app
USER app

EXPOSE 3000
CMD ["npm", "run", "dev"]
