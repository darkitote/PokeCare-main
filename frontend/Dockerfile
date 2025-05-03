# 🔹 Construcción del frontend con Vite
FROM node:18-alpine AS builder  
WORKDIR /app  

# 🔹 Copiar archivos fuente  
COPY package.json package-lock.json ./  
RUN npm install  

# 🔹 Copiar el código fuente y compilar  
COPY . .  
RUN npm run build  

# 🔹 Servir archivos con Nginx  
FROM nginx:alpine  
COPY --from=builder /app/dist /usr/share/nginx/html  

EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]
