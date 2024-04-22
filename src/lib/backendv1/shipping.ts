import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

export type V1ShippingMethod = {
    name: string;
    display: string;
    cost: { price: number, price_decimals: number };
    delivery_time_days: number[];
}

export async function backendv1_get_shipping_methods(weight_grams: number): Promise<ServerResponse<V1ShippingMethod[]>> {
    const BASE_ENDPOINT = backendv1_endpoint();

    const res = await fetch(
        `${BASE_ENDPOINT}/shipping/methods?weight_grams=${weight_grams}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            }
        }
    );
    return { status: res.status, body: await res.json() };
}
