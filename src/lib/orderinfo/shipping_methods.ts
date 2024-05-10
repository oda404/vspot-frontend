import { backendv1_get_shipping_methods } from "$lib/backendv1/shipping";

export function shipping_get_methods(weight_grams = 100) {
    return backendv1_get_shipping_methods(weight_grams);
}

export function shipping_methods_get_img_url(value: string) {
    return `/images/shipping/${value}.webp`;
}
