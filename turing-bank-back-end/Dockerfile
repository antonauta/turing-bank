FROM node:10.16.0-alpine
RUN apk add --no-cache tini 


WORKDIR /usr/src/app

ENV NODE_ENV=PROD


COPY package.json package-lock*.json ./
RUN apk --no-cache add --virtual builds-deps build-base python ## POR FAVOR NAO DELETAR ESSA LINHA! https://github.com/kelektiv/node.bcrypt.js/issues/432#issuecomment-230595650
RUN npm config set registry http://registry.npmjs.org
RUN npm install 


COPY . .

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "run", "start:prod"]