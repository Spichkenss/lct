# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /workspace

# ---------- dev ----------
FROM base AS dev
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npx", "nx", "serve", "api"]

# ---------- build ----------
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:api

# ---------- prod ----------
FROM node:20-alpine AS prod
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /workspace/apps/api/dist ./apps/api/dist

EXPOSE 3000
CMD ["node", "/app/apps/api/dist/main.js"]
