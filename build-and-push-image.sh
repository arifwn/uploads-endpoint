#!/usr/bin/env bash

set -euxo pipefail

yarn run build

echo "building image..."
docker build -t docker.pkg.github.com/arifwn/uploads-endpoint/uploads .

echo "pushing image..."
docker push docker.pkg.github.com/arifwn/uploads-endpoint/uploads:latest

echo "done!"