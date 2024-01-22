#! /bin/bash

SCRIPT_DIR="$(dirname "$0")"
BASE_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="${BASE_DIR}/containers/data"

# Set export interval
EXPORT_INTERVAL=${1:-60}
if ! [[ $EXPORT_INTERVAL =~ ^[0-9]+$ ]]; then
  echo "デフォルトの60秒に設定します。"
  EXPORT_INTERVAL=60
fi

echo "INTERVAL: ${EXPORT_INTERVAL}"

# Javaオプションを設定し、Firebaseエミュレータを起動
export JAVA_TOOL_OPTIONS="-Xms4g -Xmx8g"
TZ=JST firebase emulators:start --project=default --import="${DATA_DIR}" &

# エミュレータが起動したかどうかをチェック
EMULATOR_URL="http://127.0.0.1:4000"
MAX_RETRIES=5
for ((i=1; i<=MAX_RETRIES; i++)); do
  sleep 5
  if curl -LI "${EMULATOR_URL}" -o /dev/null -w '%{http_code}\n' -s | grep -q "200"; then
    echo "Firebaseエミュレータが起動しました。"
    break
  fi
  echo "エミュレータの起動を待っています... 試行回数 $i / $MAX_RETRIES"
done

# スクリプト終了時の処理関数
cleanup() {
  echo "Firebaseエミュレータを停止しています..."
  firebase emulators:export "${DATA_DIR}"
  exit
}

# シグナルトラップの設定
trap cleanup SIGINT SIGTERM

# 定期的なエクスポート
while [ ${EXPORT_INTERVAL} -ne 0 ]; do
  sleep "${EXPORT_INTERVAL}"
  "${SCRIPT_DIR}/export.sh"
done

wait
