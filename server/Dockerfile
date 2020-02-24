# Development
FROM node:10-alpine
RUN apk --update add --no-cache \
  make g++ python2
WORKDIR /server
COPY package*.json /server/
RUN npm install
COPY . /server/
VOLUME /var/log/node
EXPOSE 3001
EXPOSE 3003
CMD ["npm", "run", "dev"]
