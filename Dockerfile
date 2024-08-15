FROM node:22.0.0

WORKDIR /usr/src/vspot_frontend

COPY . .

RUN yarn install

RUN yarn run build

RUN useradd -s /bin/bash -m vspot

USER vspot

CMD [ "node", "build" ]

