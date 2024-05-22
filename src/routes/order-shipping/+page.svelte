<script lang="ts">
    import { goto } from "$app/navigation";
    import { l } from "$lib/langs";
    import OrderStage from "$lib/order/OrderStage.svelte";
    import InputField from "$lib/input/InputField.svelte";
    import InputDropdown from "$lib/input/InputFieldDropdown.svelte";
    import { InputFieldContext } from "$lib/input/InputField";
    import { romanian_counties } from "$lib/input/romanian_counties";
    import {
        orderinfo_set,
        ORDERINFO_STORE,
        type OrderInfo,
        orderinfo_shipping_address_is_billing,
        orderinfo_is_first_stage_valid,
    } from "$lib/orderinfo/orderinfo";
    import { onDestroy } from "svelte";
    import InputRadio from "$lib/input/InputRadio.svelte";
    import { shipping_get_methods } from "$lib/orderinfo/shipping_methods";
    import { error } from "@sveltejs/kit";

    import Spinner from "$lib/Spinner.svelte";
    import { pagetitle_make } from "$lib/title";

    export let data;

    let orderinfo: OrderInfo | undefined;
    onDestroy(
        ORDERINFO_STORE.subscribe(($orderinfo) => {
            orderinfo = $orderinfo;
        }),
    );

    if (!data.user) goto("/");

    if (!orderinfo || !orderinfo_is_first_stage_valid(orderinfo)) {
        goto("/order-info");
    }

    let shipping_is_billing = orderinfo_shipping_address_is_billing(orderinfo!);

    let county_data = new InputFieldContext(orderinfo!.shipping.county);
    county_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat judetul!";
    };

    let city_data = new InputFieldContext(orderinfo!.shipping.city);
    city_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat localitatea!";
        if (value.length > 256) return "Localitatea este prea lunga!";
    };

    let address_data = new InputFieldContext(orderinfo!.shipping.address);
    address_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat adresa!";
        if (value.length > 256) return "Adresa este prea lunga!";
    };

    let postalcode_data = new InputFieldContext(orderinfo!.shipping.postalcode);
    postalcode_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat codul postal!";
        if (value.length > 6) return "Cod postal invalid!";
    };

    let shipping_methods: any[] = [];
    let shipping_methods_promise = shipping_get_methods()
        .then((data) => {
            shipping_methods = data.body.data!.map((method) => {
                const delivery_time = `${method.delivery_time_days[0]}-${method.delivery_time_days[1]}`;
                return {
                    value: method.name,
                    display: method.display,
                    image_url: `/images/shipping/${method.name}.webp`,
                    cost_value: { cost: method.cost.price, currency: "RON" },
                    delivery_time_value: delivery_time,
                    selected: orderinfo!.shipping_method?.value === method.name,
                    description: {
                        translation: "shipping.methoddescription",
                        args: {
                            cost: `${method.cost.price} RON`,
                            delivery_time: delivery_time,
                        },
                    },
                };
            });
        })
        .catch((error) => {
            console.error(
                `Error trying to fetch shipping methods from backend: ${error}`,
            );
            error(400, "Eroare");
        });

    let shipping_method_error = false;
    $: if (shipping_methods.find((o) => o.selected))
        shipping_method_error = false;

    const validate_shipping_and_redirect = () => {
        if (shipping_is_billing) {
            orderinfo!.shipping = orderinfo!.billing;
        } else {
            let has_error = false;

            has_error = county_data.do_validate() !== undefined || has_error;
            county_data = county_data;

            has_error = city_data.do_validate() !== undefined || has_error;
            city_data = city_data;

            has_error = address_data.do_validate() !== undefined || has_error;
            address_data = address_data;

            has_error =
                postalcode_data.do_validate() !== undefined || has_error;
            postalcode_data = postalcode_data;

            if (has_error) return;

            orderinfo!.shipping = {
                county: county_data.value,
                city: city_data.value,
                address: address_data.value,
                postalcode: postalcode_data.value,
            };
        }

        let shipping_method = shipping_methods.find((o) => o.selected);
        if (!shipping_method) {
            shipping_method_error = true;
            return;
        }

        orderinfo!.shipping_method = {
            value: shipping_method.value,
            display: shipping_method.display,
            cost_for_order: shipping_method.cost_value,
            delivery_time_for_order: shipping_method.delivery_time_value,
        };

        orderinfo_set(orderinfo!);
        goto("/order-submit");
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.order_shipping"))}</title>
</svelte:head>

<div class="lg:px-24 space-y-12">
    <OrderStage stage={2} />
    <div class="bg-vspot-primary-bg rounded-lg p-4 space-y-4">
        <div class="space-y-4">
            <div class="text-xl">{$l("orderinfo.shippingaddress")}</div>
            <label class="text-lg">
                <input
                    type="checkbox"
                    class="mr-1"
                    bind:checked={shipping_is_billing}
                />
                {$l("ordership.shipping_is_billing")}
            </label>
            {#if !shipping_is_billing}
                <form class="space-y-4">
                    <div class="flex space-x-4">
                        <InputDropdown
                            id="county"
                            label={$l("orderinfo.county")}
                            options={romanian_counties}
                            bind:data={county_data}
                        />
                        <InputField
                            id="city"
                            label={$l("orderinfo.city")}
                            bind:data={city_data}
                        />
                    </div>
                    <div class="flex space-x-4">
                        <div class="w-[70%]">
                            <InputField
                                id="address"
                                label={$l("orderinfo.address")}
                                bind:data={address_data}
                            />
                        </div>
                        <div class="w-[30%]">
                            <InputField
                                id="postalcode"
                                label={$l("orderinfo.postalcode")}
                                bind:data={postalcode_data}
                            />
                        </div>
                    </div>
                </form>
            {/if}
        </div>
        <div class="space-y-4">
            <div class="text-xl">{$l("ordership.shipping_method")}</div>
            {#await shipping_methods_promise}
                <Spinner fg="#000000" />
            {:then}
                <InputRadio
                    name="shipping_option"
                    bind:options={shipping_methods}
                    do_locale_description
                />
            {:catch}
                <div />
            {/await}
            {#if shipping_method_error}
                <div class="text-vspot-text-error">
                    {$l("shipping.missingerror")}
                </div>
            {/if}
        </div>
        <button
            class="p-2 px-4 rounded-lg bg-vspot-green text-vspot-primary-bg"
            on:click={() => validate_shipping_and_redirect()}
            >{$l("ordership.next")}</button
        >
    </div>
</div>
