<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faCartArrowDown,
        faSpinner,
    } from "@fortawesome/free-solid-svg-icons";
    import { l } from "$lib/langs";
    import { cart_add_item } from "$lib/cart/cart";
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";

    export let product: V1ServerProductDisplayData;

    let adding_load = false;
</script>

<div class="w-full rounded-lg drop-shadow flex flex-col">
    <a href="/product/{product.internal_id}">
        <img
            src={product.image_url}
            alt="{product.name} image"
            class="rounded-t-xl"
        />
    </a>
    <div
        class="p-2 h-full space-y-1 flex flex-col justify-between text-lg rounded-b-lg"
    >
        <a class="mb-4" href="/product/{product.internal_id}">
            <div class="leading-tight text-md">
                {product.name}
            </div>
        </a>
        {#if product.stock > 0}
            <div class="!mt-auto !mb-2">
                <div class="flex items-center space-x-1">
                    <div class="w-[4px] h-[4px] rounded-full bg-vspot-green" />
                    <span class="text-sm text-vspot-green block">
                        {$l("description.instock")}
                    </span>
                </div>
                <span class="text-2xl font-semibold text-vspot-text-hovered">
                    {product.price}
                    <span
                        class="text-sm -ml-2 font-semibold text-vspot-text-hovered"
                        >.00</span
                    >
                    {product.currency}
                </span>
            </div>
            <button
                class="bg-vspot-green px-2 p-1 min-h-[32px] rounded-br-lg rounded-tl-lg w-full"
                disabled={adding_load}
                on:click={() => {
                    adding_load = true;
                    cart_add_item(product.internal_id, () => {
                        adding_load = false;
                    });
                }}
            >
                <span class="text-vspot-primary-bg mx-auto">
                    {#if !adding_load}
                        {$l("action.addtocart")}
                    {:else}
                        <Fa
                            color="#181a1b"
                            class="animate-spin"
                            icon={faSpinner}
                        />
                    {/if}
                </span>
            </button>
        {:else}
            <div class="!mt-auto !mb-2">
                <span class="text-2xl font-semibold text-vspot-text-hovered">
                    {product.price}
                    <span
                        class="text-sm -ml-2 font-semibold text-vspot-text-hovered"
                        >.00</span
                    >
                    {product.currency}
                </span>
            </div>
            <button
                class="bg-vspot-secondary-bg px-2 p-1 min-h-[32px] rounded-br-lg rounded-tl-lg w-full"
                disabled
                on:click={() => {
                    adding_load = true;
                    cart_add_item(product.internal_id, () => {
                        adding_load = false;
                    });
                }}
            >
                <span class="text-vspot-text-hovered max-auto block">
                    {$l("description.outofstock_simple")}
                </span>
            </button>
        {/if}
    </div>
</div>
