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

export type V1ServerProductListLandingPage = {
    newest: V1ServerProductDisplayData[];
    pouches: V1ServerProductDisplayData[];
    kits: V1ServerProductDisplayData[];
}

export type V1ServerProductFullinfo = {
    name: string;
    image_url: string;
    tags: { name: string; options: string[] }[];

    /* These are handed by us */
    price: number;
    price_decimals: number;
    currency: string;
    stock: number;
};

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

export async function backendv1_get_product_fullinfo(
    id: string,
    fetch: any
): Promise<ServerResponse<V1ServerProductFullinfo>> {
    const res = await fetch(
        `${backendv1_endpoint()}/product/fullinfo?product_id=${id}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            }
        }
    );

    return { status: res.status, body: await res.json() };
}

export async function backendv1_get_products_landingpage(
    fetch: any
): Promise<ServerResponse<V1ServerProductListLandingPage>> {

    const res = await fetch(
        `${backendv1_endpoint()}/product/landingpage`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            }
        }
    );

    return { status: res.status, body: await res.json() };
}

