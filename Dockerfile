# Use the official Mautic image as the base image
FROM mautic/mautic:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm

# Create a directory for your Node.js application
WORKDIR /app

# Copy your Node.js application files into the container
COPY node_app/package.json node_app/package-lock.json /app/
RUN npm install
COPY node_app /app/

# Expose the port used by your Node.js application
EXPOSE 30008

# Start your Node.js application alongside Mautic
CMD ["npm", "start"]
