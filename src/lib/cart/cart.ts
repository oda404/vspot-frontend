import {
    backendv1_get_products_displayinfo,
    type V1ServerProductDisplayData,
} from "$lib/backendv1/product";
import { writable } from "svelte/store";

export type CartProduct = {
    internal_id: string;
    name: string;
    image_url: string;
    price: number;
    discount: number;
    currency: string;
    stock: number;
    qty: number;
};

export type Cart = {
    items: CartProduct[];
    last_added?: string;
    show_overlay: boolean;
    stock_error: boolean;
};

export const cart_store = writable<Cart>(
    (typeof window !== "undefined" &&
        localStorage.cart &&
        JSON.parse(localStorage.cart)) || {
        items: [],
        last_added: undefined,
        show_overlay: false,
        stock_error: false,
    },
);

function cart_save_to_localstorage(cart: Cart) {
    typeof window !== "undefined" && (localStorage.cart = JSON.stringify(cart));
}

function cart_set(cart: Cart) {
    cart_save_to_localstorage(cart);
    cart_store.set(cart);
}

function cart_update_item_coreinfo(
    item: CartProduct,
    coreinfo: V1ServerProductDisplayData,
) {
    item.name = coreinfo.name;
    item.image_url = coreinfo.image_url;
    item.price = coreinfo.price;
    item.discount = coreinfo.discount;
    item.currency = coreinfo.currency;
    item.stock = coreinfo.stock;
}

export async function cart_add_item(
    id: string,
    on_finished_cb?: (error?: string) => void,
    show_overlay = true,
) {
    const coreinfo_res = await backendv1_get_products_displayinfo([id]);
    if (coreinfo_res.status !== 200) {
        console.error(
            `Failed to get coreinfo from backend: ${coreinfo_res.status}`,
        );
        if (on_finished_cb)
            on_finished_cb(
                `Failed to get coreinfo from backend: ${coreinfo_res.status}`,
            );
        return -1;
    }

    let product_coreinfo = coreinfo_res.body.data![0];

    if (!product_coreinfo.stock) {
        console.error(
            `Tried adding '${product_coreinfo.name}' to cart but stock is ${product_coreinfo.stock}`,
        );
        if (on_finished_cb)
            on_finished_cb(
                `Tried adding '${product_coreinfo.name}' to cart but stock is ${product_coreinfo.stock}`,
            );
        return -1;
    }

    cart_store.update(($cart) => {
        let items = $cart.items;
        let item = items.find((product) => product.internal_id === id);

        if (!item) {
            /* The rest of the fields are set by cart_update_item_coreinfo */
            items.push({ internal_id: id, qty: 1 } as CartProduct);
            item = items[items.length - 1];
        } else {
            const qty = item.qty;
            if (qty >= product_coreinfo.stock) {
                $cart.stock_error = true;
                item.qty = product_coreinfo.stock;
            } else {
                ++item.qty;
            }
        }

        cart_update_item_coreinfo(item, product_coreinfo);

        $cart.show_overlay = show_overlay;
        $cart.last_added = id;

        cart_save_to_localstorage($cart);

        if (on_finished_cb) on_finished_cb();

        return $cart;
    });

    return 0;
}

export function cart_remove_one_item(id: string) {
    cart_store.update(($cart) => {
        let items = $cart.items;

        let item_idx = items.findIndex((product) => product.internal_id === id);
        if (item_idx === -1) return $cart;

        if (--items[item_idx].qty === 0) items.splice(item_idx, 1);

        cart_save_to_localstorage($cart);
        return $cart;
    });
}

export function cart_delete_item(id: string) {
    cart_store.update(($cart) => {
        let items = $cart.items;

        let idx = items.findIndex((product) => product.internal_id === id);
        if (idx === -1) return $cart;

        items.splice(idx, 1);

        cart_save_to_localstorage($cart);
        return $cart;
    });
}

export async function cart_sync_products() {}

export function cart_do_empty() {
    cart_set({
        items: [],
        last_added: undefined,
        show_overlay: false,
        stock_error: false,
    });
}

export function cart_clear_overlay() {
    cart_store.update(($cart) => {
        $cart.show_overlay = false;
        $cart.stock_error = false;
        cart_save_to_localstorage($cart);
        return $cart;
    });
}
