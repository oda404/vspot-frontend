

import { backendv1_get_product_fullinfo } from '$lib/backendv1/product.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {

    let res = await backendv1_get_product_fullinfo(params.id, fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    return {
        product: res.body.data!
    }
}

