# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Run tests (optional - remove if you don't want tests during build)
RUN npm test

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]