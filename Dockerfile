FROM node:22.0.0

WORKDIR /usr/src/vspot_frontend

# Copy the package.json first so we don't rerun yarn install when it doesn't need to
COPY package.json .

RUN yarn install

# Copy the rest of the app
COPY . .

RUN yarn run build

# Remove the .env not harmfull but not needed also :P
RUN rm .env

RUN useradd -s /bin/bash -m vspot

USER vspot

CMD [ "node", "build" ]

