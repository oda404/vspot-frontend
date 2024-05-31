import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

export type V1ServerCategoryFilter = {
    name: string;
    options: string[];
};

export type V1ServerProductDisplayData = {
    internal_id: string;
    name: string;
    image_url: string;
    price: number;
    price_decimals: number;
    discount: number;
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
    internal_id: string;
    name: string;
    image_url: string;
    tags: { name: string; options: string[] }[];

    /* These are handed by us */
    price: number;
    price_decimals: number;
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

// export async function backendv1_get_product_fullinfo(
//     id: string,
//     fetch: any
// ): Promise<ServerResponse<V1ServerProductFullinfo>> {
//     const res = await fetch(
//         `${backendv1_endpoint()}/product/fullinfo?product_id=${id}`,
//         {
//             method: "GET",
//             headers: {
//                 ...BACKENDV1_BASE_GET_HEADERS
//             }
//         }
//     );
//     return { status: res.status, body: await res.json() };
// }

export async function backendv1_get_product_fullinfo_with_recommendations(
    id: string,
    fetch: any
): Promise<ServerResponse<V1ServerProductFullInfoWithRecommendations>> {
    const res = await fetch(
        `${backendv1_endpoint()}/product/fullinfo_recommend?product_id=${id}`,
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

export async function backendv1_get_products_displayinfo(ids: string[]): Promise<ServerResponse<V1ServerProductDisplayData[]>> {
    const res = await fetch(
        `${backendv1_endpoint()}/product/coreinfo?ids=${ids.join("+")}`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            }
        }
    );

    return { status: res.status, body: await res.json() };
}
