#/bin/bash

LEGACY_IMAGES_DIR=$1

if [[ -z "$LEGACY_IMAGES_DIR" ]]; then
    echo Legacy images dir was not specified!
    exit 1
fi

# Transform all non-jpg into jpg
BAD_IMGS=$(find $LEGACY_IMAGES_DIR -type f -not -name "*.jpg")
for BAD_IMG in $BAD_IMGS; do
    EXT=${BAD_IMG##*.}
    GOOD_PATH=${BAD_IMG/.${EXT}/.jpg}
    
    echo Converting $BAD_IMG -> $GOOD_PATH
    magick $BAD_IMG $GOOD_PATH

    rm $BAD_IMG
done

# Replace underscores with dashes
BAD_IMGS=$(find $LEGACY_IMAGES_DIR -type f -name "*_*")
for BAD_IMG in $BAD_IMGS; do
    GOOD_PATH=${BAD_IMG//_/-}
    mv $BAD_IMG $GOOD_PATH
done

# Resize all images to be 700x700
IMGS=$(find $LEGACY_IMAGES_DIR -type f -name "*.jpg")
for IMG in $IMGS; do
    IMG_SIZE=$(identify -ping -format '%wx%h' $IMG)

    if [[ $IMG_SIZE != 700x700 ]]; then
        echo Resizing $IMG
        magick $IMG -resize 750x750 $IMG
    fi
done
