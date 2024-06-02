import { backendv1_get_shipping_methods } from "$lib/backendv1/shipping";

export function shipping_methods_get_img_url(value: string) {
    return `/images/shipping/${value}.webp`;
}
