# 1️⃣ Usamos una imagen ligera de Node.js
FROM node:18-alpine AS builder  

# 2️⃣ Establecemos el directorio de trabajo
WORKDIR /app  

# 3️⃣ Creamos un usuario sin privilegios para mejorar la seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup  

# 4️⃣ Ajustamos permisos para evitar errores de acceso
RUN chown -R appuser:appgroup /app  

# 5️⃣ Copiamos los archivos de configuración
COPY package.json package-lock.json ./  

# 6️⃣ Instalamos las dependencias sin errores de permisos
RUN npm ci --production  

# 7️⃣ Copiamos el código de la aplicación
COPY . .  

# 8️⃣ Compilamos la aplicación
RUN npm run build  

# 9️⃣ Exponemos el puerto 3000
EXPOSE 3000  

# 🔟 Usamos `server.cjs` para servir los archivos correctamente
ENTRYPOINT ["node", "server.cjs"]
