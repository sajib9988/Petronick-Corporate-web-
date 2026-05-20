# Install dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install

# Build app
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma client generate
RUN npx prisma generate

# Build project
RUN npm run build


# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/src/templates ./src/templates

EXPOSE 5000

CMD ["node", "dist/server.js"]