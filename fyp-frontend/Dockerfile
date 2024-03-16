# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use an official lightweight Node.js runtime as the base image for the built application
FROM node:14-alpine

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Install serve to serve the built application
RUN npm install -g serve

# Copy the built application from the previous stage
COPY --from=0 /usr/src/app/build .

# Expose port 5000 for the application
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "start" ]