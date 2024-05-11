import type { PaymentMethod } from "$lib/orderinfo/orderinfo";
import { backendv1_endpoint } from "./endpoint";
import type { ServerResponse } from "./response";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";
import { error } from "@sveltejs/kit";

export type V1ClientPurchasedProduct = {
    internal_id: string;
    qty: number;
};

export type V1ClientOrderInfo = {
    products: V1ClientPurchasedProduct[];

    /* Contact info */
    firstname: string;
    lastname: string;
    phone: string;
    email?: string;

    /* Payment */
    payment_method: PaymentMethod;

    /* Billing */
    billing_county: string;
    billing_city: string;
    billing_address: string;
    billing_postalcode: string;

    /* Shipping */
    shipping_county: string;
    shipping_city: string;
    shipping_address: string;
    shipping_postalcode: string;

    /* Shipping method */
    shipping_method: string;
};

export type V1ServerPurchasedProduct = {
    id: string;
    name: string;
    image_url: string;
    qty: number;
    price: number;
    price_decimals: number;
    discount: number;
    discount_decimals: number;
};

export type V1ServerOrderStatus = "registered" | "confirmed" | "shipped" | "completed";

/* server -> client. This stuff is publicly accessible by anyone, so let's not include any personal info */
export type V1ServerOrderDisplayInfo = {
    id: string;
    products: V1ServerPurchasedProduct[];
    status: V1ServerOrderStatus;
};

export async function backendv1_post_order_submit(order_info: V1ClientOrderInfo, turnstile_token: string): Promise<ServerResponse<string>> {

    const BASE_ENDPOINT = backendv1_endpoint();
    const res = await fetch(`${BASE_ENDPOINT}/order/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        body: JSON.stringify({ turnstile_token, order_info })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_get_order_get(order_id: string, fetch: any): Promise<ServerResponse<V1ServerOrderDisplayInfo>> {

    const res = await fetch(`${backendv1_endpoint()}/order/get?order_id=${order_id}`, {
        method: "GET",
        headers: {
            ...BACKENDV1_BASE_GET_HEADERS
        },
    });

    return { status: res.status, body: await res.json() };
}
