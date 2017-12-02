FROM node:9
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
EXPOSE 9378
