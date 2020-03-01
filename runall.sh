#!/usr/bin/env bash

python3 api_bridges/skyscanner/app.py &
node api_bridges/interrail/index.js &
npm run serve &

echo "Running..."
wait
