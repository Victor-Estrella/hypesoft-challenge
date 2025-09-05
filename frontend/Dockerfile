# Imagem base oficial do Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else npm install; fi

# Copia o restante do código
COPY . .

# Build da aplicação Next.js
RUN npm run build

# --- Fase de produção ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia arquivos necessários do builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]