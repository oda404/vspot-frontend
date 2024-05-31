<script lang="ts">
    import type {
        V1ServerOrder,
        V1ServerPurchasedProduct,
    } from "$lib/backendv1/order";
    import { backendv1_post_portal_set_order_status } from "$lib/backendv1/portal.js";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { current_language, l } from "$lib/langs";
    import AddressBox from "$lib/order/AddressBox.svelte";
    import { shipping_methods_get_img_url } from "$lib/orderinfo/shipping_methods";
    import {
        faCreditCard,
        faMoneyBill,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let data;

    let orders: V1ServerOrder[] = data.orders.orders;

    const order_total = (products: V1ServerPurchasedProduct[]) => {
        let total = 0;
        products.forEach((p) => {
            total += p.price + p.price_decimals - p.discount;
        });
        return total;
    };

    const order_total_shipping = (order: V1ServerOrder) => {
        return order.shipping_price + order.shipping_price_decimals;
    };

    $: tracking_number_inputs = data.orders.orders.map((order) => {
        const input = new InputFieldContext(order.shipping_tracking_number);
        input.validate = (val) => {
            if (!val) return "error.missing_tracking_number";
        };

        return {
            order_id: order.id,
            shipping_tracking: input,
        };
    });

    const find_tracking_number_input = (order_id: string) => {
        return tracking_number_inputs.find((n) => n.order_id === order_id)!
            .shipping_tracking;
    };

    const validate_and_set_shipping = async (order_id: string) => {
        let tracking_input = find_tracking_number_input(order_id);

        let error = !!tracking_input.do_validate();
        tracking_input = tracking_input;

        if (error) return;

        await backendv1_post_portal_set_order_status(
            order_id,
            "shipped",
            tracking_input.value,
        );
        window.location.reload();
    };

    const set_confirmed = async (order_id: string) => {
        await backendv1_post_portal_set_order_status(
            order_id,
            "confirmed",
            undefined,
        );
        window.location.reload();
    };

    const set_completed = async (order_id: string) => {
        await backendv1_post_portal_set_order_status(
            order_id,
            "completed",
            undefined,
        );
        window.location.reload();
    };
</script>

<div class="space-y-8 divide-y divide-vspot-green w-full">
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        PORTAL!!!
    </h1>
    {#if orders.length === 0}
        <span class="text-lg">
            {$l("order.no_orders")}
        </span>
    {/if}
    {#each orders as order}
        <div class="pt-4">
            <div class="flex space-x-4">
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
                </div>
                <button
                    class="h-fit p-2 px-4 rounded-lg text-vspot-secondary-bg bg-vspot-green !ml-auto disabled:opacity-60"
                    on:click={() => {
                        set_confirmed(order.id);
                    }}
                    disabled={order.status === "confirmed"}>Confirma</button
                >
                <div class="space-y-4">
                    <button
                        class="h-fit p-2 px-4 w-full rounded-lg text-vspot-secondary-bg bg-vspot-green disabled:opacity-60"
                        disabled={order.status === "shipped"}
                        on:click={() => {
                            validate_and_set_shipping(order.id);
                        }}>In transport</button
                    >
                    <InputField
                        id="shipping_tracking_number"
                        label="Tracking"
                        data={find_tracking_number_input(order.id)}
                    />
                </div>
                <button
                    class="p-2 px-4 h-fit rounded-lg text-vspot-secondary-bg bg-vspot-green disabled:opacity-60"
                    on:click={() => {
                        set_completed(order.id);
                    }}
                    disabled={order.status === "completed"}>Finalizeaza</button
                >
            </div>
            <div class="flex mt-4 space-x-8">
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
                                    >{product.price - product.discount} RON</span
                                >
                                {#if product.discount}
                                    <span class="line-through"
                                        >{product.price} RON</span
                                    >
                                {/if}
                            </div>
                        </a>
                    {/each}
                </div>
                <div class="space-y-4 flex flex-col items-center">
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
