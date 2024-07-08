<script lang="ts">
    import { faX } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { type Cart } from "./cart";
    import { l } from "$lib/langs";
    import { onDestroy, onMount } from "svelte";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";
    import { price_format } from "$lib/price";
    import ProductHorizontalDisplay from "$lib/products/ProductHorizontalDisplay.svelte";

    export let cart: Cart;
    export let on_close_cb: () => void;

    $: cart_items = cart.items;

    /* reset to zero if cart_items changes */
    $: total = cart_items ? 0 : 0;
    $: for (let i = 0; i < cart_items.length; ++i) {
        total +=
            cart_items[i].qty * (cart_items[i].price - cart_items[i].discount);
    }

    onMount(() => {
        scroll_add_lock("cart_preview");
    });
    onDestroy(() => {
        scroll_remove_lock("cart_preview");
    });
</script>

<button
    class="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[100] cursor-default"
    on:click={() => {
        on_close_cb();
    }}
/>
<div
    class="absolute bg-vspot-primary-bg w-[97vw] lg:w-[380px] right-[-14px] top-14 p-4 px-4 rounded-lg drop-shadow z-[100] border-vspot-green"
>
    <div class="flex items-center mb-2 justify-between">
        <div class="whitespace-nowrap text-vspot-green text-md">
            {$l("description.yourcart")}
        </div>
        <button
            on:click={() => {
                on_close_cb();
            }}
        >
            <Fa size="sm" icon={faX} />
        </button>
    </div>
    <div class="space-y-2 divide-y divide-vspot-secondary-bg">
        {#if cart_items.length}
            {#each cart_items as item}
                <div class="pt-2">
                    <ProductHorizontalDisplay
                        show_discount={false}
                        show_qty_control
                        price_on_qty
                        qty={item.qty}
                        stock={item.stock}
                        product={item}
                    />
                </div>
            {/each}
            <div class="flex justify-between pt-4">
                <span class="mt-auto text-lg">
                    {$l("description.total", {
                        n: `${price_format(total)} ${cart_items[0].currency}`,
                    })}
                </span>
                <a
                    class="rounded-tl-lg rounded-br-lg bg-vspot-green text-vspot-secondary-bg px-4 p-1 text-left hover:text-vspot-primary-bg"
                    href="/cart"
                >
                    {$l("description.cartcheckout")}
                </a>
            </div>
        {:else}
            <div class="whitespace-nowrap">{$l("description.cartempty")}</div>
        {/if}
    </div>
</div>
