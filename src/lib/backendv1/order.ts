import type { PaymentMethod } from "$lib/orderinfo/orderinfo";
import { backendv1_endpoint } from "./endpoint";
import type { ServerResponse } from "./response";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { FetchFunction } from "./safe_fetch";
import { backendv1_base_fetch } from "./base_fetch";
import type { V1ServerCouponInfo } from "./coupon";

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

    coupon?: string;
};

export type V1ServerPurchasedProduct = {
    internal_id: string;
    name: string;
    image_url: string;
    currency: string;
    qty: number;
    price: number;
    price_decimals: number;
    discount: number;
};

export type V1ServerOrderStatus = "canceled" | "registered" | "confirmed" | "shipped" | "completed";

export type V1ServerOrder = {
    id: string;

    date: Date,

    firstname: string;
    lastname: string;
    phone: string;

    payment_method: "cash" | "card";

    billing_county: string;
    billing_city: string;
    billing_address: string;
    billing_postalcode: string;

    shipping_county: string;
    shipping_city: string;
    shipping_address: string;
    shipping_postalcode: string;

    shipping_method: string;
    shipping_tracking_number: string | undefined;
    shipping_price: number;
    shipping_price_decimals: number;

    products: V1ServerPurchasedProduct[];

    status: V1ServerOrderStatus;

    coupon?: V1ServerCouponInfo;
};

/* server -> client. This stuff is publicly accessible by anyone, so let's not include any personal info */
export type V1ServerOrderDisplayInfo = {
    id: string;
    products: V1ServerPurchasedProduct[];
    status: V1ServerOrderStatus;
};

export type V1ServerOrders = {
    orders: V1ServerOrder[];
    pages: number;
}

export async function backendv1_post_order_submit(order_register_info: V1ClientOrderInfo, turnstile_token: string): Promise<ServerResponse<string>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/register`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS
            },
            body: JSON.stringify({ turnstile_token, order_register_info })
        }
    );
}

export async function backendv1_get_order_get(order_id: string, fetch_func: FetchFunction): Promise<ServerResponse<V1ServerOrderDisplayInfo>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/get?order_id=${order_id}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            },
        },
        fetch_func
    );
}

export async function backendv1_order_user_all(fetch_func: FetchFunction): Promise<ServerResponse<V1ServerOrders>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/all`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            },
        },
        fetch_func
    );
}
