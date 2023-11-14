# base image
FROM node:15

WORKDIR '/app'

# install and cache app dependencies
COPY package.json .
RUN npm install
COPY . .
# start app
CMD ["npm", "start"]