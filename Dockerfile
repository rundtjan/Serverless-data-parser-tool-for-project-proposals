FROM node:16-alpine

RUN adduser nodeuser --disabled-password

USER nodeuser

COPY --chown=nodeuser:nodeuser . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

RUN npm run build

CMD npm start
