<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faCartShopping,
        faSpinner,
    } from "@fortawesome/free-solid-svg-icons";
    import { l } from "$lib/langs";
    import { cart_add_item } from "$lib/cart/cart";
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { price_discounted_val, price_format } from "$lib/price";
    import { product_price_get_percdiff } from "./price";
    import Decimal from "decimal.js";

    export let product: V1ServerProductDisplayData;

    let adding_load = false;
</script>

<div class="w-full relative rounded-lg flex flex-col">
    <a class="hover:filter-none" href="/product/{product.pretty_internal_id}">
        <img
            src={product.image_url}
            alt="{product.name} image"
            class="rounded-t-xl"
        />
    </a>
    {#if product.discount > 0}
        <div
            class="absolute right-0 w-fit px-4 py-1 rounded-l-lg bg-vspot-secondary-bg"
        >
            -{product_price_get_percdiff(
                product.price,
                new Decimal(product.price).sub(product.discount).toNumber(),
            )}%
        </div>
    {/if}
    <div class="p-2 h-full flex flex-col justify-between">
        <a
            class="mb-2 leading-tight text-md"
            href="/product/{product.pretty_internal_id}"
        >
            {product.name}
        </a>
        <div class="!mt-auto space-y-1 !mb-2">
            {#if product.stock > 1}
                <div class="flex items-center space-x-1">
                    <div class="w-[4px] h-[4px] rounded-full bg-vspot-green" />
                    <span class="text-sm text-vspot-green block">
                        {$l("description.instock")}
                    </span>
                </div>
            {:else if product.stock === 1}
                <div class="flex items-center space-x-1">
                    <div class="w-[4px] h-[4px] rounded-full bg-vspot-warn" />
                    <span class="text-sm text-vspot-warn block">
                        {$l("description.lastinstock")}
                    </span>
                </div>
            {/if}
            <span class="text-xl leading-tight">
                {price_format(
                    price_discounted_val(product.price, product.discount),
                )} RON
            </span>
            {#if product.discount > 0}
                <span class="line-through text-vspot-text-hovered leading-tight"
                    >{price_format(product.price)} RON</span
                >
            {/if}
        </div>
        <button
            class="{product.stock > 0
                ? 'bg-vspot-green'
                : 'bg-vspot-secondary-bg'} px-2 p-1 min-h-[32px] rounded-br-lg rounded-tl-lg w-full"
            disabled={adding_load || product.stock === 0}
            on:click={() => {
                adding_load = true;
                cart_add_item(
                    product.internal_id,
                    product.pretty_internal_id,
                    () => {
                        adding_load = false;
                    },
                );
            }}
        >
            {#if product.stock > 0}
                {#if !adding_load}
                    <div class="flex items-center">
                        <Fa color="#181a1b" icon={faCartShopping} />
                        <span class="text-vspot-primary-bg !mx-auto block"
                            >{$l("action.addtocart")}</span
                        >
                    </div>
                {:else}
                    <Fa color="#181a1b" class="animate-spin" icon={faSpinner} />
                {/if}
            {:else}
                <span class="text-vspot-text-pimary"
                    >{$l("description.outofstock_simple")}</span
                >
            {/if}
        </button>
    </div>
</div>
