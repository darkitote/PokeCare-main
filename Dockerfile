FROM node:18-alpine AS builder  
WORKDIR /app  

# Copiar archivos y construir la aplicación
COPY package.json package-lock.json ./
RUN npm install --omit=dev  

COPY . .  
RUN npm run build  

# 🔹 Copiar `index.html` dentro de `dist/`
RUN cp index.html dist/index.html  

# Ajustar permisos y usuario seguro
RUN chown -R node:node /app  
USER node  

# Exponer el puerto y ejecutar el servidor
EXPOSE 3000  
CMD ["node", "server.cjs"]
