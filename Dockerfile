# Build-only Dockerfile
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build with production optimizations
RUN npm run build

# Final stage - just the built files
FROM scratch
COPY --from=build /app/dist /dist