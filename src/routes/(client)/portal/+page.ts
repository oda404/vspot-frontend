
import { backendv1_order_all_admin } from "$lib/backendv1/order.js";
import { error } from "@sveltejs/kit";

export async function load({ fetch, parent, url }) {

    const user = (await parent()).user;
    if (!user || user.role !== "admin")
        error(404);

    const server_res = await backendv1_order_all_admin(1, fetch);
    if (server_res.status !== 200)
        error(404);

    return {
        orders: server_res.body.data!
    };
}
