<script lang="ts">
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { l } from "$lib/langs";
    import Product from "./Product.svelte";

    export let products: V1ServerProductDisplayData[];
</script>

<div class="w-full h-max overflow-hidden z-0 relative">
    {#if products.length === 0}
        <div class="text-lg">{$l("description.noproducts")}</div>
    {:else}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {#each products as product}
                <Product {product} />
            {/each}
        </div>
    {/if}
</div>
