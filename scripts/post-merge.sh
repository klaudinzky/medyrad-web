#!/usr/bin/env bash
set -euo pipefail

export CI=true

npm ci --no-audit --no-fund
npm run check
npm run build