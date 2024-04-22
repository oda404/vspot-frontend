<script lang="ts">
    import Product from "./Product.svelte";
    import { type Product as ProductType } from "./types";

    export let products: ProductType[];
</script>

<div class="w-full h-max overflow-hidden z-0 relative">
    {#if products.length === 0}
        <div class="text-4xl">Penis caca part</div>
    {:else}
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {#each products as product}
                <Product {product} />
            {/each}
        </div>
    {/if}
</div>
