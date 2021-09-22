FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Open port 8080 
EXPOSE 8080

# Start server
CMD [ "node", "server.js" ]