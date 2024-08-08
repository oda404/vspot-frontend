<script lang="ts">
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { l } from "$lib/langs";
    import Product from "$lib/products/Product.svelte";

    export let products: V1ServerProductDisplayData[];
    export let name: string | undefined = undefined;
    export let href: string | undefined = undefined;
</script>

<div>
    {#if name}
        <div class="flex items-center justify-between">
            <a {href} class="flex space-x-4 items-center">
                <slot />
                <span class="text-5xl font-semibold font-[Blowhole] block">
                    {name}
                </span>
            </a>
            {#if href}
                <a {href} class=""> {$l("action.see_all")} </a>
            {/if}
        </div>
    {/if}
    <div
        class="grid grid-cols-2 gap-2 lg:flex lg:[&>*:nth-child(6)]:hidden lg:gap-0 lg:space-x-2"
    >
        {#each products as product}
            <Product {product} />
        {/each}
    </div>
</div>
