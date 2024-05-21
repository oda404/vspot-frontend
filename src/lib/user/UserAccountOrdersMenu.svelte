<script lang="ts">
    import type {
        V1ServerOrder,
        V1ServerPurchasedProduct,
    } from "$lib/backendv1/order";
    import { current_language, l } from "$lib/langs";
    import AddressBox from "$lib/order/AddressBox.svelte";
    import { shipping_methods_get_img_url } from "$lib/orderinfo/shipping_methods";
    import {
        faCreditCard,
        faMoneyBill,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let orders: V1ServerOrder[];

    const order_total = (products: V1ServerPurchasedProduct[]) => {
        let total = 0;
        products.forEach((p) => {
            total += p.price + p.price_decimals;
        });
        return total;
    };

    const order_total_shipping = (order: V1ServerOrder) => {
        return order.shipping_price + order.shipping_price_decimals;
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
                <div class="space-y-4">
                    {#each order.products as product}
                        <a
                            href="/product/{product.id}"
                            class="flex space-x-4 min-w-[420px]"
                        >
                            <img
                                src={product.image_url}
                                alt="{product.name} image"
                                class="rounded-md max-w-[80px] max-h-[80px]"
                            />
                            <div>
                                <span class="block">{product.name}</span>
                                <span class="text-lg block"
                                    >{product.price} RON</span
                                >
                            </div>
                        </a>
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
                        <div
                            class="flex justify-between border-vspot-secondary-bg"
                        >
                            <span class="whitespace-nowrap"
                                >{$l("description.shipping")}</span
                            >
                            <span class="whitespace-nowrap">
                                {order_total_shipping(order)}
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
                                {order_total(order.products) +
                                    order_total_shipping(order)} RON
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
