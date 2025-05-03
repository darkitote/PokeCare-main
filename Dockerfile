# 1️⃣ Usamos una imagen ligera de Node.js
FROM node:18-alpine AS builder  

# 2️⃣ Establecemos el directorio de trabajo
WORKDIR /app  

# 3️⃣ Creamos un usuario sin privilegios para mejorar la seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser  

# 4️⃣ Copiamos los archivos de configuración y aseguramos instalación limpia
COPY package.json package-lock.json ./
RUN npm ci --production  

# 5️⃣ Copiamos el código de la aplicación
COPY . .  

# 6️⃣ Aseguramos que esbuild se instale correctamente en Linux
RUN npm rebuild esbuild  

# 7️⃣ Definimos la variable de entorno BASE_URL
ENV BASE_URL="/PokeCare-main/"

# 8️⃣ Compilamos la aplicación
RUN npm run build  

# 9️⃣ Exponemos el puerto 3000
EXPOSE 3000  

# 🔟 Mejor manejador de procesos para mayor estabilidad
ENTRYPOINT ["node", "server.cjs"]
