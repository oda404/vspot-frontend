
import { get } from 'svelte/store';
import { cart_store } from '$lib/cart/cart.js';
import { backendv1_get_random_product } from '$lib/backendv1/product.js';
import { error } from '@sveltejs/kit';

/* No point in running this on the server, because we need access to the local storage */
export const ssr = false;

export async function load({ fetch }) {

    let ids: string[] = [];
    if (localStorage.cart) {
        const cart_items = get(cart_store).items;
        if (cart_items)
            ids = cart_items.map(product => { return product.internal_id });
    }

    const res = await backendv1_get_random_product(ids, fetch);
    if (res.status >= 400)
        error(res.status, { message: res.body.msg });

    return {
        product: res.body.data
    };
}
