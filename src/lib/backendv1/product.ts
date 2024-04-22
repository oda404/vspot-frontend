import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

export type V1ServerCategoryFilter = {
    title: string;
    options: {
        name: string;
        matches: number;
    }[];
};

export type V1ServerProductDisplayData = {
    internal_id: string;
    name: string;
    image_url: string;
    price: number;
    price_decimals: number;
    currency: string;
    stock: number;
}

export type V1ServerProductListByCategory = {
    products: V1ServerProductDisplayData[],
    filters: V1ServerCategoryFilter[];
    pages: number;
}

export async function backendv1_get_products_all(
    category: string,
    search_params: string,
    fetch: any
): Promise<ServerResponse<V1ServerProductListByCategory>> {

    const res = await fetch(`${backendv1_endpoint()}/product/${category}/all?${search_params}`, {
        method: "GET",
        headers: {
            ...BACKENDV1_BASE_GET_HEADERS
        },
    });

    return { status: res.status, body: await res.json() };
}
