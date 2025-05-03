FROM node:18-alpine AS builder  
WORKDIR /app  

# 🔹 Copiar archivos fuente, pero sin `node_modules`
COPY package.json package-lock.json ./

# 🔹 Instalar dependencias dentro del contenedor con `esbuild` para Linux
RUN npm install --omit=dev  
RUN npm rebuild esbuild  

# 🔹 Copiar el código fuente después de instalar dependencias
COPY . .  

# 🔹 Ejecutar la compilación
RUN npm run build  

# 🔹 Ajustar permisos y usuario seguro
RUN chown -R node:node /app  
USER node  

# 🔹 Exponer el puerto y ejecutar el servidor
EXPOSE 3000  
CMD ["node", "server.cjs"]
