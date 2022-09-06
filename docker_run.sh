#!/bin/sh

# npm install npm run build

docker build -t js-lambda .

docker run -it \
    -p 9000:8080 \
    -p 9229:9229 \
    --env NODE_OPTIONS='--inspect=0.0.0.0' \
    --env RANDOM=${date} \
    --name lambda \
    --mount type=bind,source=$(pwd)/dist,target=/var/task \
    --rm js-lambda
