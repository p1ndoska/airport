FROM node:22-alpine

# TLS-инспекция в корпоративной сети: apk через http, npm без strict-ssl
RUN sed -i 's/https/http/g' /etc/apk/repositories \
    && apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm config set strict-ssl false \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 15000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm ci --no-audit --no-fund

COPY prisma ./prisma
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate

COPY src ./src

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
