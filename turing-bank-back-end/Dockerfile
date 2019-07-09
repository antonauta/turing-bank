FROM node:10.16.0-alpine
RUN apk add --no-cache tini 


WORKDIR /usr/src/app

ENV NODE_ENV=PROD


COPY package.json package-lock*.json ./

RUN npm config set registry http://registry.npmjs.org
RUN npm install 


COPY . .

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "run", "start:prod"]