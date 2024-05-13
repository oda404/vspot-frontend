
import { backendv1_get_order_get_user } from "$lib/backendv1/order.js";
import { backendv1_get_portal_get_orders } from "$lib/backendv1/portal.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, parent, url }) {

    if (!(await parent()).user)
        redirect(307, "/");

    const server_res = await backendv1_get_portal_get_orders(fetch);
    if (server_res.status !== 200)
        redirect(307, "/");

    return {
        orders: server_res.body.data!
    }
}
