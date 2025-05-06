FROM node:23-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the dev port
EXPOSE 3000

# Enable file system watching in Docker
ENV CHOKIDAR_USEPOLLING=true

# Start the dev server
CMD ["npm", "run", "dev"]
