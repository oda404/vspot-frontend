<script lang="ts">
    import { l } from "$lib/langs";
    import MainProductContent from "$lib/products/MainProductContent.svelte";
    import { pagetitle_make } from "$lib/title";

    export let data;

    $: set_filters = data.set_filters;

    $: filters = data.filters.map((f) => {
        return {
            name: f.name,
            options: f.options.map((o) => {
                return {
                    name: o,
                    selected: !!set_filters
                        .find((sf) => sf.name === f.name)
                        ?.values.find((val) => val === o),
                };
            }),
        };
    });

    $: sort_options = data.sort_options.map((opt) => {
        return { value: opt, label: $l(`sort.${opt}`) };
    });

    $: products = data.products;

    $: pages = data.pages;
    $: current_page = data.current_page;

    $: product_types = data.product_types.join(".");
</script>

<svelte:head>
    <title>{pagetitle_make($l(`product.${product_types}`))}</title>
    <meta
        name="description"
        content={$l(`product.${product_types}.description`)}
    />
</svelte:head>

<MainProductContent
    product_title={product_types}
    {products}
    {filters}
    {sort_options}
    {pages}
    {current_page}
/>
