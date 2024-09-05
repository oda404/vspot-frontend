from rembg import remove
from PIL import Image
import os
from tqdm import tqdm

def remove_img_bg(img_path):

    if not img_path.endswith(".webp"):
        print(f"Tried to clean unsupported file {img_path}");
        return;

    img = Image.open(img_path);
    clean_img = remove(img);
    clean_img.save(img_path);

def main():
    imgs_to_clean = input();
    
    imgs_to_clean = imgs_to_clean.split(' ');

    for img in tqdm(imgs_to_clean):
        remove_img_bg(img);

if __name__ == "__main__":
    main()

