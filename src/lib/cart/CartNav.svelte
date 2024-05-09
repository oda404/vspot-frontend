<script lang="ts">
    import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
    import { cart_clear_overlay, cart_store } from "./cart";
    import CartAddedOverlay from "./CartAddedOverlay.svelte";
    import CartPreview from "./CartPreview.svelte";
    import Fa from "svelte-fa";
    import { beforeNavigate } from "$app/navigation";
    import type { CartProduct } from "$lib/types";

    let item_count = 0;

    let show_overlay = false;
    let last_item: any;
    let stock_error = false;

    let cart_opened = false;
    let cart: any;

    cart_store.subscribe(($cart) => {
        cart = $cart;
        if ($cart["show_overlay"]) {
            show_overlay = true;
            stock_error = $cart["stock_error"];
            last_item = $cart["items"].find(
                (i: any) => i.id === $cart["last_added"],
            );
        }

        item_count = 0;
        $cart["items"].forEach((i: CartProduct) => {
            item_count += i.qty;
        });
    });

    $: beforeNavigate(() => {
        if (show_overlay) show_overlay = false;
        if (cart_opened) cart_opened = false;
    });

    $: if (show_overlay) cart_clear_overlay();
</script>

<div class="relative">
    <CartAddedOverlay
        show={show_overlay}
        item={last_item}
        {stock_error}
        on_close_cb={() => {
            show_overlay = false;
        }}
    />
    <div class="flex flex-col items-center">
        <button
            on:click={() => {
                cart_opened = !cart_opened;
            }}
        >
            <Fa icon={faCartShopping} size="lg" />
        </button>
        {#if item_count > 0}
            <div>{item_count}</div>
        {/if}
    </div>
    {#if cart_opened}
        <CartPreview
            {cart}
            on_close_cb={() => {
                cart_opened = false;
            }}
        />
    {/if}
</div>
