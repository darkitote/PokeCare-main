FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN apk add --no-cache curl
EXPOSE 3000
CMD ["node", "server.mjs"]
