import { backendv1_order_user_all } from "$lib/backendv1/order.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ fetch, parent, url }) {

    if (!(await parent()).user)
        redirect(307, "/");

    const server_res = await backendv1_order_user_all(1, fetch);
    if (server_res.status >= 500)
        error(server_res.status, { message: server_res.body.msg });

    return {
        tab: url.searchParams.get("tab"),
        orders: server_res.body.data!
    };
}