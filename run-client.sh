#!/bin/sh

sh -c "
    cd ./client;
    npm run serve -- --port 3000
"

echo "run-client script executed successfully"