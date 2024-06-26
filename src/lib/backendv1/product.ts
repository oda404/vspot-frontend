import { backendv1_base_fetch } from "./base_fetch";
import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS } from "./headers";
import type { ServerResponse } from "./response";
import type { FetchFunction } from "./safe_fetch";

export type V1ServerCategoryFilter = {
    name: string;
    options: string[];
};

export type V1ServerProductDisplayData = {
    internal_id: string;
    name: string;
    image_url: string;
    price: number;
    discount: number;
    currency: string;
    stock: number;
};

export type V1ServerProductListByCategory = {
    products: V1ServerProductDisplayData[];
    filters: V1ServerCategoryFilter[];
    pages: number;
};

export type V1ServerProductListLandingPage = {
    newest: V1ServerProductDisplayData[];
    pouches: V1ServerProductDisplayData[];
    kits: V1ServerProductDisplayData[];
};

export type V1ServerProductFullinfo = {
    internal_id: string;
    name: string;
    image_url: string;
    tags: { name: string; options: string[] }[];

    /* These are handed by us */
    price: number;
    discount: number;
    currency: string;
    stock: number;
    description_short?: string;
    description_long?: string;
};

export type V1ServerProductFullInfoWithRecommendations = {
    product: V1ServerProductFullinfo;
    recommended: V1ServerProductDisplayData[];
};

export async function backendv1_get_products_all(
    category: string,
    search_params: string,
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerProductListByCategory>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/product/${category}/all?${search_params}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}

export async function backendv1_get_product_fullinfo_with_recommendations(
    id: string,
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerProductFullInfoWithRecommendations>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/product/fullinfo_recommend?product_id=${id}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}

export async function backendv1_get_products_landingpage(
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerProductListLandingPage>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/product/landingpage`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}

export async function backendv1_get_products_displayinfo(
    ids: string[],
): Promise<ServerResponse<V1ServerProductDisplayData[]>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/product/coreinfo?ids=${ids.join("+")}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
    );
}

export async function backendv1_get_random_product(
    ids: string[],
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerProductDisplayData | null>> {
    let exclude = "";
    if (ids.length) exclude = `exclude=${ids.join("+")}`;

    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/product/random?${exclude}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}

export async function backendv1_product_search(
    keywords: string[],
    fetch_func: FetchFunction,
): Promise<ServerResponse<V1ServerProductDisplayData[]>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/product/search?keywords=${keywords.join("+")}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS,
            },
        },
        fetch_func,
    );
}
