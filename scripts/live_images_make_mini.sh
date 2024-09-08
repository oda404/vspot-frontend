#/bin/bash

BIG_IMGS_DIR=$1
MINI_IMGS_DIR=$2

if [[ -z "$BIG_IMGS_DIR" ]]; then
    echo Live images dir was not specified!
    exit 1
fi

if [[ -z "$MINI_IMGS_DIR" ]]; then
    echo Mini images dir was not specified!
    exit 1
fi

BIG_IMGS=$(find $BIG_IMGS_DIR -type f -name "*.webp")

echo Converting big images to mini...
for BIG_IMG in $BIG_IMGS; do

    DIRNAME=$(dirname $BIG_IMG)
    DIRNAME=${DIRNAME/$BIG_IMGS_DIR/$MINI_IMGS_DIR}

    MINI_IMG=$DIRNAME/$(basename $BIG_IMG)

    mkdir -p $DIRNAME

    magick $BIG_IMG -filter Catrom -resize 220x220 -strip -unsharp 0x0.5+0.5+0.05 $MINI_IMG
done
