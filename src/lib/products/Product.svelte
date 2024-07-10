<script lang="ts">
    import Fa from "svelte-fa";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { l } from "$lib/langs";
    import { cart_add_item } from "$lib/cart/cart";
    import type { V1ServerProductDisplayData } from "$lib/backendv1/product";
    import { price_discounted_val, price_format } from "$lib/price";

    export let product: V1ServerProductDisplayData;

    let adding_load = false;
</script>

<div class="w-full rounded-lg drop-shadow flex flex-col">
    <a href="/product/{product.pretty_internal_id}">
        <img
            src={product.image_url}
            alt="{product.name} image"
            class="rounded-t-xl"
        />
    </a>
    <div
        class="p-2 h-full space-y-1 flex flex-col justify-between text-lg rounded-b-lg"
    >
        <a class="mb-4" href="/product/{product.pretty_internal_id}">
            <div class="leading-tight text-md">
                {product.name}
            </div>
        </a>
        <div class="!mt-auto !mb-2">
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
            <span class="text-2xl font-semibold text-vspot-text-hovered">
                {price_format(
                    price_discounted_val(product.price, product.discount),
                )}
            </span>
            <span class="text-lg font-semibold">
                {product.currency}
            </span>
            {#if product.discount > 0}
                <span class="line-through">{price_format(product.price)}</span>
            {/if}
        </div>
        <button
            class="{product.stock > 0
                ? 'bg-vspot-green'
                : 'bg-vspot-secondary-bg'}  px-2 p-1 min-h-[32px] rounded-br-lg rounded-tl-lg w-full"
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
            <span
                class="{product.stock > 0
                    ? 'text-vspot-primary-bg'
                    : 'text-vspot-text-pimary'} mx-auto"
            >
                {#if product.stock > 0}
                    {#if !adding_load}
                        {$l("action.addtocart")}
                    {:else}
                        <Fa
                            color="#181a1b"
                            class="animate-spin"
                            icon={faSpinner}
                        />
                    {/if}
                {:else}
                    {$l("description.outofstock_simple")}
                {/if}
            </span>
        </button>
    </div>
</div>
