import { goto } from "$app/navigation";
import { backendv1_get_order_get } from "$lib/backendv1/order";
import { error, redirect } from "@sveltejs/kit";

export async function load({ data, fetch, url }) {

    let order_id = url.searchParams.get("order_id");
    if (!order_id)
        redirect(307, "/");

    const res = await backendv1_get_order_get(order_id, fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    return {
        order: res.body.data
    }
}
