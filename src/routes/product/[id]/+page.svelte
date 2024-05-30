<script lang="ts">
    import { cart_add_item } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import Product from "$lib/products/Product.svelte";
    import ProductTrailBar from "$lib/products/ProductTrailBar.svelte";
    import { pagetitle_make } from "$lib/title";
    import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import SvelteMarkdown from "svelte-markdown";

    export let data;

    let recommended = data.recommended;

    const tags =
        data.product.tags.find((t) => t.name === "type")?.options || [];

    let add_qty = 1;
</script>

<svelte:head>
    <title>{pagetitle_make(data.product.name)}</title>
</svelte:head>

<div class="space-y-4">
    <ProductTrailBar {tags} product_name={data.product.name} />
    <div class="lg:flex space-y-4 lg:space-y-0 lg:space-x-8 lg:max-h-[400px]">
        <div class="lg:min-w-[400px] lg:max-w-[400px]">
            <img
                class="rounded-lg drop-shadow-2xl"
                src={data.product.image_url}
                alt="{data.product.name} image"
            />
        </div>
        <div class="flex flex-col">
            <span class="text-3xl opacity-90 font-bold">
                {data.product.name}
            </span>
            <span class="text-2xl"
                >{data.product.price}
                {data.product.currency}
            </span>
            <span class={data.product.stock > 0 ? "text-vspot-green" : ""}>
                {data.product.stock
                    ? $l("description.instock")
                    : $l("description.outofstock")}
            </span>
            {#if data.product.description_short}
                <div
                    class="overflow-y-scroll h-full mt-4 p-4 border-vspot-secondary-bg border-t border-b w-full"
                >
                    <SvelteMarkdown source={data.product.description_short} />
                </div>
            {/if}
            <div
                class="flex {data.product.description_short
                    ? 'mt-4'
                    : 'mt-auto'} space-x-4 items-center"
            >
                {#if data.product.stock}
                    <div class="flex space-x-8">
                        <div class="flex space-x-2">
                            <button
                                on:click={() => {
                                    --add_qty;
                                }}
                                disabled={add_qty === 1}
                            >
                                <Fa
                                    color={add_qty === 1
                                        ? "#999999"
                                        : "#FFFFFF"}
                                    icon={faMinus}
                                    size="sm"
                                />
                            </button>
                            <span class="px-4 bg-vspot-secondary-bg rounded">
                                {add_qty}
                            </span>
                            <button
                                on:click={() => {
                                    ++add_qty;
                                }}
                                disabled={add_qty >= data.product.stock}
                            >
                                <Fa
                                    icon={faPlus}
                                    color={add_qty < data.product.stock
                                        ? "#FFFFFF"
                                        : "#999999"}
                                    size="sm"
                                />
                            </button>
                        </div>
                    </div>
                {/if}
                <button
                    disabled={data.product.stock === 0}
                    class="px-16 w-fit p-2 bg-vspot-green text-vspot-primary-bg disabled:bg-vspot-secondary-bg disabled:text-vspot-text-hovered"
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
    {#if recommended}
        <div class="space-y-2 !mt-16">
            <h1>Recomandate pentru tine!</h1>
            <div
                class="flex space-x-2
                [&>*:nth-child(6)]:hidden lg:[&>*:nth-child(6)]:flex
                [&>*:nth-child(5)]:hidden lg:[&>*:nth-child(5)]:flex
                [&>*:nth-child(4)]:hidden lg:[&>*:nth-child(4)]:flex"
            >
                {#each recommended as rec}
                    <Product product={rec} />
                {/each}
            </div>
        </div>
    {/if}
    {#if data.product.description_long}
        <div class="block space-y-4 !mt-16 !mb-32">
            <button
                class=" bg-vspot-secondary-bg w-fit px-4 p-2 !rounded-b-none !rounded-t-lg"
                disabled
            >
                {$l("description.description")}
            </button>
            <div class="h-[1px] !-mt-0 w-full bg-vspot-secondary-bg" />
            <SvelteMarkdown source={data.product.description_long} />
        </div>
    {/if}
</div>
