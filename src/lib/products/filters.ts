import type { V1ServerCategoryFilter } from "$lib/backendv1/product";

export type ProductSetFilter = {
    name: string;
    values: string[]
};

export function product_filters_from_searchquery(query: URLSearchParams) {
    const exclude_params = ["page", "sort"];

    let set_filters: ProductSetFilter[] = [];
    query.forEach((v, k) => {
        if (exclude_params.includes(k))
            return;

        set_filters.push({ name: k, values: v.split("+") });
    });

    return set_filters;
}

export function product_filters_omit(name: string, filters: V1ServerCategoryFilter[]) {
    return filters.filter(f => f.name !== name);
}
