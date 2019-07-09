FROM node:10.16.0-alpine
RUN apk add --no-cache tini 
RUN mkdir /app

WORKDIR /app

ENV NODE_ENV=PROD


COPY package.json package-lock*.json ./

RUN npm install 


COPY . .

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "start"]