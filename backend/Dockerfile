# ======================
# 1️⃣ BUILD STAGE
# ======================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ======================
# 2️⃣ PRODUCTION STAGE
# ======================
FROM node:20-alpine

WORKDIR /app

# only production deps
COPY package*.json ./
RUN npm install --omit=dev

# copying ONLY build
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
