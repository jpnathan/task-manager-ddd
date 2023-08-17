#!/bin/bash
set -e

DB_NAME=ada_tech
DB_PASSWORD=123456
CONTAINER_NAME=ada_tech

echo "Starting db docker container..."

# first check if it's already running...
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  docker run --rm --name $CONTAINER_NAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=$DB_NAME -d -p 5432:5432 postgres
  
  sleep 3
  
  docker cp ./init.sql $CONTAINER_NAME:/docker-entrypoint-initdb.d/init.sql
  docker exec -u postgres $CONTAINER_NAME psql $DB_NAME postgres -f /docker-entrypoint-initdb.d/init.sql
fi

echo "Done."