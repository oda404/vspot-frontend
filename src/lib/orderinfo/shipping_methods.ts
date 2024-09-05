import { backendv1_get_shipping_methods } from "$lib/backendv1/shipping";

export function shipping_methods_get_img_url(value: string) {
    return `/res-images/${value}.webp`;
}

export function shipping_get_tracking_url(method: string, tracking_number: string) {
    switch (method) {
        case "fancourier":
            return `https://www.fancourier.ro/awb-tracking/?tracking=${tracking_number}`;

        default:
            return "";
    }
}
