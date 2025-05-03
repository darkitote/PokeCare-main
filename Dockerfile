FROM node:18-alpine AS builder  
WORKDIR /app  

# 🔹 Copiar solo archivos de configuración, pero NO `node_modules`
COPY package.json package-lock.json ./

# 🔹 Instalar dependencias dentro del contenedor (para Linux)
RUN npm install --omit=dev  

# 🔹 Forzar la instalación correcta de `esbuild`
RUN npm rebuild esbuild  

# 🔹 Copiar el código fuente después de instalar dependencias
COPY . .  

# 🔹 Ejecutar la compilación con Vite
RUN npm run build  

# 🔹 Ajustar permisos y usuario seguro
RUN chown -R node:node /app  
USER node  

# 🔹 Exponer el puerto y ejecutar el servidor
EXPOSE 3000  
CMD ["node", "server.cjs"]
