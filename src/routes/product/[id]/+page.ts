

import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL, PUBLIC_VSPOT_BACKEND_LOCAL_URL } from '$env/static/public';
import { browser } from '$app/environment';

export async function load({ params, data, fetch, url }) {

    const backend_url = browser ? PUBLIC_VSPOT_BACKEND_GLOBAL_URL : PUBLIC_VSPOT_BACKEND_LOCAL_URL;

    const all_res = await fetch(`${backend_url}/v1/product/smoking/all?${url.searchParams.toString()}`);
    const all_res_json = await all_res.json();

    return {
        products: all_res_json["products"],
        filters: all_res_json["filters"],
        sort_options: ["new", "priceup", "pricedown"]
    };
}

