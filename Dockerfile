FROM node:18-alpine AS builder  
WORKDIR /app  

# 🔹 Copiar archivos y construir la aplicación
COPY . .
RUN npm install --omit=dev  
RUN npm run build  

# 🔹 Copiar `index.html` a `dist/` para garantizar que esté en la imagen final
RUN cp index.html dist/index.html  

# 🔹 Ajustar permisos y usuario seguro
RUN chown -R node:node /app  
USER node  

# 🔹 Configurar el servidor
EXPOSE 3000  
CMD ["node", "server.cjs"]
