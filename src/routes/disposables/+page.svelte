<script lang="ts">
    import { l } from "$lib/langs";
    import PageList from "$lib/nav/PageList.svelte";
    import FilterTab from "$lib/products/FilterTab.svelte";
    import MainProductContent from "$lib/products/MainProductContent.svelte";
    import ProductsTab from "$lib/products/ProductsTab.svelte";
    import SortTab from "$lib/products/SortTab.svelte";
    import { pagetitle_make } from "$lib/title";

    export let data;

    $: filters = data.filters.map((f) => {
        return {
            title: f.title,
            options: f.options.map((o) => {
                return { name: o.name, matches: o.matches, selected: false };
            }),
        };
    });

    $: sort_options = data.sort_options.map((opt) => {
        return { value: opt, label: $l(`sort.${opt}`) };
    });

    $: products = data.products;

    $: pages = data.pages;
    $: current_page = data.current_page;
</script>

<svelte:head>
    <title>{pagetitle_make($l("product.disposables"))}</title>
</svelte:head>

<MainProductContent
    product_title="disposables"
    {products}
    {filters}
    {sort_options}
    {pages}
    {current_page}
/>
