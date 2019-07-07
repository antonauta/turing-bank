FROM node:10.16.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html
