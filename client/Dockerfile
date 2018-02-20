FROM node:9

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --verbose
RUN npm install react-scripts@1.1.1 -g --verbose

RUN yarn
