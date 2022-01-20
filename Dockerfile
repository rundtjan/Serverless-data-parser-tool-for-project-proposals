FROM node:16
  
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN useradd -m nodeuser

USER nodeuser

CMD npm start
