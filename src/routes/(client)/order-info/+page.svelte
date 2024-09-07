<script lang="ts">
    import InputField from "$lib/input/InputField.svelte";
    import { InputFieldContext } from "$lib/input/InputField";
    import {
        ORDERINFO_STORE,
        type PaymentMethod,
        type OrderInfo,
        type Address,
        orderinfo_set_contactinfo,
        orderinfo_set_billing_address,
        orderinfo_set_shipping_address,
        orderinfo_set_payment_method,
    } from "$lib/orderinfo/orderinfo";
    import InputDropdown from "$lib/input/InputFieldDropdown.svelte";
    import { l } from "$lib/langs";
    import { goto } from "$app/navigation";
    import InputRadio from "$lib/input/InputRadio.svelte";
    import {
        faBuilding,
        faCreditCard,
        faHouse,
        faMoneyBill,
    } from "@fortawesome/free-solid-svg-icons";
    import OrderStage from "$lib/order/OrderStage.svelte";
    import { romanian_counties } from "$lib/input/romanian_counties";
    import { onDestroy } from "svelte";
    import { pagetitle_make } from "$lib/title.js";
    import { cart_store } from "$lib/cart/cart.js";
    import { get } from "svelte/store";
    import { USER_EMAIL_REGEX } from "$lib/user/validation.js";
    import Fa from "svelte-fa";

    export let data;

    let orderinfo: OrderInfo | undefined;
    onDestroy(
        ORDERINFO_STORE.subscribe(($orderinfo) => {
            orderinfo = $orderinfo;
        }),
    );

    if (!get(cart_store)?.items?.length) goto("/");

    let payment_options = [
        // {
        //     value: "card" as PaymentMethod,
        //     display: "payment.card",
        //     icon: faCreditCard,
        //     selected: orderinfo?.payment_option === "card",
        // },
        {
            value: "cash" as PaymentMethod,
            display: "payment.cash",
            icon: faMoneyBill,
            selected: orderinfo?.payment_option === "cash",
        },
    ];
    let payment_option_error = false;
    $: if (payment_options.find((o) => o.selected))
        payment_option_error = false;

    let firstname_data = new InputFieldContext(
        orderinfo?.info?.firstname || data.user?.firstname,
    );
    firstname_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numele!";
        if (value.length < 3) return "Numele este prea scurt";
        if (value.length > 256) return "Numele este prea lung!";
    };

    let lastname_data = new InputFieldContext(
        orderinfo?.info?.lastname || data.user?.lastname,
    );
    lastname_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numele!";
        if (value.length < 3) return "Numele este prea scurt";
        if (value.length > 256) return "Numele este prea lung!";
    };

    let phone_data = new InputFieldContext(orderinfo?.info?.phone);
    phone_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numarul de telefon!";
        if (!value.replace(/\s/g, "").match(/^(\+?4)?07[0-9]{8}$/))
            return "Numar invalid!";
    };

    let email_data = new InputFieldContext(data.user?.email);
    email_data.validate = (value: string) => {
        if (!value.match(USER_EMAIL_REGEX)) return $l("error.invalid.email");
    };

    let county_data = new InputFieldContext(orderinfo?.billing?.county);
    county_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat judetul!";
        if (value.length > 256) return "Judetul este prea lung!";
        if (value.length < 3) return "Judetul este prea scurt!";
    };

    let city_data = new InputFieldContext(orderinfo?.billing?.city);
    city_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat localitatea!";
        if (value.length > 256) return "Localitatea este prea lunga!";
        if (value.length < 3) return "Localitatea este prea scurta!";
    };

    let street_data = new InputFieldContext(orderinfo?.billing?.street);
    street_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat adresa!";
        if (value.length < 5) return "Adresa este prea scurta";
        if (value.length > 256) return "Adresa este prea lunga!";
    };

    let postalcode_data = new InputFieldContext(orderinfo?.billing?.postalcode);
    postalcode_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat codul postal!";
        if (value.length < 6) return "Codul postal este prea scurt!";
        if (value.length > 6) return "Cod postal invalid!";
    };

    let address_type: "house" | "building";
    if (
        typeof orderinfo?.billing?.house === "undefined" &&
        typeof orderinfo?.billing?.building === "undefined"
    ) {
        address_type = "house";
    } else if (typeof orderinfo?.billing?.house === "undefined") {
        address_type = "building";
    } else {
        address_type = "house";
    }

    let house_number_data = new InputFieldContext(
        orderinfo?.billing?.house?.number,
    );
    house_number_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numarul!";
        if (value.length > 8) return "Numarul este prea lung!";
    };

    let building_number_data = new InputFieldContext(
        orderinfo?.billing?.building?.number,
    );
    building_number_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat blocul!";
        if (value.length > 8) return "Blocul este prea lung!";
    };

    let building_entrance_data = new InputFieldContext(
        orderinfo?.billing?.building?.entrance,
    );
    building_entrance_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat scara!";
        if (value.length > 8) return "Scara este prea lunga!";
    };

    let building_apartment_data = new InputFieldContext(
        orderinfo?.billing?.building?.apartment,
    );
    building_apartment_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat apartamentul!";
        if (value.length > 8) return "Apartamentul este prea lung!";
    };

    const validate_data_and_redirect = () => {
        let has_error = false;

        has_error = firstname_data.do_validate() !== undefined || has_error;
        firstname_data = firstname_data;

        has_error = lastname_data.do_validate() !== undefined || has_error;
        lastname_data = lastname_data;

        has_error = phone_data.do_validate() !== undefined || has_error;
        phone_data = phone_data;

        has_error = email_data.do_validate() !== undefined || has_error;
        email_data = email_data;

        has_error = county_data.do_validate() !== undefined || has_error;
        county_data = county_data;

        has_error = city_data.do_validate() !== undefined || has_error;
        city_data = city_data;

        has_error = street_data.do_validate() !== undefined || has_error;
        street_data = street_data;

        has_error = postalcode_data.do_validate() !== undefined || has_error;
        postalcode_data = postalcode_data;

        if (address_type === "house") {
            has_error =
                house_number_data.do_validate() !== undefined || has_error;
            house_number_data = house_number_data;
        } else if (address_type === "building") {
            has_error =
                building_number_data.do_validate() !== undefined || has_error;
            building_number_data = building_number_data;

            has_error =
                building_entrance_data.do_validate() !== undefined || has_error;
            building_entrance_data = building_entrance_data;

            has_error =
                building_apartment_data.do_validate() !== undefined ||
                has_error;
            building_apartment_data = building_apartment_data;
        }

        let payment_method = payment_options.find((o) => o.selected)!;
        if (!payment_method) {
            has_error = true;
            payment_option_error = true;
        }

        if (has_error) return;

        orderinfo_set_contactinfo({
            lastname: lastname_data.value,
            firstname: firstname_data.value,
            phone: phone_data.value,
            email: email_data.value,
        });

        const billing_address: Address = {
            county: county_data.value,
            city: city_data.value,
            street: street_data.value,
            postalcode: postalcode_data.value,
        };

        if (address_type === "house") {
            billing_address.building = undefined;
            billing_address.house = {
                number: house_number_data.value,
            };
        } else if (address_type === "building") {
            billing_address.house = undefined;
            billing_address.building = {
                number: building_number_data.value,
                entrance: building_entrance_data.value,
                apartment: building_apartment_data.value,
            };
        }

        orderinfo_set_billing_address(billing_address);
        orderinfo_set_shipping_address(billing_address);
        orderinfo_set_payment_method(payment_method.value);
        goto("/order-shipping");
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.order_info"))}</title>
</svelte:head>

<div class="space-y-8">
    <OrderStage stage={1} />
    <div class="lg:w-[50%] space-y-4">
        <div class="space-y-4">
            <span class="text-xl">{$l("orderinfo.personaldata")}</span>
            <div class="flex space-x-4">
                <InputField
                    id="lastname"
                    label={$l("orderinfo.lastname")}
                    bind:data={lastname_data}
                />
                <InputField
                    id="firstname"
                    label={$l("orderinfo.firstname")}
                    bind:data={firstname_data}
                />
            </div>
            <InputField
                id="phone"
                label={$l("orderinfo.phone")}
                bind:data={phone_data}
            />
            {#if !data.user}
                <InputField
                    id="email"
                    label={$l("user.email")}
                    bind:data={email_data}
                />
            {/if}
        </div>
        <div class="space-y-4">
            <span class="text-xl">Adresa</span>
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
                <div class="flex space-x-4 justify-between items-center">
                    <button
                        class="py-4 w-full space-y-4 h-fit text-start flex flex-col items-center"
                        class:border-vspot-green={address_type === "house"}
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
                    /
                    <button
                        class="py-4 w-full space-y-4 h-fit text-start flex flex-col items-center"
                        class:border-vspot-green={address_type === "building"}
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
        <div class="space-y-4">
            <span class="text-xl">{$l("orderinfo.paymentoption")}</span>
            <div class="!mt-2">
                <InputRadio
                    do_locale
                    name="payment"
                    bind:options={payment_options}
                />
                {#if payment_option_error}
                    <div class="text-vspot-text-error !mt-0 text-sm">
                        {$l("payment.missingerror")}
                    </div>
                {/if}
            </div>
        </div>
        <button
            class="bg-vspot-green text-vspot-primary-bg px-4 py-2 w-full"
            on:click={() => validate_data_and_redirect()}
        >
            {$l("orderinfo.continue")}
        </button>
    </div>
</div>
