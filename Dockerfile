# 1️⃣ Usamos una imagen ligera de Node.js
FROM node:18-alpine AS builder  

# 2️⃣ Establecemos el directorio de trabajo
WORKDIR /app  

# 3️⃣ Creamos un usuario sin privilegios para mejorar la seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup  

# 4️⃣ Ajustamos permisos para evitar errores de acceso
RUN chown -R appuser:appgroup /app  

# 5️⃣ Copiamos los archivos de configuración **pero NO `node_modules`**
COPY package.json package-lock.json ./  

# 6️⃣ Instalamos las dependencias dentro del contenedor
RUN npm ci --production  

# 7️⃣ Reinstalamos `esbuild` para que sea compatible con Linux
RUN npm rebuild esbuild  

# 8️⃣ Copiamos el código de la aplicación después de instalar dependencias
COPY . .  

# 9️⃣ Ajustamos permisos nuevamente para evitar problemas al ejecutar el servidor
RUN chown -R appuser:appgroup /app  

# 🔟 Cambiamos al usuario seguro para evitar privilegios root
USER appuser  

# 11️⃣ Compilamos la aplicación dentro del contenedor, ahora sin errores
RUN npm run build  

# 12️⃣ Exponemos el puerto 3000
EXPOSE 3000  

# 13️⃣ Usamos `server.cjs` para servir los archivos correctamente
ENTRYPOINT ["node", "server.cjs"]
