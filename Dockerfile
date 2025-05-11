FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Environment variables for development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Expose the port
EXPOSE 3000

# Start the dev server
CMD ["npm", "run", "start"]