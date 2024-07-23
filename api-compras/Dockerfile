FROM node:16

COPY [".","/usr/src"]

WORKDIR /usr/src

RUN npm install

ENV NEW_RELIC_NO_CONFIG_FILE=true

CMD ["npm", "start"]
