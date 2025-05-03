FROM node:18-alpine  
WORKDIR /app  

COPY package.json package-lock.json ./  
RUN npm install  

COPY . .  

RUN apk add --no-cache curl  

EXPOSE 3000  

CMD ["node", "server.mjs"]
