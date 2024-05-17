# Use the official Node.js 14 image as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json file
COPY package.json ./

# Install the dependencies in the package.json
RUN npm install

# Bundle the application source code inside the Docker image
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]