<script lang="ts">
    import {
        cart_add_item,
        cart_delete_item,
        cart_remove_one_item,
    } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import { price_format } from "$lib/price";
    import {
        faMinus,
        faPlus,
        faTrashCan,
    } from "@fortawesome/free-solid-svg-icons";
    import Decimal from "decimal.js";
    import Fa from "svelte-fa";
    import type { ProductHorizontalData } from "./types";

    /* price_on_qty and show_qty_control assume that product is a CartProduct :P */
    export let product: ProductHorizontalData;
    export let show_discount: boolean;

    export let qty: number | undefined = undefined;
    export let show_qty: boolean = false;
    export let show_qty_control: boolean = false;
    export let stock: number | undefined = undefined;
    export let show_stock_status: boolean = false;

    if ((show_qty || show_qty_control) && !qty)
        console.error(
            "ProductHorizontalDisplay: tried to render qty related stuff but no qty was provided!",
        );

    if (show_qty_control && (!qty || !stock)) {
        console.error(
            "ProductHorizontalDisplay: tried to render qty control but no qty or stock was provided!",
        );
    }

    export let large: boolean = false;
    export let force_delete_button = false;
    export let price_on_qty = false;
    export let show_add_to_cart_button = false;
</script>

<div class="flex space-x-4">
    <a
        href="/product/{product.pretty_internal_id}"
        class={large
            ? show_add_to_cart_button
                ? "w-[140px]"
                : " w-[100px]"
            : "w-[80px]"}
    >
        <picture>
            <source
                media="(min-width: 1024px)"
                srcset="/live-images-mini/{product.image_url}.webp"
            />
            <source
                media="(max-width: 1024px)"
                srcset="/live-images/{product.image_url}.webp"
            />
            <img
                src="/live-images/{product.image_url}.webp"
                alt={product.name}
                class="object-contain"
            />
        </picture>
    </a>
    <div class="flex flex-col text-start w-full">
        <a
            href="/product/{product.pretty_internal_id}"
            class="block {large ? 'text-lg' : ''}"
        >
            <b>
                {show_qty ? `${qty}x` : ""}
            </b>
            {product.name}
        </a>
        <div class="flex justify-between w-full mt-auto">
            <div>
                {#if show_discount && product.discount}
                    <span class="block line-through {large ? 'text-lg' : ''}">
                        {price_format(
                            new Decimal(product.price)
                                .mul(price_on_qty ? qty || 1 : 1)
                                .toNumber(),
                        )} RON
                    </span>
                {/if}
                <div class="flex items-center space-x-4">
                    <span
                        class="block font-semibold {large
                            ? 'text-xl'
                            : 'text-lg'}"
                    >
                        {price_format(
                            new Decimal(product.price)
                                .minus(product.discount)
                                .mul(price_on_qty ? qty || 1 : 1)
                                .toNumber(),
                        )}
                        {product.currency}
                    </span>
                    {#if show_stock_status}
                        {#if !stock}
                            <div class="flex items-center space-x-1">
                                <div
                                    class="size-1.5 rounded-full bg-vspot-secondary-bg"
                                />
                                <span class="text-vspot-text-hovered"
                                    >Stoc epuizat</span
                                >
                            </div>
                        {:else}
                            <div class="flex items-center space-x-1">
                                <div
                                    class="size-1.5 rounded-full bg-vspot-green"
                                />
                                <span class="text-vspot-green">In stoc</span>
                            </div>
                        {/if}
                    {/if}
                </div>
                {#if show_add_to_cart_button}
                    <button
                        class="p-1 px-2 bg-vspot-green text-vspot-secondary-bg"
                        on:click={() => {
                            cart_add_item(
                                product.internal_id,
                                product.pretty_internal_id,
                                () => {},
                                false,
                            );
                        }}
                    >
                        {$l("action.addtocart")}
                    </button>
                {/if}
            </div>
            {#if show_qty_control}
                <div class="flex items-center space-x-2">
                    {#if force_delete_button}
                        <button
                            class="flex items-center space-x-2 mx-4"
                            on:click={() => {
                                cart_delete_item(product.internal_id);
                            }}
                        >
                            <Fa color="red" icon={faTrashCan} />
                            <div class="text-vspot-text-hovered">
                                {$l("action.delete")}
                            </div>
                        </button>
                    {/if}
                    <button
                        disabled={force_delete_button && qty === 1}
                        on:click={() =>
                            cart_remove_one_item(product.internal_id)}
                    >
                        <Fa
                            color={force_delete_button && qty === 1
                                ? "#999999"
                                : "#FFFFFF"}
                            icon={faMinus}
                            size="sm"
                        />
                    </button>
                    <span class="px-4 bg-vspot-secondary-bg rounded">
                        {qty}
                    </span>
                    <button
                        on:click={() => {
                            cart_add_item(
                                product.internal_id,
                                product.pretty_internal_id,
                                undefined,
                                false,
                            );
                        }}
                        disabled={(qty || 0) >= (stock || 0)}
                    >
                        <Fa
                            icon={faPlus}
                            color={(qty || 0) < (stock || 0)
                                ? "#FFFFFF"
                                : "#999999"}
                            size="sm"
                        />
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>
