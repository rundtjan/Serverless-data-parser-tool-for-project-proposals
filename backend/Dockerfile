FROM node:16-alpine
  
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN adduser nodeuser --disabled-password

USER nodeuser

CMD npm start
