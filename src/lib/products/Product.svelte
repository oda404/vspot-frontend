<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faCartArrowDown,
        faSpinner,
    } from "@fortawesome/free-solid-svg-icons";
    import { l } from "$lib/langs";
    import { cart_add_item } from "$lib/cart/cart";
    import type { Product } from "./types";

    export let product: Product;

    let adding_load = false;
</script>

<div class="w-full rounded-xl drop-shadow flex flex-col">
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
        <a href="/product/{product.internal_id}">
            <div class="leading-tight text-md">
                {product.name}
            </div>
        </a>
        {#if product.stock > 0}
            <div class="!mt-0 !mb-2">
                <div class="text-xl leading-tight">
                    {product.price}
                    {product.currency}
                </div>
                <div class="text-sm text-vspot-green leading-tight">
                    {$l("description.instock")}
                </div>
            </div>
            <button
                class="bg-vspot-green text-vspot-primary-bg px-2 p-1 rounded ml-auto flex items-center space-x-2 w-full"
                disabled={adding_load}
                on:click={() => {
                    adding_load = true;
                    cart_add_item(product.internal_id, () => {
                        adding_load = false;
                    });
                }}
            >
                <Fa
                    color="#181a1b"
                    class="{adding_load ? 'animate-spin' : ''} hidden lg:block"
                    size="xs"
                    icon={adding_load ? faSpinner : faCartArrowDown}
                />
                <div class="text-vspot-primary-bg">
                    {#if !adding_load}
                        {$l("action.addtocart")}
                    {:else}
                        ...
                    {/if}
                </div>
            </button>
        {:else}
            <div class="!mt-0 !mb-2">
                <span class="text-xl leading-tight">
                    {product.price}
                    {product.currency}
                </span>
                <span class="block text-sm leading-tight">
                    {$l("description.outofstock")}
                </span>
            </div>
            <button
                class="bg-vspot-secondary-bg px-2 p-1 rounded ml-auto flex items-center space-x-2 w-full"
                disabled
                on:click={() => {
                    adding_load = true;
                    cart_add_item(product.internal_id, () => {
                        adding_load = false;
                    });
                }}
            >
                <span class="text-vspot-text-hovered">
                    {$l("description.outofstock_simple")}
                </span>
            </button>
        {/if}
    </div>
</div>
