#
# MongoDB Dockerfile
#

# Pull base image.
FROM phusion/baseimage:0.11

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

RUN apt-get update && apt install -y wget

# Install MongoDB.
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | \
  tee /etc/apt/sources.list.d/mongodb-org-4.2.list

# Timezone set to UTC if this is not run install of tzdata will give a prompt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get -y install tzdata
RUN apt-get update && apt install -y mongodb-org=4.2.2

# Pin mongo version to prevent apt auto upgrade when newer version is available
RUN echo "mongodb-org hold" | dpkg --set-selections
RUN echo "mongodb-org-server hold" | dpkg --set-selections
RUN echo "mongodb-org-shell hold" | dpkg --set-selections
RUN echo "mongodb-org-mongos hold" | dpkg --set-selections
RUN echo "mongodb-org-tools hold" | dpkg --set-selections

# Setup directories and run the image as a service using runit
RUN mkdir -p /data/db
RUN mkdir -p /config/mongod
RUN mkdir -p /etc/sv/mongod/log
RUN mkdir -p /etc/service/mongod/log

COPY mongod/runit.run.sh /etc/sv/mongod/run
COPY mongod/runit.log.sh /etc/sv/mongod/log/run
COPY mongod/mongod.conf /config/mongod/mongod.conf

RUN chmod 755 /etc/sv/mongod/run && ln -s /etc/sv/mongod/run /etc/service/mongod/run
RUN chmod 755 /etc/sv/mongod/log/run && ln -s /etc/sv/mongod/log/run /etc/service/mongod/log/run

# Install mongodb-bi connector
WORKDIR /tmp
RUN  wget https://info-mongodb-com.s3.amazonaws.com/mongodb-bi/v2/mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1.tgz
RUN tar -xvf mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1.tgz && cd mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1 && \
  install -m755 bin/mongo* /usr/local/bin/

# Cleanup downloaded files
RUN rm -rf mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1.tgz mongodb-bi-linux-x86_64-ubuntu1804-v2.13.1

# Setup directories and run the image as a service using runit
RUN mkdir -p /config/mongosqld
RUN mkdir -p /etc/sv/mongosqld
RUN mkdir -p /etc/service/mongosqld/log

COPY ./mongosqld/runit.run.sh /etc/sv/mongosqld/run
COPY ./mongosqld/runit.log.sh /etc/sv/mongosqld/log/run
COPY ./mongosqld/mongosqld-config.yml /config/mongosqld/mongosqld-config.yml

RUN chmod 755 /etc/sv/mongosqld/run && ln -s /etc/sv/mongosqld/run /etc/service/mongosqld/run
RUN chmod 755 /etc/sv/mongosqld/log/run && ln -s /etc/sv/mongosqld/log/run /etc/service/mongosqld/log/run

# TODO setup authentication for mongodb and mongodbsql
#  - will most likely have to restart the service with sv mongod restart
#ADD create_auth.js /tmp/
#RUN mongod -f /etc/mongod.conf --fork --logpath /var/log/mongodb.log \
#  && sleep 5 \
#  && mongo < /tmp/create_auth.js

# Define mountable directories.
VOLUME ["/var/lib/mongodb"]
VOLUME ["/var/log/mongodb"]
VOLUME ["/var/log/mongosql"]

# Expose ports.
#   - 27017: process
#   - 28017: http
#   - 3307: mongod-bi
EXPOSE 27017
EXPOSE 28017
EXPOSE 3307

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
