# Multi-stage build для React + Vite + TypeScript
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build with production optimizations
RUN npm run build

# Production stage
FROM nginx:alpine AS final

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]