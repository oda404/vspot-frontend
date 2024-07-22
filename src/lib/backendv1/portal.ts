import { backendv1_base_fetch } from "./base_fetch";
import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS } from "./headers";
import type { V1ServerOrders } from "./order";
import type { ServerResponse } from "./response";
import type { FetchFunction } from "./safe_fetch";

export async function backendv1_get_portal_get_orders(
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerOrders>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/portal/get-orders`,
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
