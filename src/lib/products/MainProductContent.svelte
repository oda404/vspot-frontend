<script lang="ts">
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { l } from "$lib/langs";
    import PageList from "$lib/nav/PageList.svelte";
    import FilterTab from "$lib/products/FilterTab.svelte";
    import ProductsTab from "$lib/products/ProductsTab.svelte";
    import SortTab from "$lib/products/SortTab.svelte";
    import Fa from "svelte-fa";
    import FilterTabMobile from "./FilterTabMobile.svelte";
    import { type ProductFilter, type ProductSortOption } from "./types";
    import { faFilter } from "@fortawesome/free-solid-svg-icons";

    export let product_title: string;
    export let products: V1ServerProductDisplayData[];
    export let filters: ProductFilter[];
    export let sort_options: ProductSortOption[];
    export let pages: number;
    export let current_page: number;

    let mobile_filter_tab_open = false;

    $: selected_subtype = filters
        .find((filter) => filter.name === "subtype")
        ?.options.find((option) => option.selected)?.name;

    $: selected_brand = filters
        .find((filter) => filter.name === "brand")
        ?.options.find((option) => option.selected)?.name;

    $: title = selected_subtype
        ? selected_subtype
        : selected_brand
          ? selected_brand
          : product_title;
</script>

<div class="flex flex-col lg:flex-row lg:space-x-4">
    <div
        class="w-fit lg:min-w-[15%] space-y-2 mb-2 divide-y divide-vspot-secondary-bg hidden lg:block"
    >
        <FilterTab {filters} />
    </div>
    {#if mobile_filter_tab_open}
        <FilterTabMobile
            {filters}
            on_close_cb={() => (mobile_filter_tab_open = false)}
        />
    {/if}
    <section class="flex flex-col items-center space-y-4">
        <h1 class="text-5xl block w-full">
            {$l(`product.${title}`)}
        </h1>
        <h2 class="text-xl text-vspot-text-hovered block w-full !mt-2">
            {$l(`product.${title}.description`)}
        </h2>
        <div
            class="flex items-center z-[5] space-x-4 lg:space-x-0 mr-auto w-full"
        >
            <button
                class="lg:hidden flex items-center space-x-2 pb-2 rounded-none border-b border-vspot-secondary-bg w-full justify-center"
                on:click={() =>
                    (mobile_filter_tab_open = !mobile_filter_tab_open)}
            >
                <Fa icon={faFilter} />
                <span class="text-lg">Filtre</span>
            </button>
            <SortTab options={sort_options} />
        </div>
        <ProductsTab {products} />
        {#if pages > 0}
            <div class="p-4">
                <PageList {pages} {current_page} />
            </div>
        {/if}
    </section>
</div>
