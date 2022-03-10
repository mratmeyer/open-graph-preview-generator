FROM node:14-slim

RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

EXPOSE 8080

COPY . .

CMD [ "npm", "start" ]
