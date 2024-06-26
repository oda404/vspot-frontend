<script lang="ts">
    import type { V1ServerCouponInfo } from "$lib/backendv1/coupon";
    import type {
        V1ServerOrder,
        V1ServerPurchasedProduct,
    } from "$lib/backendv1/order";
    import { current_language, l } from "$lib/langs";
    import AddressBox from "$lib/order/AddressBox.svelte";
    import { shipping_methods_get_img_url } from "$lib/orderinfo/shipping_methods";
    import { price_discount } from "$lib/price";
    import ProductHorizontalDisplay from "$lib/products/ProductHorizontalDisplay.svelte";
    import {
        faCreditCard,
        faMoneyBill,
    } from "@fortawesome/free-solid-svg-icons";
    import Decimal from "decimal.js";
    import Fa from "svelte-fa";

    export let orders: V1ServerOrder[];

    const order_total = (
        products: V1ServerPurchasedProduct[],
        coupon?: V1ServerCouponInfo,
    ) => {
        let total = 0;
        products.forEach((p) => {
            total = new Decimal(total)
                .plus(p.price)
                .minus(p.discount)
                .toNumber();
        });

        if (coupon)
            total = new Decimal(total)
                .minus(price_discount(total, coupon.discount_perc))
                .toNumber();

        return total;
    };
</script>

<div class="space-y-8 divide-vspot-secondary-bg w-full">
    {#if orders.length === 0}
        <span class="text-lg">
            {$l("order.no_orders")}
        </span>
    {/if}
    {#each orders as order}
        <div>
            <span class="text-lg"
                >{$l("order.orderon", {
                    date: new Date(order.date).toLocaleDateString(
                        $current_language === "ro" ? "en-GB" : "en-US",
                    ),
                })}
            </span>
            <span class="text-vspot-green whitespace-nowrap block">
                {$l("order.status", {
                    status: $l(`order.${order.status}`),
                })}
            </span>
            <div class="lg:flex mt-4 space-y-4 lg:space-y-0 lg:space-x-8">
                <div
                    class="space-y-4 divide-y divide-vspot-secondary-bg min-w-[420px]"
                >
                    {#each order.products as product}
                        <div class="pt-4">
                            <ProductHorizontalDisplay
                                qty={product.qty}
                                show_qty
                                show_discount
                                price_on_qty
                                {product}
                            />
                        </div>
                    {/each}
                </div>
                <div class="space-y-4 flex flex-col lg:items-center">
                    <span class="whitespace-nowrap"
                        >{$l("shipping.shipping_through")}</span
                    >
                    <div class="w-[50px]">
                        <img
                            src={shipping_methods_get_img_url(
                                order.shipping_method,
                            )}
                            alt="Shipping method"
                            class="rounded-lg"
                        />
                    </div>
                    <span class="whitespace-nowrap">
                        {$l(`shipping.${order.shipping_method}`)}
                    </span>

                    <span class="text-nowrap">
                        {$l("orderinfo.paymentoption")}
                        {#if order.payment_method === "cash"}
                            <div class="flex space-x-2 items-center">
                                <Fa icon={faMoneyBill} />
                                <span>Cash</span>
                            </div>
                        {:else}
                            <div class="flex space-x-2 items-center">
                                <Fa icon={faCreditCard} />
                                <span>Card</span>
                            </div>
                        {/if}
                    </span>
                    {#if order.coupon}
                        <div>
                            <span>Voucher</span>
                            <span class="text-lg font-bold block"
                                >{order.coupon?.code}</span
                            >
                            <span class="text-lg font-bold"
                                >-{order.coupon?.discount_perc}%</span
                            >
                        </div>
                    {/if}
                </div>
                <div class="space-y-4 w-full">
                    <AddressBox
                        address={{
                            county: order.billing_county,
                            city: order.billing_city,
                            address: order.billing_address,
                            postalcode: order.billing_postalcode,
                        }}
                        info={{
                            lastname: order.lastname,
                            firstname: order.firstname,
                            phone: order.phone,
                        }}
                        title={$l("orderinfo.billingaddress")}
                    />
                    <AddressBox
                        address={{
                            county: order.shipping_county,
                            city: order.shipping_city,
                            address: order.shipping_address,
                            postalcode: order.shipping_postalcode,
                        }}
                        info={{
                            lastname: order.lastname,
                            firstname: order.firstname,
                            phone: order.phone,
                        }}
                        title={$l("orderinfo.shippingaddress")}
                    />
                    <div
                        class="flex flex-col p-4 border space-y-2 justify-between rounded-lg border-vspot-secondary-bg"
                    >
                        <div
                            class="flex justify-between border-vspot-secondary-bg space-x-16"
                        >
                            <span class="whitespace-nowrap"
                                >{$l("description.producttotal")}</span
                            >
                            <span class="whitespace-nowrap">
                                {order_total(order.products)}
                                RON
                            </span>
                        </div>
                        {#if order.coupon}
                            <div
                                class="flex justify-between border-vspot-secondary-bg space-x-16"
                            >
                                <span class="whitespace-nowrap"
                                    >{$l("description.discount")}</span
                                >
                                <span class="whitespace-nowrap">
                                    -{price_discount(
                                        order_total(order.products),
                                        order.coupon.discount_perc,
                                    )}
                                    RON
                                </span>
                            </div>
                        {/if}
                        <div
                            class="flex justify-between border-vspot-secondary-bg"
                        >
                            <span class="whitespace-nowrap"
                                >{$l("description.shipping")}</span
                            >
                            <span class="whitespace-nowrap">
                                {order.shipping_price}
                                RON
                            </span>
                        </div>
                        <div
                            class="flex justify-between border-vspot-secondary-bg"
                        >
                            <span class="whitespace-nowrap"
                                >{$l("description.simpletotal")}</span
                            >
                            <span class="whitespace-nowrap">
                                {order_total(order.products, order.coupon) +
                                    order.shipping_price} RON
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
