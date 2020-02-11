#!/bin/bash
[ ! -d /var/log/mongodb ] && mkdir -p /var/log/mongodb
exec svlogd /var/log/mongodb
