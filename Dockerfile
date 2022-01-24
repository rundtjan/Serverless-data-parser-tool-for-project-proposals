FROM node:16-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/front

RUN npm install

RUN npm run build

WORKDIR /usr/src/app

RUN /bin/busybox cp -r front/build backend/

FROM node:16-alpine

RUN adduser nodeuser --disabled-password

USER nodeuser

COPY --chown=nodeuser:nodeuser --from=build-stage /usr/src/app/backend/ /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD npm run start-prod

