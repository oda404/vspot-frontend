<script lang="ts">
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { l } from "$lib/langs";
    import Product from "$lib/products/Product.svelte";

    export let products: V1ServerProductDisplayData[];
    export let name: string | undefined = undefined;
    export let href: string | undefined = undefined;
</script>

<div class="space-y-4">
    {#if name}
        <div class="flex items-center justify-between space-x-4">
            <a {href} class="flex space-x-4 items-center w-full">
                <slot />
                <span class="text-2xl text-nowrap whitespace-nowrap">
                    {name}
                </span>
                <div class="h-[1px] w-full bg-vspot-secondary-bg" />
            </a>
            {#if href}
                <a {href} class="text-nowrap whitespace-nowrap">
                    {$l("action.see_all")}
                </a>
            {/if}
        </div>
    {/if}
    <div
        class="grid grid-cols-2 gap-2 lg:flex lg:gap-0 lg:space-x-2
        lg:[&>*:nth-child(5)]:flex
        lg:[&>*:nth-child(4)]:flex
        lg:[&>*:nth-child(3)]:flex
        [&>*:nth-child(5)]:hidden
        [&>*:nth-child(4)]:hidden
        [&>*:nth-child(3)]:hidden
        "
    >
        {#each products as product}
            <Product {product} />
        {/each}
    </div>
</div>
