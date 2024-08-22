import type { PaymentMethod } from "$lib/orderinfo/orderinfo";
import { backendv1_endpoint } from "./endpoint";
import type { ServerResponse } from "./response";
import {
    BACKENDV1_BASE_GET_HEADERS,
    BACKENDV1_BASE_POST_HEADERS,
} from "./headers";
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
    email: string;

    /* Payment */
    payment_method: PaymentMethod;

    /* Billing */
    billing_county: string;
    billing_city: string;
    billing_street: string;
    billing_postalcode: string;
    billing_house_number: string | undefined;
    billing_building_number: string | undefined;
    billing_building_entrance: string | undefined;
    billing_building_apartment: string | undefined;

    /* Shipping */
    shipping_county: string;
    shipping_city: string;
    shipping_street: string;
    shipping_postalcode: string;
    shipping_house_number: string | undefined;
    shipping_building_number: string | undefined;
    shipping_building_entrance: string | undefined;
    shipping_building_apartment: string | undefined;

    /* Shipping method */
    shipping_method: string;

    coupon?: string;
};

export type V1ServerPurchasedProduct = {
    internal_id: string;
    pretty_internal_id: string;
    name: string;
    image_url: string;
    currency: string;
    qty: number;
    price: number;
    discount: number;
};

export type V1ServerOrderStatus = "canceled" | "returned" | "registered" | "confirmed" | "shipped" | "completed";

export type V1ServerOrder = {
    id: string;
    id_hr: string;

    date: Date;

    firstname: string;
    lastname: string;
    phone: string;
    email: string;

    payment_method: "cash" | "card";

    billing_county: string;
    billing_city: string;
    billing_street: string;
    billing_postalcode: string;
    billing_house_number: string | undefined;
    billing_building_number: string | undefined;
    billing_building_entrance: string | undefined;
    billing_building_apartment: string | undefined;

    shipping_county: string;
    shipping_city: string;
    shipping_street: string;
    shipping_postalcode: string;
    shipping_house_number: string | undefined;
    shipping_building_number: string | undefined;
    shipping_building_entrance: string | undefined;
    shipping_building_apartment: string | undefined;

    shipping_method: string;
    shipping_tracking_number: string | undefined;
    shipping_price: number;

    products: V1ServerPurchasedProduct[];

    status: V1ServerOrderStatus;

    coupon?: V1ServerCouponInfo;
};

export type V1ServerOrders = {
    orders: V1ServerOrder[];
    pages: number;
};

export async function backendv1_order_submit(
    order_register_info: V1ClientOrderInfo,
    turnstile_token: string,
): Promise<ServerResponse<string>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS,
            },
            body: JSON.stringify({ turnstile_token, data: order_register_info }),
        },
    );
}

export async function backendv1_order_user_all(
    page: number,
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerOrders>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/all?page=${page}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}

export async function backendv1_order_all_admin(
    page: number,
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerOrders>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/all-portal?page=${page}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}

export async function backendv1_order_confirm(
    id: string,
): Promise<ServerResponse> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/confirm`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS,
            },
            body: JSON.stringify({
                data: {
                    id
                }
            }),
        },
    );
}

export async function backendv1_order_ship(
    id: string,
    shipping_number: string,
): Promise<ServerResponse> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/ship`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS,
            },
            body: JSON.stringify({
                data: {
                    id,
                    shipping_number,
                }
            }),
        },
    );
}

export async function backendv1_order_complete(
    id: string,
): Promise<ServerResponse> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/complete`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS,
            },
            body: JSON.stringify({
                data: {
                    id
                }
            }),
        },
    );
}

export async function backendv1_order_cancel(
    id: string,
): Promise<ServerResponse> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/order/cancel`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS,
            },
            body: JSON.stringify({
                data: {
                    id
                }
            }),
        },
    );
}

export async function backendv1_order_delete(
    order_id: string,
): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/order`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS,
        },
        body: JSON.stringify({
            data: {
                id: order_id,
            }
        }),
    });
}
