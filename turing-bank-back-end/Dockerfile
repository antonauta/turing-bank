FROM node:10.16.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV NODE_ENV=PROD

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]