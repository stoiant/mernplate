FROM nginx:1.17-alpine

WORKDIR /usr/share/nginx/html

RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/certbot
RUN mkdir -p /usr/share/nginx/html
RUN mkdir -p /etc/letsencrypt/live/${DOMAIN}

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
# For dev the build directory can be mounted
ADD build /usr/share/nginx/html

# For nginx to start it needs valid cert files, copy over localhost until it is overwritten
COPY certs/localhost.crt /etc/letsencrypt/live/${DOMAIN}/fullchain.pem
COPY certs/localhost.key /etc/letsencrypt/live/${DOMAIN}/privkey.pem

VOLUME /var/log/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/letsencrypt
VOLUME /var/www/certbot

EXPOSE 80
EXPOSE 443
