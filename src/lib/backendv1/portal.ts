import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { V1ServerOrders } from "./order";
import type { ServerResponse } from "./response";

export async function backendv1_get_portal_get_orders(fetch: any): Promise<ServerResponse<V1ServerOrders>> {

    const res = await fetch(`${backendv1_endpoint()}/portal/get-orders`, {
        method: "GET",
        credentials: "include",
        headers: {
            ...BACKENDV1_BASE_GET_HEADERS
        },
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_portal_set_order_status(
    order_id: string,
    status: string,
    extra_data: string | undefined,
): Promise<ServerResponse> {

    const res = await fetch(`${backendv1_endpoint()}/portal/set-order-status`, {
        method: "POST",
        credentials: "include",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        body: JSON.stringify({ order_id, status, extra_data })
    });

    return { status: res.status, body: await res.json() };
}
