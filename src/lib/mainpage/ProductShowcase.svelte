<script lang="ts">
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { l } from "$lib/langs";
    import Product from "$lib/products/Product.svelte";

    export let products: V1ServerProductDisplayData[];
    export let name: string;
</script>

<div class="p-4 rounded-b-lg border-vspot-purple">
    <div class="flex items-center justify-between">
        <div class="flex space-x-2 items-center">
            <slot />
            <span class="text-2xl block"> {name} </span>
        </div>
        <a href="/new" class=""> {$l("action.see_all")} </a>
    </div>
    <div class="grid grid-cols-2 gap-4 lg:flex lg:gap-0 lg:space-x-4 pt-4">
        {#each products as product}
            <Product {product} />
        {/each}
    </div>
</div>
