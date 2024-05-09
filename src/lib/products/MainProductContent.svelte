<script lang="ts">
    import { l } from "$lib/langs";
    import PageList from "$lib/nav/PageList.svelte";
    import FilterTab from "$lib/products/FilterTab.svelte";
    import ProductsTab from "$lib/products/ProductsTab.svelte";
    import SortTab from "$lib/products/SortTab.svelte";
    import { pagetitle_make } from "$lib/title";
    import {
        type Product,
        type ProductFilter,
        type ProductSortOption,
    } from "./types";

    export let product_title: string;
    export let products: Product[];
    export let filters: ProductFilter[];
    export let sort_options: ProductSortOption[];
    export let pages: number;
    export let current_page: number;
</script>

<svelte:head>
    <title>{pagetitle_make($l(`product.${product_title}`))}</title>
</svelte:head>

<div>
    <div class="flex justify-between">
        <div>
            <h1
                class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80"
            >
                {$l(`product.${product_title}`)}
            </h1>
            <div class="lg:my-4" />
            <span
                class="text-2xl font-semibold opacity-90 text-vspot-text-hovered"
            >
                {$l(`product.${product_title}.description`)}
            </span>
        </div>
        {#if pages > 1}
            <div class="mt-auto hidden lg:block">
                <PageList {pages} {current_page} />
            </div>
        {/if}
    </div>
    <div class="h-[4px] rounded-lg my-2 w-full" />
    <div class="flex flex-col lg:flex-row lg:space-x-4">
        <div
            class="w-fit lg:min-w-[23%] space-y-2 mb-2 divide-y divide-vspot-secondary-bg"
        >
            <SortTab options={sort_options} />
            <FilterTab {filters} />
        </div>
        <div class="flex flex-col items-center space-y-4">
            <ProductsTab {products} />
            <div class="rounded-lg bg-vspot-secondary-bg size-2" />
            <div class="p-4">
                <PageList {pages} {current_page} />
            </div>
        </div>
    </div>
</div>
