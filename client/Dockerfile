FROM node:17.2-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

CMD ["npm", "start"]