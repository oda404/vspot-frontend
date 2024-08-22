<script lang="ts">
    import { goto } from "$app/navigation";
    import { l } from "$lib/langs";
    import OrderStage from "$lib/order/OrderStage.svelte";
    import InputField from "$lib/input/InputField.svelte";
    import InputDropdown from "$lib/input/InputFieldDropdown.svelte";
    import { InputFieldContext } from "$lib/input/InputField";
    import { romanian_counties } from "$lib/input/romanian_counties";
    import {
        ORDERINFO_STORE,
        type OrderInfo,
        orderinfo_shipping_address_is_billing,
        orderinfo_is_first_stage_valid,
        orderinfo_set_shipping_method,
        orderinfo_set_shipping_address,
        type Address,
    } from "$lib/orderinfo/orderinfo";
    import { onDestroy } from "svelte";
    import InputRadio from "$lib/input/InputRadio.svelte";

    import Spinner from "$lib/Spinner.svelte";
    import { pagetitle_make } from "$lib/title";
    import {
        backendv1_get_shipping_methods,
        type V1ShippingMethod,
    } from "$lib/backendv1/shipping.js";
    import { shipping_methods_get_img_url } from "$lib/orderinfo/shipping_methods.js";
    import type { RadioOption } from "$lib/input/InputRadio.js";
    import Fa from "svelte-fa";
    import { faBuilding, faHouse } from "@fortawesome/free-solid-svg-icons";

    let orderinfo: OrderInfo | undefined;
    onDestroy(
        ORDERINFO_STORE.subscribe(($orderinfo) => {
            orderinfo = $orderinfo;
        }),
    );

    if (!orderinfo || !orderinfo_is_first_stage_valid(orderinfo)) {
        goto("/order-info");
    }

    let shipping_is_billing = orderinfo_shipping_address_is_billing(orderinfo!);

    let county_data = new InputFieldContext(orderinfo!.shipping?.county);
    county_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat judetul!";
        if (value.length > 256) return "Judetul este prea lung!";
        if (value.length < 3) return "Judetul este prea scurt!";
    };

    let city_data = new InputFieldContext(orderinfo!.shipping?.city);
    city_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat localitatea!";
        if (value.length > 256) return "Localitatea este prea lunga!";
        if (value.length < 3) return "Localitatea este prea scurta!";
    };

    let street_data = new InputFieldContext(orderinfo!.shipping?.street);
    street_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat adresa!";
        if (value.length < 5) return "Adresa este prea scurta";
        if (value.length > 256) return "Adresa este prea lunga!";
    };

    let postalcode_data = new InputFieldContext(
        orderinfo!.shipping?.postalcode,
    );
    postalcode_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat codul postal!";
        if (value.length < 6) return "Codul postal este prea scurt!";
        if (value.length > 6) return "Cod postal invalid!";
    };

    let address_type: "house" | "building";
    if (
        typeof orderinfo?.shipping?.house === "undefined" &&
        typeof orderinfo?.shipping?.building === "undefined"
    ) {
        address_type = "house";
    } else if (typeof orderinfo?.shipping?.house === "undefined") {
        address_type = "building";
    } else {
        address_type = "house";
    }

    let house_number_data = new InputFieldContext(
        orderinfo?.shipping?.house?.number,
    );
    house_number_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numarul!";
        if (value.length > 8) return "Numarul este prea lung!";
    };

    let building_number_data = new InputFieldContext(
        orderinfo?.shipping?.building?.number,
    );
    building_number_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat blocul!";
        if (value.length > 8) return "Blocul este prea lung!";
    };

    let building_entrance_data = new InputFieldContext(
        orderinfo?.shipping?.building?.entrance,
    );
    building_entrance_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat scara!";
        if (value.length > 8) return "Scara este prea lunga!";
    };

    let building_apartment_data = new InputFieldContext(
        orderinfo?.shipping?.building?.apartment,
    );
    building_apartment_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat apartamentul!";
        if (value.length > 8) return "Apartamentul este prea lung!";
    };

    let shipping_methods_radio: RadioOption[] = [];
    let shipping_methods: V1ShippingMethod[] = [];

    let shipping_methods_promise = backendv1_get_shipping_methods(fetch)
        .then((res) => {
            if (res.status >= 400) {
                console.error(`Failed to fetch shipping method: ${res}`);
                return;
            }

            shipping_methods = res.body.data!;
            shipping_methods_radio = shipping_methods.map((method) => {
                const delivery_time = "1-2";
                return {
                    value: method.name,
                    display: $l(`shipping.${method.name}`),
                    image_url: shipping_methods_get_img_url(method.name),
                    selected: orderinfo!.shipping_method?.name === method.name,
                    description: {
                        translation: "shipping.methoddescription",
                        args: {
                            cost: `${method.price} RON`,
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
        });

    let shipping_method_error = false;
    $: if (shipping_methods_radio.find((o) => o.selected))
        shipping_method_error = false;

    const validate_shipping_and_redirect = () => {
        if (shipping_is_billing) {
            orderinfo_set_shipping_address(orderinfo!.billing!);
        } else {
            let has_error = false;

            has_error = county_data.do_validate() !== undefined || has_error;
            county_data = county_data;

            has_error = city_data.do_validate() !== undefined || has_error;
            city_data = city_data;

            has_error = street_data.do_validate() !== undefined || has_error;
            street_data = street_data;

            has_error =
                postalcode_data.do_validate() !== undefined || has_error;
            postalcode_data = postalcode_data;

            if (address_type === "house") {
                has_error =
                    house_number_data.do_validate() !== undefined || has_error;
                house_number_data = house_number_data;
            } else if (address_type === "building") {
                has_error =
                    building_number_data.do_validate() !== undefined ||
                    has_error;
                building_number_data = building_number_data;

                has_error =
                    building_entrance_data.do_validate() !== undefined ||
                    has_error;
                building_entrance_data = building_entrance_data;

                has_error =
                    building_apartment_data.do_validate() !== undefined ||
                    has_error;
                building_apartment_data = building_apartment_data;
            }

            if (has_error) return;

            const shipping_address: Address = {
                county: county_data.value,
                city: city_data.value,
                street: street_data.value,
                postalcode: postalcode_data.value,
            };

            if (address_type === "house") {
                shipping_address.building = undefined;
                shipping_address.house = {
                    number: house_number_data.value,
                };
            } else if (address_type === "building") {
                shipping_address.house = undefined;
                shipping_address.building = {
                    number: building_number_data.value,
                    entrance: building_entrance_data.value,
                    apartment: building_apartment_data.value,
                };
            }

            orderinfo_set_shipping_address(shipping_address);
        }

        const shipping_method_radio = shipping_methods_radio.find(
            (o) => o.selected,
        );
        if (!shipping_method_radio) {
            shipping_method_error = true;
            return;
        }

        const shipping_method = shipping_methods.find(
            (method) => (method.name = shipping_method_radio.value),
        );
        if (!shipping_method) {
            shipping_method_error = true;
            return;
        }

        orderinfo_set_shipping_method({
            name: shipping_method.name,
            display: $l(`shipping.${shipping_method.name}`),
            price: shipping_method.price,
        });

        goto("/order-submit");
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.order_shipping"))}</title>
</svelte:head>

<div class="space-y-8">
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
                <div class="space-y-4 w-[50%]">
                    <div class="flex items-center space-x-4">
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
                    <div class="flex items-center space-x-4">
                        <div class="w-[65%]">
                            <InputField
                                id="street"
                                label="Strada"
                                bind:data={street_data}
                            />
                        </div>
                        <div class="w-[35%]">
                            <InputField
                                id="postalcode"
                                label="Cod postal"
                                bind:data={postalcode_data}
                            />
                        </div>
                    </div>
                    <div>
                        <div class="flex space-x-4 justify-between">
                            <button
                                class="py-4 w-full space-y-4 h-fit text-start flex flex-col items-center"
                                class:border-vspot-green={address_type ===
                                    "house"}
                                class:border-vspot-secondary-bg={address_type !==
                                    "house"}
                                disabled={address_type === "house"}
                                on:click={() => {
                                    address_type = "house";
                                }}
                            >
                                <div class="flex items-center space-x-2">
                                    <Fa
                                        color={address_type === "house"
                                            ? "#6dda0c"
                                            : "#eeeeee"}
                                        icon={faHouse}
                                    />
                                    <span> Casa </span>
                                </div>
                            </button>
                            <button
                                class="py-4 w-full space-y-4 h-fit text-start flex flex-col items-center"
                                class:border-vspot-green={address_type ===
                                    "building"}
                                class:border-vspot-secondary-bg={address_type !==
                                    "building"}
                                disabled={address_type === "building"}
                                on:click={() => {
                                    address_type = "building";
                                }}
                            >
                                <div class="flex items-center space-x-2">
                                    <Fa
                                        color={address_type === "building"
                                            ? "#6dda0c"
                                            : "#eeeeee"}
                                        icon={faBuilding}
                                    />
                                    <span> Apartament </span>
                                </div>
                            </button>
                        </div>
                        {#if address_type === "house"}
                            <InputField
                                id="house_number"
                                label="Numar"
                                bind:data={house_number_data}
                            />
                        {:else if address_type === "building"}
                            <div class="flex space-x-4">
                                <InputField
                                    id="building"
                                    label="Bloc"
                                    bind:data={building_number_data}
                                />
                                <InputField
                                    id="entrance"
                                    label="Scara"
                                    bind:data={building_entrance_data}
                                />
                                <InputField
                                    id="apartment"
                                    label="Apartament"
                                    bind:data={building_apartment_data}
                                />
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
        <div class="space-y-4">
            <div class="text-xl">{$l("ordership.shipping_method")}</div>
            {#await shipping_methods_promise}
                <Spinner fg="#000000" />
            {:then}
                <InputRadio
                    name="shipping_option"
                    bind:options={shipping_methods_radio}
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
            class="p-2 px-4 bg-vspot-green text-vspot-primary-bg"
            on:click={() => validate_shipping_and_redirect()}
        >
            {$l("ordership.next")}
        </button>
    </div>
</div>
