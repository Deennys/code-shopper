# Base image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 80

# Start the frontend
CMD ["yarn", "start"]