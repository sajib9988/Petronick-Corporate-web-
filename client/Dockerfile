FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# 🔥 IMPORTANT FIX
ENV PNPM_IGNORE_WORKSPACE_ROOT_CHECK=true
ENV PNPM_NO_WORKSPACE=true

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]