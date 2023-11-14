# base image
FROM node:15

RUN apt-get update && apt-get install -y graphicsmagick

WORKDIR '/app'

# install and cache app dependencies
COPY package.json .
RUN npm install

RUN npm i bcrypt

COPY . .


# start app
CMD ["npm", "start"]