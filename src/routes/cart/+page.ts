
import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL, PUBLIC_VSPOT_BACKEND_LOCAL_URL } from '$env/static/public';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { cart_store } from '$lib/cart/cart.js';

/* No point in running this on the server, because we need access to the local storage */
export const ssr = false;

export async function load({ data, fetch, url }) {

    const url_params = new URLSearchParams();
    if (localStorage.cart) {
        const cart_items = get(cart_store).items;
        if (cart_items)
            url_params.set("exclude", cart_items.map(product => { return product.internal_id }).join("+"));
    }

    const backend_url = browser ? PUBLIC_VSPOT_BACKEND_GLOBAL_URL : PUBLIC_VSPOT_BACKEND_LOCAL_URL;
    const res = await fetch(`${backend_url}/v1/product/random?${url_params.toString()}`);
    const res_json = await res.json();

    return {
        product: res_json["product"]
    };
}
