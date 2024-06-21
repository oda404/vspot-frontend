
import { backendv1_get_portal_get_orders } from "$lib/backendv1/portal.js";
import { error } from "@sveltejs/kit";

export async function load({ fetch, parent, url }) {

    if (!(await parent()).user)
        error(404);

    const server_res = await backendv1_get_portal_get_orders(fetch);
    if (server_res.status !== 200)
        error(404);

    return {
        orders: server_res.body.data!
    }
}
