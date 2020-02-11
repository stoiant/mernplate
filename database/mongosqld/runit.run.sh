#!/bin/bash
exec /usr/local/bin/mongosqld  --config /config/mongosqld/mongosqld-config.yml 2>&1
