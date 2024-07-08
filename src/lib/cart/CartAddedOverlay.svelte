<script lang="ts">
    import { l } from "$lib/langs";
    import ProductHorizontalDisplay from "$lib/products/ProductHorizontalDisplay.svelte";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";
    import { faXmark } from "@fortawesome/free-solid-svg-icons";
    import { Fa } from "svelte-fa";
    import type { CartProduct } from "./cart";

    export let show: boolean;
    export let on_close_cb: any;
    export let item: CartProduct;
    export let stock_error: boolean;

    $: if (show) scroll_add_lock("cart_overlay");
    else scroll_remove_lock("cart_overlay");

    const on_key_down = (event: any) => {
        if (show && event.key === "Escape") show = false;
    };
</script>

<svelte:window on:keydown={on_key_down} />

{#if show}
    <button
        on:click={() => (show = false)}
        class="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[100]"
    >
        <div class="bg-vspot-primary-bg p-4 h-fit rounded-lg space-y-2">
            {#if !stock_error}
                <div class="flex items-center">
                    <span class="text-vspot-text-hovered">
                        {$l("description.addedtocart")}
                    </span>
                    <button class="ml-auto" on:click={on_close_cb}>
                        <Fa size="lg" color="#dddddd" icon={faXmark} />
                    </button>
                </div>
                <ProductHorizontalDisplay
                    show_qty_control={false}
                    show_discount
                    product={item}
                />
                <div class="flex justify-between space-x-16">
                    <button
                        on:click={on_close_cb}
                        class="text-vspot-green mt-auto"
                    >
                        {$l("action.continueshopping")}
                    </button>
                    <a
                        class="px-4 bg-vspot-green rounded-tl-lg rounded-br-lg text-vspot-primary-bg p-1"
                        href="/cart"
                    >
                        {$l("action.seecart")}
                    </a>
                </div>
            {:else}
                <div class="space-y-4">
                    <div class="flex items-center">
                        <div class="text-vspot-text-hovered">
                            {$l("description.notaddedtocart")}
                        </div>
                        <button class="ml-auto" on:click={on_close_cb}>
                            <Fa size="lg" color="#dddddd" icon={faXmark} />
                        </button>
                    </div>
                    <span class="block">
                        {$l("description.cartlimithit")}
                    </span>
                    <div class="flex space-x-4">
                        <button on:click={on_close_cb} class="text-vspot-green">
                            {$l("action.continueshopping")}
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </button>
{/if}
