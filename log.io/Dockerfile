#
# log.io Dockerfile
#

# Pull base image.
FROM phusion/baseimage:0.11

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

RUN apt-get update && apt install -y wget

# Install node and node 10 dependencies
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

RUN npm install -g log.io && npm install -g log.io-file-input
# pin node version to prevent apt auto upgrade when newer version is available
RUN echo "nodejs hold" | dpkg --set-selections

RUN mkdir -p ~/.log.io/inputs
COPY config/server/server.json /root/.log.io/server.json
COPY config/file_collector/file.json /root/.log.io/inputs/file.json

# Setup directories and run the image as a service using runit
RUN mkdir -p /etc/sv/server/log
RUN mkdir -p /etc/sv/file_collector/log
RUN mkdir -p /etc/service/server/log
RUN mkdir -p /etc/service/file_collector/log


COPY config/file_collector/runit.run.sh /etc/sv/file_collector/run
COPY config/file_collector/runit.log.sh /etc/sv/file_collector/log/run
COPY config/server/runit.run.sh /etc/sv/server/run
COPY config/server/runit.log.sh /etc/sv/server/log/run

# Enable services and log
RUN chmod 755 /etc/sv/server/run && ln -s /etc/sv/server/run /etc/service/server/run
RUN chmod 755 /etc/sv/server/log/run && ln -s /etc/sv/server/log/run /etc/service/server/log/run
RUN chmod 755 /etc/sv/file_collector/run && ln -s /etc/sv/file_collector/run /etc/service/file_collector/run
RUN chmod 755 /etc/sv/file_collector/log/run && ln -s /etc/sv/file_collector/log/run /etc/service/file_collector/log/run

# Export port for webui and file_collector if other services are added
EXPOSE 6689
EXPOSE 6688

RUN mkdir -p /data/log
VOLUME /data/log

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
