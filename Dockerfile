# Use official Node.js 20 runtime as base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code including all directories
COPY . .

# Create uploads directory and set permissions
RUN mkdir -p uploads && chmod 755 uploads

# Ensure all model files are accessible
RUN chmod -R 755 models/

# Expose port 4050
EXPOSE 4050

# Set environment variable for port
ENV PORT=4050

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4050/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "server.js"]
