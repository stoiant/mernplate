#!/bin/bash
[ ! -d /var/log/mongosql ] && mkdir -p /var/log/mongosql
exec svlogd /var/log/mongosql
