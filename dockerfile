FROM node:16

WORKDIR /usr/src/404

COPY package*.json ./

RUN npm install

COPY .env .env
COPY src src/

EXPOSE 8080

CMD [ "node","src/index" ]