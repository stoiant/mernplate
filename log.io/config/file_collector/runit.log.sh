#!/bin/bash
[ ! -d /var/log/weblog/file_collector ] && mkdir -p /var/log/weblog/file_collector
exec svlogd /var/log/weblog/file_collector
