

import { backendv1_get_product_fullinfo_with_recommendations } from '$lib/backendv1/product.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {

    let res = await backendv1_get_product_fullinfo_with_recommendations(params.id, fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    return {
        product: res.body.data!.product,
        recommended: res.body.data?.recommended
    }
}

