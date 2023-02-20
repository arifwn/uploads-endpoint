#!/usr/bin/env bash

set -euxo pipefail

yarn run build

echo "building image..."
docker buildx build -t groverweb/cloudflare-video-api-server:upload-server .

echo "pushing image..."
docker push groverweb/cloudflare-video-api-server:upload-server

echo "done!"