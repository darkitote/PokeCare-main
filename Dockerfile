FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production --unsafe-perm

COPY . .

# 🔥 SOLUCIÓN: Instalar dependencias antes de cambiar de usuario
RUN addgroup --system app && adduser --system --ingroup app app

# Asignamos permisos correctos antes de cambiar de usuario
RUN chown -R app:app /app

USER app

EXPOSE 3000
CMD ["npm", "run", "dev"]
