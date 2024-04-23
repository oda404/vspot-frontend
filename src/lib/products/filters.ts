
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
