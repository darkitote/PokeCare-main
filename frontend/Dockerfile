FROM node:18-alpine AS builder  
WORKDIR /app  

COPY package.json package-lock.json ./  
RUN npm install  

COPY . .  
RUN npm run build  

RUN rm -rf /app/dist/public /app/dist/src  

FROM nginx:alpine  

COPY --from=builder /app/dist/index.html /usr/share/nginx/html/
COPY --from=builder /app/dist/assets /usr/share/nginx/html/assets

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
