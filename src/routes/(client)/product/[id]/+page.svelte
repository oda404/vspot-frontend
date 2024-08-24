<script lang="ts">
    import type { V1ServerProductSpec } from "$lib/backendv1/product.js";
    import { cart_add_item, cart_store } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import { price_discounted_val, price_format } from "$lib/price.js";
    import Product from "$lib/products/Product.svelte";
    import ProductSpecsTable from "$lib/products/ProductSpecsTable.svelte";
    import ProductTrailBar from "$lib/products/ProductTrailBar.svelte";
    import { product_price_get_percdiff } from "$lib/products/price.js";
    import { shipping_estimation_get_date_from_now } from "$lib/shipping/estimation";
    import { pagetitle_make } from "$lib/title";
    import {
        faMinus,
        faPlus,
        faShoppingCart,
        faTruck,
    } from "@fortawesome/free-solid-svg-icons";
    import Decimal from "decimal.js";
    import { onDestroy } from "svelte";
    import Fa from "svelte-fa";
    import { get } from "svelte/store";

    export let data;

    let recommended = data.recommended;

    const tags =
        data.product.tags.find((t) => t.name === "type")?.options || [];

    const price_full = data.product.price;
    const price_actual = new Decimal(price_full)
        .sub(data.product.discount)
        .toNumber();

    $: specs = structuredClone(data.product.specs);

    let package_contents: V1ServerProductSpec | undefined;
    $: {
        const package_contents_spec_idx = specs.findIndex(
            (spec) => spec.name === "package_contents",
        );

        if (package_contents_spec_idx !== -1) {
            package_contents = specs.splice(
                package_contents_spec_idx,
                package_contents_spec_idx + 1,
            )[0];
        } else {
            package_contents = undefined;
        }
    }

    let usage: V1ServerProductSpec | undefined;
    $: {
        const usage_spec_idx = specs.findIndex((spec) => spec.name === "usage");

        if (usage_spec_idx !== -1) {
            usage = specs.splice(usage_spec_idx, usage_spec_idx + 1)[0];
        } else {
            usage = undefined;
        }
    }

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

    const get_package_contents_from_spec = (spec_values: string[]) => {
        let contents: { name: string; value: string[] }[] = [];
        spec_values.forEach((specval) => {
            const qty_str = specval.substring(0, specval.indexOf("x") + 1);
            const name = specval.substring(qty_str.length + 1);
            contents.push({ name: qty_str, value: [name] });
        });
        return contents;
    };

    let image_bubbles = Array.from({ length: 1 }, (_, index) => index + 1);
</script>

<svelte:head>
    <title>{pagetitle_make(data.product.name)}</title>
</svelte:head>

<div class="space-y-4">
    <ProductTrailBar {tags} product_name={data.product.name} />
    <div
        class="fixed lg:hidden z-10 w-full h-fit bg-vspot-secondary-bg bottom-0 left-0 p-2 border-t border-vspot-green"
    >
        <button
            class="bg-vspot-green p-2 px-4 w-full flex items-center justify-center space-x-2"
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
            <Fa color="#181a1b" icon={faShoppingCart} />
            <span class="text-vspot-primary-bg"> Adauga in cos </span>
        </button>
    </div>
    <section class="space-y-4">
        <h1 class="text-3xl font-bold">
            {data.product.name}
        </h1>
        <div class="flex flex-col lg:flex-row lg:space-x-12">
            <div class="space-y-4">
                <img
                    class="rounded-lg lg:min-w-[500px] lg:max-w-[500px]"
                    src={data.product.image_url}
                    alt="{data.product.name} image"
                />
                <div class="flex space-x-2 items-center justify-center">
                    {#each image_bubbles as bubble}
                        <div
                            class="size-2 rounded-full bg-vspot-secondary-bg"
                        />
                    {/each}
                </div>
            </div>
            <div class="space-y-1 w-full mt-4 lg:mt-0">
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
                <span class="text-3xl block font-semibold">
                    {price_format(
                        price_discounted_val(
                            data.product.price,
                            data.product.discount,
                        ),
                    )} RON
                </span>
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
                                    icon={faMinus}
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
                                    icon={faPlus}
                                />
                            </button>
                        </div>
                    {/if}
                    <button
                        disabled={data.product.stock === 0}
                        class="text-lg whitespace-nowrap px-16 w-full p-2 bg-vspot-green text-vspot-primary-bg disabled:bg-vspot-secondary-bg disabled:text-vspot-text-hovered"
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
                <div class="flex space-x-2 items-center !mt-4">
                    <span class="font-bold">18+</span>
                    <span
                        >Acest produs este interzis persoanelor sub 18 ani</span
                    >
                </div>
                {#if usage}
                    <section
                        class="border-t border-vspot-secondary-bg pt-4 !mt-4 pb-4"
                    >
                        <h1 class="text-base font-bold">
                            Instructiuni utilizare
                        </h1>
                        {#each usage.value as usage_line}
                            <span class="block text-vspot-text-hovered">
                                {usage_line}
                            </span>
                        {/each}
                    </section>
                {/if}
                {#if specs.length}
                    <ProductSpecsTable
                        localization_prefix="specval"
                        title="Specificatii"
                        {specs}
                    />
                {/if}
                {#if package_contents}
                    <ProductSpecsTable
                        localization_prefix="package_content"
                        title="Continut pachet"
                        specs={get_package_contents_from_spec(
                            package_contents.value,
                        )}
                    />
                {/if}
            </div>
        </div>
    </section>
    {#if recommended}
        <div class="space-y-4">
            <div class="flex items-center space-x-2">
                <span class="text-xl">Recomandate</span>
                <div class="w-full h-[1px] bg-vspot-secondary-bg" />
            </div>
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
