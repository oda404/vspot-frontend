
import { is_string_len_valid } from "$lib/input/validation";
import { writable } from "svelte/store";

const ALL_PAYMENT_METHODS = ["card", "cash"] as const;
type PaymentMethodTuple = typeof ALL_PAYMENT_METHODS;
export type PaymentMethod = PaymentMethodTuple[number];
export function is_payment_method(val: string): val is PaymentMethod {
    return ALL_PAYMENT_METHODS.includes(val as PaymentMethod)
}

export type Address = {
    county: string;
    city: string;
    address: string;
    postalcode: string;
};

export type ContactInfo = {
    lastname: string;
    firstname: string;
    phone: string;
};

export type ShippingMethod = {
    value: string;
    display: string;
    cost_for_order: { cost: number, currency: string };
    delivery_time_for_order: string;
};

export type OrderInfo = {
    info: ContactInfo;
    billing: Address;
    shipping: Address;
    payment_option: PaymentMethod;
    shipping_method?: ShippingMethod;
};

/* FIXME: hardcoded from the backend. The backend also checks stuff when submitting 
using it's consts, but if those change and these don't the ux wont be great */
export const ORDERINFO_COUNTY_MAX_LEN = 64;
export const ORDERINFO_CITY_MAX_LEN = 64;
export const ORDERINFO_ADDRESS_MAX_LEN = 128;
export const ORDERINFO_POSTALCODE_MAX_LEN = 6;
export const ORDERINFO_FIRSTNAME_LEN = 64;
export const ORDERINFO_LASTNAME_LEN = 64;
export const ORDERINFO_PHONE_LEN = 12;

export const ORDERINFO_STORE = writable<OrderInfo | undefined>(
    typeof window !== "undefined" &&
    (localStorage.orderinfo && JSON.parse(localStorage.orderinfo)) || undefined
);

export function orderinfo_set(value: OrderInfo) {
    ORDERINFO_STORE.set(value);
    typeof window !== "undefined" && (localStorage.orderinfo = JSON.stringify(value));
}

export function orderinfo_is_address_valid(address: Address) {

    if (!is_string_len_valid(address.county, ORDERINFO_COUNTY_MAX_LEN))
        return false;

    if (!is_string_len_valid(address.city, ORDERINFO_CITY_MAX_LEN))
        return false;

    if (!is_string_len_valid(address.address, ORDERINFO_ADDRESS_MAX_LEN))
        return false;

    if (!is_string_len_valid(address.postalcode, ORDERINFO_POSTALCODE_MAX_LEN))
        return false;

    return true;
}

export function orderinfo_is_first_stage_valid(orderinfo: OrderInfo) {
    if (!orderinfo.info)
        return false;

    if (!is_string_len_valid(orderinfo.info.firstname, ORDERINFO_FIRSTNAME_LEN))
        return false;

    if (!is_string_len_valid(orderinfo.info.lastname, ORDERINFO_LASTNAME_LEN))
        return false;

    if (!is_string_len_valid(orderinfo.info.phone, ORDERINFO_PHONE_LEN))
        return false;

    if (!orderinfo.payment_option || !is_payment_method(orderinfo.payment_option))
        return false;

    if (!orderinfo.billing || !orderinfo_is_address_valid(orderinfo.billing))
        return false;

    if (!orderinfo.shipping || !orderinfo_is_address_valid(orderinfo.shipping))
        return false;

    return true;
}

export function orderinfo_is_second_stage_valid(orderinfo: OrderInfo) {
    if (!orderinfo_is_first_stage_valid(orderinfo))
        return false;

    if (!orderinfo.shipping_method)
        return false;

    return true;
}

export function orderinfo_shipping_address_is_billing(orderinfo: OrderInfo) {
    return orderinfo.shipping.county === orderinfo.billing.county &&
        orderinfo.shipping.city === orderinfo.billing.city &&
        orderinfo.shipping.address === orderinfo.billing.address &&
        orderinfo.shipping.postalcode === orderinfo.billing.postalcode;
}

export function orderinfo_clear() {
    ORDERINFO_STORE.set(undefined);
    typeof window !== "undefined" && delete localStorage.orderinfo;
}
