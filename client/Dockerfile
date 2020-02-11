FROM nginx:1.17-alpine

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

RUN mkdir -p /etc/letsencrypt/live/localhost

COPY certs/localhost.crt /etc/letsencrypt/live/localhost/fullchain.pem
COPY certs/localhost.key /etc/letsencrypt/live/localhost/privkey.pem

VOLUME /var/log/nginx

EXPOSE 80
EXPOSE 443
