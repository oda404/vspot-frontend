<script lang="ts">
    import { cart_delete_item, cart_store } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import LinkButton from "$lib/LinkButton.svelte";
    import type { CartProduct } from "$lib/types";
    import Fa from "svelte-fa";
    import {
        faMinus,
        faPlus,
        faTrashCan,
    } from "@fortawesome/free-solid-svg-icons";
    import { cart_add_item, cart_remove_one_item } from "$lib/cart/cart";
    import { onDestroy } from "svelte";
    import Spinner from "$lib/Spinner.svelte";
    import { pagetitle_make } from "$lib/title.js";
    import { price_make, price_discount, price_format } from "$lib/price";
    import CouponInput from "$lib/cart/CouponInput.svelte";
    import { ORDERINFO_STORE } from "$lib/orderinfo/orderinfo.js";

    export let data;

    let cart_items: any;
    let cart_item_count = 0;

    let cart_item_total = 0;

    let flash_add = false;
    let flash_add_in_progress = false;

    const on_cart_update = ($cart: any) => {
        if (!$cart) return;
        cart_items = $cart["items"];
        cart_item_count = 0;
        cart_item_total = 0;
        $cart["items"].forEach((i: CartProduct) => {
            cart_item_count += i.qty;
            cart_item_total +=
                (i.price + i.price_decimals - i.discount) * i.qty;
        });
    };

    onDestroy(cart_store.subscribe(($cart) => on_cart_update($cart)));

    let coupon_discount: number = 0;
    $: onDestroy(
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

<div>
    <h1 class="text-7xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("cart.title")}
    </h1>
    <div class="h-[4px] rounded-lg my-2 w-full" />
    <div class="flex flex-col lg:flex-row w-full lg:space-x-4">
        <div class="lg:w-[70%] rounded-lg drop-shadow space-y-8">
            {#if cart_item_count}
                {#each cart_items as item}
                    <div class="flex space-x-4 pb-2">
                        <a
                            href="/product/{item.id}"
                            class="w-[180px] lg:w-[80px]"
                        >
                            <img
                                src={item.preview_image_url}
                                alt={`${item.name} preview`}
                                class="rounded"
                            />
                        </a>
                        <div class="h-full">
                            <a href="/product/{item.id}" class="text-lg">
                                {item.name}
                            </a>
                            {#if item.discount}
                                <span class="block text-lg line-through">
                                    {price_make(item.price * item.qty)}
                                </span>
                            {/if}
                            <span class="block mt-auto text-xl font-semibold">
                                {price_make(
                                    (item.price - item.discount) * item.qty,
                                )}
                                {item.currency}
                            </span>
                        </div>
                        <div
                            class="flex items-center space-x-8 !ml-auto mt-auto"
                        >
                            <button
                                class="flex items-center space-x-2"
                                on:click={() => {
                                    cart_delete_item(item.id);
                                }}
                            >
                                <Fa color="red" icon={faTrashCan} />
                                <div class="text-vspot-text-hovered">
                                    {$l("action.delete")}
                                </div>
                            </button>
                            <div class="flex space-x-2">
                                <button
                                    on:click={() =>
                                        cart_remove_one_item(item.id)}
                                    disabled={item.qty === 1}
                                >
                                    <Fa
                                        color={item.qty === 1
                                            ? "#999999"
                                            : "#FFFFFF"}
                                        icon={faMinus}
                                        size="sm"
                                    />
                                </button>
                                <div class="px-4 bg-vspot-secondary-bg rounded">
                                    {item.qty}
                                </div>
                                <button
                                    on:click={() => {
                                        cart_add_item(
                                            item.id,
                                            undefined,
                                            false,
                                        );
                                    }}
                                    disabled={item.qty >= item.stock}
                                >
                                    <Fa
                                        icon={faPlus}
                                        color={item.qty < item.stock
                                            ? "#FFFFFF"
                                            : "#999999"}
                                        size="sm"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="!mt-2 w-full flex justify-center">
                    {#if flash_add_in_progress}
                        <Spinner fg="#000000" />
                    {:else}
                        <!-- <div class="bg-vspot-secondary-bg rounded-lg w-2 h-2" /> -->
                    {/if}
                </div>
            {:else}
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
                class="lg:w-[30%] h-fit bg-vspot-primary-bg border border-vspot-secondary-bg p-4 rounded-lg drop-shadow space-y-4"
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
                        <span>{price_make(cart_item_total)} RON</span>
                    </div>
                    {#if data.user}
                        <CouponInput />
                    {/if}
                    {#if coupon_discount}
                        <div
                            class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                        >
                            <span>{$l("description.discount")}</span>
                            <span>-{price_format(coupon_discount)} RON</span>
                        </div>
                    {/if}
                    <div
                        class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                    >
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
    {#if data.product && !flash_add}
        <div class="mt-8 w-fit">
            <div class="text-2xl">
                {cart_item_count > 0
                    ? $l("description.productreminder")
                    : $l("description.productreminder_noitems")}
            </div>
            <div class="flex space-x-4 p-2 px-0">
                <a href="/product/{data.product.internal_id}" class="w-[100px]">
                    <img
                        src={data.product.image_url}
                        alt={`${data.product.name} preview`}
                        class="rounded"
                    />
                </a>
                <div class="flex flex-col">
                    <a
                        href="/product/{data.product.internal_id}"
                        class="text-lg leading-tight"
                    >
                        {data.product.name}
                    </a>
                    {#if data.product.discount}
                        <span class="text-lg line-through">
                            {price_make(data.product.price)}
                        </span>
                    {/if}
                    <span class="text-xl font-semibold">
                        {price_make(data.product.price - data.product.discount)}
                        {data.product.currency}
                    </span>
                    <button
                        class="w-fit mt-auto p-1 px-2 bg-vspot-green text-vspot-secondary-bg"
                        on:click={() => {
                            cart_add_item(
                                data.product.internal_id,
                                () => {
                                    flash_add_in_progress = false;
                                },
                                false,
                            );
                            flash_add = true;
                            flash_add_in_progress = true;
                        }}
                    >
                        {$l("action.addtocart")}
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
