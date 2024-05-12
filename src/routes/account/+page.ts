import { backendv1_get_order_get_user } from "$lib/backendv1/order.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, parent, url }) {

    if (!(await parent()).user)
        redirect(307, "/");

    const server_res = await backendv1_get_order_get_user(fetch);
    if (server_res.status >= 500)
        error(server_res.status, { message: server_res.body.msg });

    return {
        tab: url.searchParams.get("tab"),
        orders: server_res.body.data!
    }
}