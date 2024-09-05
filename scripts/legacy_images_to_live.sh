#/bin/bash

LEGACY_IMGS_DIR=$1
LIVE_IMGS_DIR=$2
BGREM_PY_FILE_PATH=$3

if [[ -z "$LEGACY_IMGS_DIR" ]]; then
    echo Legacy images dir was not specified!
    exit 1
fi

if [[ -z "$LIVE_IMGS_DIR" ]]; then
    echo Live images dir was not specified!
    exit 1
fi

LEGACY_IMGS=$(find $LEGACY_IMGS_DIR -type f -name "*.jpg")
LIVE_IMGS=()

echo Converting legacy images to webp...
for LEGACY_IMG in $LEGACY_IMGS; do
    DIRNAME=$(dirname $LEGACY_IMG)
    DIRNAME=${DIRNAME/$LEGACY_IMGS_DIR/$LIVE_IMGS_DIR}

    FILENAME=$(basename $LEGACY_IMG)
    FILENAME=${FILENAME/.jpg/.webp}

    LIVE_IMG=$DIRNAME/$FILENAME
    
    mkdir -p $DIRNAME

    if ! [ -f $LIVE_IMG ]; then
        cwebp $LEGACY_IMG -o $LIVE_IMG
        LIVE_IMGS+=($LIVE_IMG)
    fi
done

if ! [[ -z "$BGREM_PY_FILE_PATH" ]]; then
    echo Removing bg from live images...
    if [ "${#LIVE_IMGS[@]}" -gt "0" ]; then
        echo ${LIVE_IMGS[@]} | python $BGREM_PY_FILE_PATH
    fi
fi

