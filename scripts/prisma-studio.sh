#!/bin/bash
set -e

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
ENV_PATH="$SCRIPT_DIR/../configs/.development.env"

set -a
source "$ENV_PATH"
set +a

npx prisma studio