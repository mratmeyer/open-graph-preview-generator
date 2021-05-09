FROM node:14-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev

COPY . .

CMD [ "npm", "start" ]
