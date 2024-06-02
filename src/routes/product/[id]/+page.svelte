<script lang="ts">
    import { cart_add_item } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import Product from "$lib/products/Product.svelte";
    import ProductTrailBar from "$lib/products/ProductTrailBar.svelte";
    import { product_price_get_percdiff } from "$lib/products/price.js";
    import { pagetitle_make } from "$lib/title";
    import { faDollar } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import SvelteMarkdown from "svelte-markdown";

    export let data;

    let recommended = data.recommended;

    const tags =
        data.product.tags.find((t) => t.name === "type")?.options || [];

    const price_full = data.product.price;
    const price_actual = price_full - data.product.discount;

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
            <div class="space-y-1">
                <div class="space-y-2">
                    {#if data.product.discount > 0}
                        <div class="flex items-center space-x-2">
                            <span
                                class="line-through text-2xl text-vspot-text-hovered"
                            >
                                {data.product.price}.00
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
                        class="text-4xl block font-semibold text-vspot-text-hovered"
                    >
                        {data.product.price - data.product.discount}
                        <span class="text-2xl font-semibold -ml-3">.00</span>
                        {data.product.currency}
                    </span>
                </div>
                <div class="flex items-center space-x-2">
                    {#if data.product.stock}
                        <div
                            class="w-[6px] h-[6px] rounded-full bg-vspot-green"
                        />
                    {/if}
                    <span
                        class={data.product.stock > 0 ? "text-vspot-green" : ""}
                    >
                        {data.product.stock
                            ? $l("description.instock")
                            : $l("description.outofstock")}
                    </span>
                </div>
                {#if price_actual !== price_full}
                    <div class="flex items-center space-x-2">
                        <Fa icon={faDollar} />
                        <span>Acest pret este valabil exclusiv online</span>
                    </div>
                {/if}
                <button
                    disabled={data.product.stock === 0}
                    class="px-16 w-fit p-2 !mt-4 bg-vspot-green text-vspot-primary-bg disabled:bg-vspot-secondary-bg disabled:text-vspot-text-hovered"
                    on:click={() => {
                        cart_add_item(data.product.internal_id);
                    }}
                >
                    {#if data.product.stock === 0}
                        {$l("description.outofstock_simple")}
                    {:else}
                        {$l("action.addtocart")}
                    {/if}
                </button>
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
            <span class="text-2xl">Recomandate pentru tine</span>
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
