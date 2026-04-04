# This file is intended to be sourced, not executed directly.
# Usage: source scripts/my-functions.sh

TIMEOUT=120

# -- wait_for_container_log --
# $1: docker container name
# $2: string value to wait to appear in container logs
function wait_for_container_log() {
  local container="$1"
  local search="$2"
  local log
  local log_waiting="Waiting for string '$search' in the $container logs ..."
  echo "${log_waiting} It will timeout in ${TIMEOUT}s"
  SECONDS=0

  while true ; do
    log=$(docker logs "$container" 2>&1 | grep "$search") || true
    if [ -n "$log" ] ; then
      echo "$log"
      break
    fi

    if [ "$SECONDS" -ge "$TIMEOUT" ] ; then
      echo "${log_waiting} TIMEOUT"
      break
    fi
    sleep 1
  done
}