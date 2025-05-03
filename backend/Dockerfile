# 🔹 Backend basado en Node.js
FROM node:18-alpine  
WORKDIR /app  

# 🔹 Copiar archivos fuente  
COPY package.json package-lock.json ./  
RUN npm install  

# 🔹 Copiar el código fuente  
COPY . .  

# 🔹 Exponer el puerto 3000 y ejecutar el servidor  
EXPOSE 3000  
CMD ["node", "server.mjs"]
