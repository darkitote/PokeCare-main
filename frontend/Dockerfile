
FROM node:18-alpine AS builder  
WORKDIR /app  

COPY package.json package-lock.json ./  
RUN npm install --production  

COPY . .  
RUN npm run build  

RUN rm -rf /app/dist/public /app/dist/src /app/node_modules /app/.cache  

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
    location /api/ { \
        proxy_pass http://poke-care-backend.default.svc.cluster.local:3000/; \
        proxy_set_header Host $host; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]
