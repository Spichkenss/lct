# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /workspace

# 1) Установим зависимости (кеш по lock-файлу)
COPY package*.json ./
RUN npm ci

# 2) Копируем остальной репозиторий
COPY . .

# 3) Сборка обоих приложений через Nx
RUN npm run build

# ---------- Runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Установим процесс-менеджер и легкий статический сервер
RUN npm i -g pm2 serve

# Устанавливаем только прод-зависимости (из корневого package.json)
COPY package*.json ./
RUN npm ci --omit=dev

# Копируем собранные артефакты
COPY --from=builder /workspace/dist/apps/api ./dist/apps/api
COPY --from=builder /workspace/dist/apps/web ./dist/apps/web

# PM2 экосистема: 2 процесса (api и web-статик)
COPY ecosystem.config.cjs ./ecosystem.config.cjs

# Порты: 3000 — Nest API, 8080 — статик фронта
EXPOSE 3000 8080

# Запуск обоих процессов
CMD ["pm2-runtime", "ecosystem.config.cjs"]
