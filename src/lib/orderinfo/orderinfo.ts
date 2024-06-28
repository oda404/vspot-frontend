
import { is_string_len_valid } from "$lib/input/validation";
import { get, writable } from "svelte/store";

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
    name: string;
    display: string;
    price: number;
};

export type Coupon = {
    code: string;
    value_perc: number;
}

export type OrderInfo = {
    info?: ContactInfo;
    billing?: Address;
    shipping?: Address;
    payment_option?: PaymentMethod;
    shipping_method?: ShippingMethod;
    coupon?: Coupon;
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

function orderinfo_save_to_local(orderinfo: OrderInfo) {
    typeof window !== "undefined" && (localStorage.orderinfo = JSON.stringify(orderinfo));
}

export const ORDERINFO_STORE = writable<OrderInfo | undefined>(
    typeof window !== "undefined" &&
    (localStorage.orderinfo && JSON.parse(localStorage.orderinfo)) || undefined
);

function orderinfo_set(value: OrderInfo) {
    ORDERINFO_STORE.set(value);
    orderinfo_save_to_local(value);
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
    return orderinfo.shipping?.county === orderinfo.billing?.county &&
        orderinfo.shipping?.city === orderinfo.billing?.city &&
        orderinfo.shipping?.address === orderinfo.billing?.address &&
        orderinfo.shipping?.postalcode === orderinfo.billing?.postalcode;
}

export function orderinfo_clear() {
    ORDERINFO_STORE.set(undefined);
    typeof window !== "undefined" && delete localStorage.orderinfo;
}

export function orderinfo_set_coupon(coupon: Coupon) {
    if (!get(ORDERINFO_STORE)) {
        orderinfo_set({ coupon: coupon });
        return;
    }

    ORDERINFO_STORE.update($order_info => {
        $order_info!.coupon = coupon;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}

export function orderinfo_unset_coupon() {
    if (!get(ORDERINFO_STORE))
        return;

    ORDERINFO_STORE.update($order_info => {
        $order_info!.coupon = undefined;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}

export function orderinfo_set_contactinfo(info: ContactInfo) {
    if (!get(ORDERINFO_STORE)) {
        orderinfo_set({ info });
        return;
    }

    ORDERINFO_STORE.update($order_info => {
        $order_info!.info = info;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}

export function orderinfo_set_billing_address(address: Address) {
    if (!get(ORDERINFO_STORE)) {
        orderinfo_set({ billing: address });
        return;
    }

    ORDERINFO_STORE.update($order_info => {
        $order_info!.billing = address;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}

export function orderinfo_set_shipping_address(address: Address) {
    if (!get(ORDERINFO_STORE)) {
        orderinfo_set({ shipping: address });
        return;
    }

    ORDERINFO_STORE.update($order_info => {
        $order_info!.shipping = address;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}

export function orderinfo_set_payment_method(payment: PaymentMethod) {
    if (!get(ORDERINFO_STORE)) {
        orderinfo_set({ payment_option: payment });
        return;
    }

    ORDERINFO_STORE.update($order_info => {
        $order_info!.payment_option = payment;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}

export function orderinfo_set_shipping_method(method: ShippingMethod) {
    if (!get(ORDERINFO_STORE)) {
        orderinfo_set({ shipping_method: method });
        return;
    }

    ORDERINFO_STORE.update($order_info => {
        $order_info!.shipping_method = method;
        orderinfo_save_to_local($order_info!);
        return $order_info;
    });
}
