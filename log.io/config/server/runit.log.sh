#!/bin/bash
[ ! -d /var/log/weblog/server ] && mkdir -p /var/log/weblog/server
exec svlogd /var/log/weblog/server
