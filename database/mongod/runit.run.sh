#!/bin/bash
exec /usr/bin/mongod --bind_ip_all --config /config/mongod/mongod.conf 2>&1
