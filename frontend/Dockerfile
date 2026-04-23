# ----------- Stage 1: Build -----------
    FROM node:22-alpine AS builder

    # Install pnpm
    RUN npm install -g pnpm@10.10.0
    
    # Set working directory
    WORKDIR /app
    
    # Copy only necessary files for installing dependencies
    COPY package.json pnpm-lock.yaml ./
    
    # Install all dependencies (including devDependencies)
    RUN pnpm install
    
    # Copy rest of the application
    COPY . .
    
    # Build the Next.js application
    RUN pnpm build
    
    # Prune devDependencies to reduce final image size
    RUN pnpm prune --prod
    
    
    # ----------- Stage 2: Production Image -----------
    FROM node:22-alpine
    
    # Install pnpm
    RUN npm install -g pnpm@10.10.0
    
    # Set working directory
    WORKDIR /app
    
    # Copy built app and production dependencies from builder stage
    COPY --from=builder /app ./
    
    # Expose port used by Next.js
    EXPOSE 8080
    
    # Start the app
    CMD ["pnpm", "start"]
    