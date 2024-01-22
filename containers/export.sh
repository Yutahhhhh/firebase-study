#! /bin/bash

SCRIPT_DIR="$(dirname "$0")"
BASE_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="${BASE_DIR}/containers/data"

# エクスポート時にファイルコピーに失敗するのでアクセス権付与
if [ -d /tmp/firebase/storage/blobs ]; then
  chmod -R +r /tmp/firebase/storage/blobs
fi
firebase emulators:export -f ${DATA_DIR}
