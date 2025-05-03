FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --production --legacy-peer-deps

COPY . .

# 🔥 Compilamos la aplicación antes de cambiar al usuario final
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
