
import { backendv1_get_products_all } from '$lib/backendv1/product';
import { product_filters_from_searchquery } from '$lib/products/filters.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, url, params }) {

    const url_params = new URLSearchParams(url.searchParams.toString());
    url_params.set("subtypes", params.product_type2);

    let res = await backendv1_get_products_all(params.product_type, url_params.toString(), fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    if (res.body.data?.products.length === 0)
        error(404);

    const pages = res.body.data!.pages;

    let current_page = Number(url.searchParams.get("page"));
    if (Number.isNaN(current_page) || current_page <= 0 || current_page > pages)
        current_page = 1;

    return {
        product_types: [params.product_type, params.product_type2],
        products: res.body.data!.products,
        filters: res.body.data!.filters,
        pages: pages,
        current_page: current_page,
        sort_options: ["new", "priceup", "pricedown"],
        set_filters: product_filters_from_searchquery(url.searchParams)
    };
}
