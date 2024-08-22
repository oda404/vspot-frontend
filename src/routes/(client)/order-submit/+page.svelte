<script lang="ts">
    import { goto } from "$app/navigation";
    import { l } from "$lib/langs";
    import AddressBox from "$lib/order/AddressBox.svelte";
    import OrderStage from "$lib/order/OrderStage.svelte";
    import { shipping_methods_get_img_url } from "$lib/orderinfo/shipping_methods";
    import {
        ORDERINFO_STORE,
        type OrderInfo,
        orderinfo_is_second_stage_valid,
        orderinfo_clear,
    } from "$lib/orderinfo/orderinfo";
    import { onDestroy } from "svelte";
    import {
        cart_do_empty,
        cart_store,
        type CartProduct,
    } from "$lib/cart/cart";
    import {
        backendv1_order_submit,
        type V1ClientOrderInfo,
    } from "$lib/backendv1/order";
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";
    import Spinner from "$lib/Spinner.svelte";
    import Turnstile from "$lib/turnstile/Turnstile.svelte";
    import { PUBLIC_VSPOT_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { pagetitle_make } from "$lib/title";
    import { price_discount, price_format } from "$lib/price.js";
    import ProductHorizontalDisplay from "$lib/products/ProductHorizontalDisplay.svelte";

    let cart_items: CartProduct[];
    let currency: string;
    let cart_total = 0;
    const cart_store_unsubscribe = cart_store.subscribe(($cart_store) => {
        cart_items = $cart_store["items"];
        if (cart_items.length > 0) currency = cart_items[0].currency;
        cart_total = 0;
        cart_items.forEach((item) => {
            cart_total += item.qty * (item.price - item.discount);
        });
    });

    onDestroy(cart_store_unsubscribe);

    $: if (!cart_items || cart_items.length === 0) goto("/");

    let orderinfo: OrderInfo | undefined;
    let coupon_discount: number = 0;
    onDestroy(
        ORDERINFO_STORE.subscribe(($orderinfo) => {
            orderinfo = $orderinfo;

            if (!$orderinfo?.coupon) {
                coupon_discount = 0;
                return;
            }

            coupon_discount = price_discount(
                cart_total,
                $orderinfo.coupon.value_perc,
            );
        }),
    );

    if (!orderinfo || !orderinfo_is_second_stage_valid(orderinfo))
        goto("/order-info"); // Hmm

    const billing_info = orderinfo!.info!;
    const billing_address = orderinfo!.billing!;
    const shipping_address = orderinfo!.shipping!;
    const shipping_method = orderinfo!.shipping_method!;
    let consent = false;
    let consent_error = false;
    $: if (consent_error && consent) consent_error = false;

    let order_submitting = false;
    let order_submit_error: string | undefined;

    let turnstile_response: string | undefined;
    let turnstile_error = false;
    let turnstile_mounted = false;

    const order_submit = () => {
        if (!consent) {
            consent_error = true;
            return;
        }

        order_submitting = true;
        const info: V1ClientOrderInfo = {
            products: cart_items.map((item) => {
                return { internal_id: item.internal_id, qty: item.qty };
            }),

            firstname: orderinfo!.info!.firstname,
            lastname: orderinfo!.info!.lastname,
            phone: orderinfo!.info!.phone,
            email: orderinfo!.info!.email,

            payment_method: orderinfo!.payment_option!,

            billing_county: orderinfo!.billing!.county,
            billing_city: orderinfo!.billing!.city,
            billing_street: orderinfo!.billing!.street,
            billing_postalcode: orderinfo!.billing!.postalcode,
            billing_house_number: orderinfo!.billing?.house?.number,
            billing_building_number: orderinfo!.billing?.building?.number,
            billing_building_entrance: orderinfo!.billing?.building?.entrance,
            billing_building_apartment: orderinfo!.billing?.building?.apartment,

            shipping_county: orderinfo!.shipping!.county,
            shipping_city: orderinfo!.shipping!.city,
            shipping_street: orderinfo!.shipping!.street,
            shipping_postalcode: orderinfo!.shipping!.postalcode,
            shipping_house_number: orderinfo!.shipping?.house?.number,
            shipping_building_number: orderinfo!.shipping?.building?.number,
            shipping_building_entrance: orderinfo!.shipping?.building?.entrance,
            shipping_building_apartment:
                orderinfo!.shipping?.building?.apartment,

            shipping_method: orderinfo!.shipping_method!.name,

            coupon: orderinfo!.coupon?.code,
        };

        backendv1_order_submit(info, turnstile_response!)
            .then((res) => {
                order_submitting = false;
                if (res.status !== 200) {
                    turnstile_mounted = false;
                    turnstile_response = undefined;

                    order_submit_error = "error.failedordersubmit";
                    return;
                }

                /* Success */
                /* let's leave the orderinfo as is? */
                cart_store_unsubscribe();
                cart_do_empty();
                orderinfo_clear();
                goto(`/order-placed?order_id=${res.body.data}`);
            })
            .catch((error) => {
                order_submitting = false;
                console.error(`Failed to submit order to backend ${error}`);
                backend_shatpants_store.set(true);
            });
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.order_submit"))}</title>
</svelte:head>

<div class="space-y-8">
    <OrderStage stage={3} />
    <div class="border-vspot-green space-y-4">
        <div
            class="flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4"
        >
            <AddressBox
                title={$l("orderinfo.billingaddress")}
                change_url="/order-info"
                address={billing_address}
                info={billing_info}
            />
            <AddressBox
                title={$l("orderinfo.shippingaddress")}
                change_url="/order-shipping"
                address={shipping_address}
                info={billing_info}
            />
        </div>
        <div class="p-4 rounded-lg">
            <div class="flex justify-between">
                <div class="text-lg text-vspot-text-hovered">
                    {$l("ordership.shipping_method")}
                </div>
                <a class="text-vspot-text-hovered" href="/order-shipping"
                    >{$l("action.change")}</a
                >
            </div>
            <div class="flex items-center space-x-2">
                <img
                    src={shipping_methods_get_img_url(shipping_method.name)}
                    alt="Shipping method"
                    class="rounded-lg w-[50px]"
                />
                <div>
                    <span class="block">
                        {shipping_method.display}
                    </span>
                    <span class="block">
                        {$l("shipping.methoddescription", {
                            cost: `${shipping_method.price} RON`,
                            delivery_time: "1-2",
                        })}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row">
            <div class="min-w-[65%] p-4 rounded-lg space-y-2">
                <div class="flex items-center space-x-2">
                    <span class="text-lg">Produse</span>
                    <div class="w-full h-[1px] bg-vspot-secondary-bg" />
                </div>
                {#each cart_items as item}
                    <div class="pt-4 w-full">
                        <ProductHorizontalDisplay
                            large
                            show_discount
                            qty={item.qty}
                            show_qty
                            product={item}
                        />
                    </div>
                {/each}
            </div>
            <div class="w-full">
                <div
                    class="w-full h-fit rounded-sm space-y-4 p-4 border border-vspot-secondary-bg"
                >
                    <div class="text-lg text-vspot-text-hovered">
                        {$l("order.sendorder")}
                    </div>
                    <div class="flex justify-between">
                        <div class="text-vspot-text-hovered">
                            {$l("payment.payment")}:&nbsp;{$l(
                                `payment.${orderinfo?.payment_option}`,
                            )}
                        </div>
                        <a class="text-vspot-text-hovered" href="/order-info"
                            >{$l("action.change")}</a
                        >
                    </div>
                    <div>
                        <div class="space-y-3">
                            <div
                                class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                            >
                                <span>{$l("description.producttotal")}</span>
                                <span>
                                    {price_format(cart_total)}
                                    {currency}
                                </span>
                            </div>
                            {#if coupon_discount}
                                <div
                                    class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                                >
                                    <span>{$l("description.discount")}</span>
                                    <span>
                                        -{price_format(coupon_discount)}
                                        {currency}
                                    </span>
                                </div>
                            {/if}
                            <div
                                class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                            >
                                <span>{$l("description.shipping")}</span>
                                <span>
                                    {price_format(shipping_method.price)}
                                    RON
                                </span>
                            </div>
                            <div
                                class="flex justify-between border-vspot-secondary-bg !mt-6"
                            >
                                <span>{$l("description.simpletotal")}</span>
                                <span>
                                    {price_format(
                                        cart_total +
                                            shipping_method.price -
                                            coupon_discount,
                                    )} RON
                                </span>
                            </div>
                        </div>
                    </div>
                    <label class="text-sm flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2"
                            bind:checked={consent}
                        />
                        {$l("order.consent")}
                    </label>
                    {#if consent_error}
                        <span class="text-sm text-vspot-text-error"
                            >{$l("order.consent_error")}</span
                        >
                    {/if}
                    <button
                        class="bg-vspot-green w-full p-2 px-4 text-vspot-primary-bg flex justify-center"
                        disabled={order_submitting ||
                            typeof order_submit_error !== "undefined"}
                        on:submit={() => {
                            return false;
                        }}
                        on:click={() => {
                            if (turnstile_response) order_submit();
                            else turnstile_mounted = true;
                        }}
                    >
                        {#if order_submitting}
                            <Spinner fg="#000000" />
                        {:else}
                            {orderinfo?.payment_option === "card"
                                ? $l("order.payandsend")
                                : $l("order.send")}
                        {/if}
                    </button>
                    {#if order_submit_error}
                        <div>{$l(order_submit_error)}</div>
                    {/if}
                </div>
                {#if turnstile_mounted}
                    <Turnstile
                        siteKey={PUBLIC_VSPOT_TURNSTILE_SITE_KEY}
                        on:turnstile-error={() => {
                            turnstile_error = true;
                        }}
                        on:turnstile-callback={({ detail: { token } }) => {
                            turnstile_error = false;
                            turnstile_response = token;
                            order_submit();
                        }}
                    />
                    {#if turnstile_error}
                        <span class="text-vspot-text-error mt-2">
                            {$l("error.turnstile_failed")}
                        </span>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>
