# 1️⃣ Usamos una imagen ligera de Node.js
FROM node:18-alpine AS builder  

# 2️⃣ Establecemos el directorio de trabajo
WORKDIR /app  

# 3️⃣ Copiamos los archivos de configuración
COPY package.json package-lock.json ./

# 4️⃣ Instalamos las dependencias
RUN npm install --production --legacy-peer-deps  

# 5️⃣ Copiamos el código de la aplicación
COPY . .

# 6️⃣ Aseguramos que esbuild se instale correctamente en Linux
RUN npm rebuild esbuild  

# 7️⃣ Definimos la variable de entorno BASE_URL para que siempre use `/PokeCare-main/`
ENV BASE_URL="/PokeCare-main/"

# 8️⃣ Compilamos la aplicación
RUN npm run build  

# 9️⃣ Exponemos el puerto 3000
EXPOSE 3000  

# 🔟 Usamos `server.js` para servir los archivos correctamente
CMD ["node", "server.cjs"]
