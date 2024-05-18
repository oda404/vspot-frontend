
import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL } from "$env/static/public";
import { backendv1_get_products_displayinfo, type V1ServerProductDisplayData } from "$lib/backendv1/product";
import type { CartProduct } from "$lib/types";
import { writable } from "svelte/store";

export type Cart = {
    items: CartProduct[],
    last_added?: string;
    show_overlay: boolean,
    stock_error: boolean,
};

export const cart_store = writable<Cart>(
    typeof window !== "undefined" &&
    (localStorage.cart && JSON.parse(localStorage.cart)) || { items: [], show_overlay: false, stock_error: false }
);

function cart_set(cart: Cart) {
    cart_store.set(cart);
    typeof window !== "undefined" && (localStorage.cart = JSON.stringify(cart));
}

function cart_update_item_coreinfo(item: CartProduct, coreinfo: V1ServerProductDisplayData) {
    item.name = coreinfo.name;
    item.price = coreinfo.price;
    item.price_decimals = coreinfo.price_decimals;
    item.currency = coreinfo.currency;
    item.stock = coreinfo.stock;
    item.preview_image_url = coreinfo.image_url;
}

export async function cart_add_item(id: string, on_finished_cb?: (error?: string) => void, show_overlay = true) {

    const coreinfo_res = await backendv1_get_products_displayinfo([id]);
    if (coreinfo_res.status !== 200) {
        console.error(`Failed to get coreinfo from backend: ${coreinfo_res.status}`);
        if (on_finished_cb)
            on_finished_cb(`Failed to get coreinfo from backend: ${coreinfo_res.status}`);
        return -1;
    }

    let product_coreinfo = coreinfo_res.body.data![0];

    if (!product_coreinfo.stock) {
        console.error(`Tried adding '${product_coreinfo.name}' to cart but stock is ${product_coreinfo.stock}`);
        if (on_finished_cb)

            on_finished_cb(`Tried adding '${product_coreinfo.name}' to cart but stock is ${product_coreinfo.stock}`);
        return -1;
    }

    cart_store.update(($cart) => {

        let items = $cart["items"];
        let item = items.find((i: CartProduct) => i.id === id);

        if (!item) {
            /* The rest of the fields are set by cart_update_item_coreinfo */
            items.push({ id, qty: 1 } as CartProduct);
            item = items[items.length - 1];
        }
        else {
            let qty = item["qty"];
            if (qty === product_coreinfo.stock)
                $cart["stock_error"] = true;
            else if (qty > product_coreinfo.stock)
                item["qty"] = product_coreinfo.stock;
            else
                ++item["qty"];
        }

        cart_update_item_coreinfo(item, product_coreinfo);

        $cart["show_overlay"] = show_overlay;
        $cart["last_added"] = id;

        typeof window !== "undefined" && (localStorage.cart = JSON.stringify($cart));

        if (on_finished_cb)
            on_finished_cb();

        return $cart;
    });

    return 0;
}

export function cart_remove_one_item(id: string) {
    cart_store.update(($cart_store) => {

        let items = $cart_store["items"];

        let item = items.find((i: CartProduct) => i.id === id);
        if (!item)
            return $cart_store;

        --item.qty;
        if (item.qty === 0)
            items.splice(items.findIndex((i: any) => i.id === id), 1);

        typeof window !== "undefined" && (localStorage.cart = JSON.stringify($cart_store));
        return $cart_store
    });
}

export function cart_delete_item(id: string) {
    cart_store.update(($cart_store) => {

        let items = $cart_store["items"];

        let idx = items.findIndex((i: CartProduct) => i.id === id);
        if (idx === -1)
            return $cart_store;

        items.splice(idx, 1);

        typeof window !== "undefined" && (localStorage.cart = JSON.stringify($cart_store));
        return $cart_store
    });
}

export async function cart_sync_products() {

}

export function cart_do_empty() {
    cart_set({
        items: [],
        last_added: undefined,
        show_overlay: false,
        stock_error: false
    });
}

export function cart_clear_overlay() {
    cart_store.update(($cart_store) => {
        $cart_store["show_overlay"] = false;
        $cart_store["stock_error"] = false;
        typeof window !== "undefined" && (localStorage.cart = JSON.stringify($cart_store));
        return $cart_store
    });
}
