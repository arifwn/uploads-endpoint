#!/bin/bash

set -e

if [ "$1" = 'run' ]; then
    exec yarn run start
else
    exec "$@"
fi