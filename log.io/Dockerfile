FROM keymetrics/pm2:8-alpine

RUN npm install -g log.io

COPY config/server.json ~/.log.io/server.json
COPY config/file.json ~/.log.io/file.json

EXPOSE 6689
EXPOSE 6688

CMD ["log.io-server"]
