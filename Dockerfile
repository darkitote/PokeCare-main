# 1️⃣ Usamos una imagen ligera de Node.js
FROM node:18-alpine AS builder  

# 2️⃣ Establecemos el directorio de trabajo
WORKDIR /app  

# 3️⃣ Copiamos los archivos de configuración (pero NO `node_modules`)
COPY package.json package-lock.json ./  

# 4️⃣ Instalamos las dependencias dentro del contenedor
RUN npm ci --production  

# 5️⃣ **Forzamos la instalación de `esbuild` directamente en la arquitectura Linux**
RUN npm uninstall esbuild && npm install esbuild --platform=linux-arm64  

# 6️⃣ Copiamos el código de la aplicación después de instalar dependencias
COPY . .  

# 7️⃣ Ajustamos permisos nuevamente para evitar problemas al ejecutar el servidor
RUN chown -R node:node /app  

# 🔟 Cambiamos al usuario seguro para evitar privilegios root
USER node  

# 11️⃣ Compilamos la aplicación dentro del contenedor, ahora sin errores
RUN npm run build  

# 12️⃣ Exponemos el puerto 3000
EXPOSE 3000  

# 13️⃣ Usamos `server.cjs` para servir los archivos correctamente
ENTRYPOINT ["node", "server.cjs"]
