<script lang="ts">
    import { cart_add_item, cart_store } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import { price_discounted_val, price_format } from "$lib/price.js";
    import Product from "$lib/products/Product.svelte";
    import ProductTrailBar from "$lib/products/ProductTrailBar.svelte";
    import { product_price_get_percdiff } from "$lib/products/price.js";
    import { shipping_estimation_get_date_from_now } from "$lib/shipping/estimation";
    import { pagetitle_make } from "$lib/title";
    import {
        faChevronLeft,
        faChevronRight,
        faDollar,
        faTruck,
    } from "@fortawesome/free-solid-svg-icons";
    import { onDestroy } from "svelte";
    import Fa from "svelte-fa";
    import SvelteMarkdown from "svelte-markdown";
    import { get } from "svelte/store";

    export let data;

    let recommended = data.recommended;

    const tags =
        data.product.tags.find((t) => t.name === "type")?.options || [];

    const price_full = data.product.price;
    const price_actual = price_full - data.product.discount;

    let qty = 1;
    $: {
        const cart_product = get(cart_store).items.find(
            (prod) => prod.internal_id === data.product.internal_id,
        );

        const max_qty = data.product.stock - (cart_product?.qty || 0);

        if (qty < 0) qty = 1;
        else if (qty > max_qty) qty = max_qty;
    }

    /* Make qty 1 if qty is 0 and the user remove stuff from their cart */
    onDestroy(
        cart_store.subscribe(($cart_store) => {
            const cart_qty =
                $cart_store.items.find(
                    (prod) => prod.internal_id === data.product.internal_id,
                )?.qty || 0;

            if (cart_qty < data.product.stock && qty === 0) qty = 1;
        }),
    );

    type Tab = "description" | "specs";
    let selected_tab: Tab = "description";
</script>

<svelte:head>
    <title>{pagetitle_make(data.product.name)}</title>
</svelte:head>

<div class="space-y-4">
    <ProductTrailBar {tags} product_name={data.product.name} />
    <div class="space-y-8">
        <span class="text-3xl opacity-90 font-bold">
            {data.product.name}
        </span>
        <div class="flex flex-col lg:flex-row lg:space-x-16">
            <img
                class="rounded-lg lg:min-w-[500px] lg:max-w-[500px]"
                src={data.product.image_url}
                alt="{data.product.name} image"
            />
            <div class="space-y-1 w-full mt-4 lg:mt-0">
                <div class="space-y-2">
                    {#if data.product.discount > 0}
                        <div class="flex items-center space-x-2">
                            <span
                                class="line-through text-xl text-vspot-text-hovered"
                            >
                                {price_format(data.product.price)} RON
                            </span>
                            <span
                                class="px-2 p-[0.1rem] rounded-tl-lg rounded-br-lg bg-vspot-secondary-bg text-lg"
                            >
                                -{product_price_get_percdiff(
                                    price_full,
                                    price_actual,
                                )}%
                            </span>
                        </div>
                    {/if}
                    <span
                        class="text-3xl block font-semibold text-vspot-text-hovered"
                    >
                        {price_format(
                            price_discounted_val(
                                data.product.price,
                                data.product.discount,
                            ),
                        )} RON
                    </span>
                </div>
                {#if price_actual !== price_full}
                    <div class="flex items-center space-x-2">
                        <Fa icon={faDollar} />
                        <span>{$l("price.only_online")}</span>
                    </div>
                {/if}
                <div class="h-[1px] w-full bg-vspot-secondary-bg !my-4" />
                {#if data.product.stock > 1}
                    <div class="flex items-center space-x-2">
                        <div
                            class="w-[6px] h-[6px] rounded-full bg-vspot-green"
                        />
                        <span
                            class={data.product.stock > 0
                                ? "text-vspot-green"
                                : ""}
                        >
                            {$l("description.instock")}
                        </span>
                    </div>
                {:else if data.product.stock === 1}
                    <div class="flex items-center space-x-2">
                        <div
                            class="w-[6px] h-[6px] rounded-full bg-vspot-warn"
                        />
                        <span
                            class={data.product.stock > 0
                                ? "text-vspot-warn"
                                : ""}
                        >
                            {$l("description.lastinstock")}
                        </span>
                    </div>
                {/if}
                <div class="flex items-center space-x-2 !mt-4">
                    {#if data.product.stock}
                        <div class="flex items-center">
                            <button
                                class="h-[calc(50%)] p-1 px-4 rounded-none"
                                disabled={qty <= 1}
                                on:click={() => {
                                    --qty;
                                }}
                            >
                                <Fa
                                    color={qty <= 1 ? "#cccccc" : ""}
                                    icon={faChevronLeft}
                                />
                            </button>
                            <input
                                class="border text-center border-vspot-secondary-bg text-lg size-12 bg-vspot-primary-bg focus:outline-none"
                                on:blur={() => {
                                    if (qty <= 0) qty = 1;
                                }}
                                bind:value={qty}
                            />
                            <button
                                class="h-[calc(50%)] p-1 px-4 rounded-none"
                                disabled={qty >= data.product.stock}
                                on:click={() => {
                                    ++qty;
                                }}
                            >
                                <Fa
                                    color={qty >= data.product.stock
                                        ? "#cccccc"
                                        : ""}
                                    icon={faChevronRight}
                                />
                            </button>
                        </div>
                    {/if}
                    <button
                        disabled={data.product.stock === 0}
                        class="text-lg px-16 w-full p-2 bg-vspot-green text-vspot-primary-bg disabled:bg-vspot-secondary-bg disabled:text-vspot-text-hovered"
                        on:click={() => {
                            cart_add_item(
                                data.product.internal_id,
                                data.product.pretty_internal_id,
                                undefined,
                                true,
                                Number(qty),
                            );
                        }}
                    >
                        {#if data.product.stock === 0}
                            {$l("description.outofstock_simple")}
                        {:else}
                            {$l("action.addtocart")}
                        {/if}
                    </button>
                </div>
                {#if data.product.stock}
                    <div class="flex space-x-2 items-center !mt-8">
                        <Fa icon={faTruck} />
                        <span>{shipping_estimation_get_date_from_now()}</span>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    {#if data.product.description_long}
        <div class="block space-y-4">
            <button
                class="{selected_tab === 'description'
                    ? 'bg-vspot-secondary-bg'
                    : ''} w-fit px-4 p-2 !rounded-b-none !rounded-t-lg"
                disabled={selected_tab === "description"}
                on:click={() => (selected_tab = "description")}
            >
                {$l("description.description")}
            </button>
            <button
                class="{selected_tab === 'specs'
                    ? 'bg-vspot-secondary-bg'
                    : ''} w-fit px-4 p-2 !rounded-b-none !rounded-t-lg"
                disabled={selected_tab === "specs"}
                on:click={() => (selected_tab = "specs")}
            >
                {$l("description.specs")}
            </button>
            <div class="h-[1px] !-mt-0 w-full bg-vspot-secondary-bg" />
            {#if selected_tab === "description"}
                <SvelteMarkdown source={data.product.description_long} />
            {:else if selected_tab === "specs"}
                <SvelteMarkdown source={data.product.description_short} />
            {/if}
        </div>
    {/if}
    {#if recommended}
        <div class="space-y-4 border-t border-vspot-secondary-bg py-8">
            <span class="text-2xl">{$l("product.recommended_for_you")}</span>
            <div
                class="flex space-x-4
                [&>*:nth-child(6)]:hidden
                [&>*:nth-child(5)]:hidden lg:[&>*:nth-child(5)]:flex
                [&>*:nth-child(4)]:hidden lg:[&>*:nth-child(4)]:flex
                [&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:flex"
            >
                {#each recommended as rec}
                    <Product product={rec} />
                {/each}
            </div>
        </div>
    {/if}
</div>
