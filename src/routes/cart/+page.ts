
import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL, PUBLIC_VSPOT_BACKEND_LOCAL_URL } from '$env/static/public';
import { browser } from '$app/environment';

/* No point in running this on the server, because we need access to the local storage */
export const ssr = false;

export async function load({ data, fetch, url }) {

    const url_params = new URLSearchParams();
    if (localStorage.cart) {
        const cart_items = JSON.parse(localStorage.cart).items;
        if (cart_items)
            url_params.set("exclude", cart_items.map((i: any) => { return i.id }).join("+"));
    }

    const backend_url = browser ? PUBLIC_VSPOT_BACKEND_GLOBAL_URL : PUBLIC_VSPOT_BACKEND_LOCAL_URL;
    const res = await fetch(`${backend_url}/v1/product/random?${url_params.toString()}`);
    const res_json = await res.json();

    return {
        product: res_json["product"]
    };
}
