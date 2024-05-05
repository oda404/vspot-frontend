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

<div class="w-full bg-vspot-primary-bg rounded-xl drop-shadow flex flex-col">
    <a href="/product/{product.internal_id}">
        <img
            src={product.image_url}
            alt="{product.name} image"
            class="rounded-t-xl"
        />
    </a>
    <div
        class=" bg-vspot-secondary-bg p-2 h-full space-y-1 flex flex-col justify-between text-lg rounded-b-lg"
    >
        <a href="/product/{product.internal_id}">
            <div class="leading-tight text-lg">
                {product.name}
            </div>
        </a>
        {#if product.stock > 0}
            <div class="!mt-0">
                <div class="text-xl text-vspot-text-hovered leading-tight">
                    {product.price}
                    {product.currency}
                </div>
                <div class="text-sm text-vspot-green leading-tight">
                    {$l("description.stock", { n: product.stock })}
                </div>
            </div>
            <button
                class="bg-vspot-green text-vspot-primary-bg p-2 rounded-md ml-auto flex items-center space-x-2 w-full"
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
                    class={adding_load ? "animate-spin" : ""}
                    icon={adding_load ? faSpinner : faCartArrowDown}
                />
                {#if !adding_load}
                    <div class="text-vspot-primary-bg">
                        {$l("action.addtocart")}
                    </div>
                {/if}
            </button>
        {:else}
            <div class="py-1 text-vspot-text-hovered">
                {$l("description.outofstock")}
            </div>
        {/if}
    </div>
</div>
