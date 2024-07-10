<script lang="ts">
    import { cart_store, type Cart, type CartProduct } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import LinkButton from "$lib/LinkButton.svelte";
    import { onDestroy } from "svelte";
    import { pagetitle_make } from "$lib/title.js";
    import CouponInput from "$lib/cart/CouponInput.svelte";
    import { ORDERINFO_STORE } from "$lib/orderinfo/orderinfo.js";
    import ProductHorizontalDisplay from "$lib/products/ProductHorizontalDisplay.svelte";
    import { price_discount, price_format } from "$lib/price.js";
    import Decimal from "decimal.js";

    export let data;

    let cart_items: CartProduct[];
    let cart_item_count = 0;

    let cart_item_total = 0;

    const on_cart_update = ($cart: Cart) => {
        if (!$cart) return;
        cart_items = $cart.items;
        cart_item_count = 0;
        cart_item_total = 0;
        $cart.items.forEach((product) => {
            cart_item_count += product.qty;
            cart_item_total += new Decimal(product.qty)
                .mul(new Decimal(product.price).sub(product.discount))
                .toNumber();
        });
    };

    onDestroy(cart_store.subscribe(($cart) => on_cart_update($cart)));

    let coupon_discount: number = 0;
    onDestroy(
        ORDERINFO_STORE.subscribe(($orderinfo) => {
            if (!$orderinfo?.coupon) {
                coupon_discount = 0;
                return;
            }

            coupon_discount = price_discount(
                cart_item_total,
                $orderinfo.coupon.value_perc,
            );
        }),
    );
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.cart"))}</title>
</svelte:head>

<section>
    <h1 class="text-7xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("cart.title")}
    </h1>
    <div class="h-[4px] rounded-lg my-2 w-full" />
    <div
        class="flex flex-col lg:space-y-0 space-y-8 lg:flex-row w-full lg:space-x-8"
    >
        <div class="lg:w-[70%] space-y-4 divide-y divide-vspot-secondary-bg">
            {#each cart_items as item}
                <div class=" pt-4">
                    <ProductHorizontalDisplay
                        show_discount
                        qty={item.qty}
                        stock={item.stock}
                        show_qty_control
                        price_on_qty
                        large
                        force_delete_button
                        product={item}
                    />
                </div>
            {/each}
            {#if !cart_item_count}
                <div class="w-fit space-y-2">
                    <div class="text-xl mb-2 font-semibold">
                        {$l("description.cartempty")}
                    </div>
                    <LinkButton simple href="/">
                        <div>{$l("action.backtomainpage")}</div>
                    </LinkButton>
                </div>
            {/if}
        </div>
        {#if cart_item_count}
            <div
                class="lg:w-[35%] h-fit bg-vspot-primary-bg border border-vspot-secondary-bg p-4 rounded-lg drop-shadow space-y-4"
            >
                <div>
                    <div class="text-vspot-text-hovered text-xl">
                        {$l("description.ordersummary")}
                    </div>
                    <div>
                        {$l("description.productcount", { n: cart_item_count })}
                    </div>
                </div>

                <div class="space-y-4">
                    <div
                        class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                    >
                        <span>{$l("description.producttotal")}</span>
                        <span>{price_format(cart_item_total)} RON</span>
                    </div>
                    {#if data.user}
                        <div class="space-y-1">
                            <span>{$l("order.do_you_have_a_voucher")}</span>
                            <CouponInput />
                        </div>
                    {/if}
                    {#if coupon_discount}
                        <div
                            class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                        >
                            <span>{$l("description.discount")}</span>
                            <span>-{price_format(coupon_discount)} RON</span>
                        </div>
                    {/if}
                    <div class="flex justify-between">
                        <span>{$l("description.simpletotal")}</span>
                        <span
                            >{price_format(cart_item_total - coupon_discount)} RON</span
                        >
                    </div>
                    {#if !data.user}
                        <span class="text-vspot-green block !mt-4"
                            >{$l("order.noaccount_notice")}</span
                        >
                    {/if}
                    <LinkButton
                        href={data.user ? "/order-info" : "/signup"}
                        bg="bg-vspot-green"
                        color="#242729"
                        ><span class="mx-auto text-vspot-secondary-bg"
                            >{data.user
                                ? $l("action.shipping")
                                : $l("action.signup")}</span
                        ></LinkButton
                    >
                </div>
            </div>
        {/if}
    </div>
    {#if data.product}
        <div class="mt-16 w-fit">
            <div class="text-2xl">
                {cart_item_count > 0
                    ? $l("description.productreminder")
                    : $l("description.productreminder_noitems")}
            </div>
            <div class="p-2 px-0">
                <ProductHorizontalDisplay
                    show_discount
                    large
                    show_add_to_cart_button
                    product={data.product}
                />
            </div>
        </div>
    {/if}
</section>
