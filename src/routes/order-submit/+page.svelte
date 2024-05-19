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
    import type { CartProduct } from "$lib/types";
    import { cart_do_empty, cart_store } from "$lib/cart/cart";
    import {
        backendv1_post_order_submit,
        type V1ClientOrderInfo,
    } from "$lib/backendv1/order";
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";
    import Spinner from "$lib/Spinner.svelte";
    import Turnstile from "$lib/turnstile/Turnstile.svelte";
    import { PUBLIC_VSPOT_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { pagetitle_make } from "$lib/title";

    export let data;

    if (!data.user) goto("/");

    let cart_items: CartProduct[];
    let currency: string;
    let cart_total = 0;
    const cart_store_unsubscribe = cart_store.subscribe(($cart_store) => {
        cart_items = $cart_store["items"];
        if (cart_items.length > 0) currency = cart_items[0].currency;
        cart_total = 0;
        cart_items.forEach((item) => {
            cart_total += item.qty * (item.price + item.price_decimals);
        });
    });

    onDestroy(cart_store_unsubscribe);

    $: if (!cart_items || cart_items.length === 0) goto("/");

    let orderinfo: OrderInfo | undefined;
    const orderinfo_store_unsubscribe = ORDERINFO_STORE.subscribe(
        ($orderinfo) => {
            orderinfo = $orderinfo;
        },
    );

    onDestroy(orderinfo_store_unsubscribe);

    if (!orderinfo || !orderinfo_is_second_stage_valid(orderinfo))
        goto("/order-info"); // Hmm

    const billing_info = orderinfo!.info;
    const billing_address = orderinfo!.billing;
    const shipping_address = orderinfo!.shipping;
    const shipping_method = orderinfo!.shipping_method!;

    let order_submitting = false;
    let order_submit_error: string | undefined;

    let turnstile_response: string | undefined;
    let turnstile_error = false;
    let turnstile_mounted = false;

    const order_submit = () => {
        order_submitting = true;
        const info: V1ClientOrderInfo = {
            products: cart_items.map((item) => {
                return { internal_id: item.id, qty: item.qty };
            }),

            firstname: orderinfo!.info.firstname,
            lastname: orderinfo!.info.lastname,
            phone: orderinfo!.info.phone,
            email: undefined, // TODO

            payment_method: orderinfo!.payment_option,

            billing_county: orderinfo!.billing.county,
            billing_city: orderinfo!.billing.city,
            billing_address: orderinfo!.billing.address,
            billing_postalcode: orderinfo!.billing.postalcode,

            shipping_county: orderinfo!.shipping.county,
            shipping_city: orderinfo!.shipping.city,
            shipping_address: orderinfo!.shipping.address,
            shipping_postalcode: orderinfo!.shipping.postalcode,

            shipping_method: orderinfo!.shipping_method!.value,
        };

        backendv1_post_order_submit(info, turnstile_response!)
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

<div class="lg:px-24 space-y-12">
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
        <div
            class="border border-vspot-secondary-bg bg-vspot-primary-bg p-4 rounded-lg"
        >
            <div class="flex justify-between">
                <div class="text-lg text-vspot-text-hovered">
                    {$l("ordership.shipping_method")}
                </div>
                <a class="text-vspot-text-hovered" href="/order-shipping"
                    >{$l("action.change")}</a
                >
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-[50px] h-full">
                    <img
                        src={shipping_methods_get_img_url(
                            shipping_method.value,
                        )}
                        alt="Shipping method"
                        class="rounded-lg"
                    />
                </div>
                <div>
                    <div>
                        {shipping_method.display}
                    </div>
                    <div>
                        {$l("shipping.methoddescription", {
                            cost: `${shipping_method.cost_for_order.cost} ${shipping_method.cost_for_order.currency}`,
                            delivery_time:
                                shipping_method.delivery_time_for_order,
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row">
            <div class="min-w-[70%] w-[70%] p-4 rounded-lg space-y-2">
                <div class="text-lg text-vspot-text-hovered">
                    {$l("description.yourproducts")}
                </div>
                <div class="space-y-8">
                    {#each cart_items as item}
                        <div
                            class="flex space-x-4 pb-2 border-b border-vspot-secondary-bg"
                        >
                            <a href="/product/{item.id}" class="w-[80px]">
                                <img
                                    src={item.preview_image_url}
                                    alt={`${item.name} preview`}
                                    class="rounded"
                                />
                            </a>
                            <div class="flex flex-col h-full space-between">
                                <a href="/product/{item.id}" class="text-lg">
                                    {item.name}
                                </a>
                                <div class="text-xl font-semibold">
                                    {item.price *
                                        item.qty}.{item.price_decimals}
                                    {item.currency}
                                </div>
                                <div>
                                    {item.qty}
                                    {$l("description.pcs")}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="w-full">
                <div
                    class="w-full bg-vspot-primary-bg h-fit rounded-lg space-y-4 p-4 border border-vspot-secondary-bg"
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
                                <div>{$l("description.producttotal")}</div>
                                <div>
                                    {cart_total}
                                    {currency}
                                </div>
                            </div>
                            <div
                                class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                            >
                                <div>{$l("description.shipping")}</div>
                                <div>
                                    {shipping_method.cost_for_order.cost}
                                    {shipping_method.cost_for_order.currency}
                                </div>
                            </div>
                            <div
                                class="flex justify-between border-vspot-secondary-bg !mt-6"
                            >
                                <div>{$l("description.simpletotal")}</div>
                                <div>
                                    {cart_total +
                                        shipping_method.cost_for_order.cost} RON
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        class="bg-vspot-green w-full p-2 px-4 rounded-lg text-vspot-primary-bg flex justify-center"
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
