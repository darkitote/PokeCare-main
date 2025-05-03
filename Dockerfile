FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

# 🔥 Instalamos dependencias desde cero dentro de Docker
RUN npm install --production --legacy-peer-deps

COPY . .

# 🔥 Aseguramos que esbuild se instala correctamente en Linux
RUN npm rebuild esbuild

# 🔥 Compilamos la aplicación
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
