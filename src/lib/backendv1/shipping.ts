import { backendv1_base_fetch } from "./base_fetch";
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
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/shipping/methods?weight_grams=${weight_grams}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            }
        }
    );
}
