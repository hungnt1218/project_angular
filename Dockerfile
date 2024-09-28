FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy files to working directory
COPY . /usr/src/app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install json-server globally
RUN npm install -g json-server

# Install dependencies
RUN npm install

# Copy db.json file
COPY db.json .

# Expose the ports for Angular and JSON Server
EXPOSE 4200 3000


CMD ["npm", "run", "start"]