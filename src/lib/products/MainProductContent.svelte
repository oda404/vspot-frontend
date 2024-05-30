<script lang="ts">
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { l } from "$lib/langs";
    import PageList from "$lib/nav/PageList.svelte";
    import FilterTab from "$lib/products/FilterTab.svelte";
    import ProductsTab from "$lib/products/ProductsTab.svelte";
    import SortTab from "$lib/products/SortTab.svelte";
    import { pagetitle_make } from "$lib/title";
    import { type ProductFilter, type ProductSortOption } from "./types";

    export let product_title: string;
    export let products: V1ServerProductDisplayData[];
    export let filters: ProductFilter[];
    export let sort_options: ProductSortOption[];
    export let pages: number;
    export let current_page: number;
</script>

<svelte:head>
    <title>{pagetitle_make($l(`product.${product_title}`))}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row lg:space-x-4">
    <div
        class="w-fit lg:min-w-[15%] space-y-2 mb-2 divide-y divide-vspot-secondary-bg hidden lg:block"
    >
        <FilterTab {filters} />
    </div>
    <div class="flex flex-col items-center space-y-8">
        <div class="w-full">
            <div>
                <h1
                    class="text-7xl lg:text-9xl font-[Blowhole] font-semibold opacity-80"
                >
                    {$l(`product.${product_title}`)}
                </h1>
                <span
                    class="text-2xl font-semibold opacity-90 text-vspot-text-hovered"
                >
                    {$l(`product.${product_title}.description`)}
                </span>
            </div>
        </div>
        <div class="mr-auto">
            <SortTab options={sort_options} />
        </div>
        <ProductsTab {products} />
        {#if pages > 0}
            <div class="p-4">
                <PageList {pages} {current_page} />
            </div>
        {/if}
    </div>
</div>
