# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /workspace

# ---------- dev ----------
FROM base AS dev
# Устанавливаем зависимости воркспейса
COPY package*.json ./
RUN npm ci
# Копируем весь монорепо (контекст = корень)
COPY . .
EXPOSE 4200
# Пробрасываем хост наружу
CMD ["npx", "nx", "serve", "web", "--host", "0.0.0.0"]

# ---------- build ----------
FROM base AS build
COPY . .
RUN npm ci
RUN npm run build:web

# ---------- prod (nginx) ----------
FROM nginx:1.27-alpine AS prod

COPY --from=build /workspace/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
