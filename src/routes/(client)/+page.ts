import { backendv1_get_products_landingpage } from "$lib/backendv1/product";
import { error } from "@sveltejs/kit";

export async function load({ fetch, url }) {

    let res = await backendv1_get_products_landingpage(fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    return {
        products: res.body.data! || [],
    };
}
