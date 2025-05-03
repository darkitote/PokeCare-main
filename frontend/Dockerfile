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

# 🔹 Configurar Nginx correctamente para servir la app
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]
