FROM node:18-alpine AS builder  
WORKDIR /app  

# 🔹 Copiar archivos fuente, pero NO `node_modules`
COPY package.json package-lock.json ./  

# 🔹 Instalar todas las dependencias, incluyendo las de desarrollo
RUN npm install  

# 🔹 Copiar el código fuente después de instalar dependencias
COPY . .  

# 🔹 Ejecutar la compilación con Vite
RUN npx vite build  

# 🔹 Ajustar permisos y usuario seguro
RUN chown -R node:node /app  
USER node  

# 🔹 Exponer el puerto y ejecutar el servidor
EXPOSE 3000  
CMD ["node", "server.cjs"]
