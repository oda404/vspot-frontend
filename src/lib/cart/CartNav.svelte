<script lang="ts">
    import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
    import { cart_clear_overlay, cart_store, type CartProduct } from "./cart";
    import CartAddedOverlay from "./CartAddedOverlay.svelte";
    import CartPreview from "./CartPreview.svelte";
    import Fa from "svelte-fa";
    import { beforeNavigate } from "$app/navigation";

    let item_count = 0;

    let show_overlay = false;
    let last_item: CartProduct;
    let stock_error = false;

    let cart_opened = false;
    let cart: any;

    cart_store.subscribe(($cart) => {
        cart = $cart;
        if ($cart.show_overlay) {
            show_overlay = true;
            stock_error = $cart.stock_error;
            last_item = $cart.items.find(
                (product) => product.internal_id === $cart.last_added,
            )!;
        }

        item_count = 0;
        $cart.items.forEach((i: CartProduct) => {
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
        bind:show={show_overlay}
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
            aria-label="Cart"
        >
            <Fa icon={faCartShopping} size="lg" />
            {#if item_count > 0}
                <span class="text-sm">{item_count}</span>
            {/if}
        </button>
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
