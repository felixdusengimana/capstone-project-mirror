# Stage 1: Build the Next.js application
FROM node:22 AS build

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm build

# Stage 2: Serve the Next.js application
FROM node:22

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app ./

# Install only production dependencies
RUN pnpm install --prod

# Expose port 8080
EXPOSE 8080

# Start the Next.js application
CMD ["pnpm", "start"]