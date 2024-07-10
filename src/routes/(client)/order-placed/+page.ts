import { redirect } from "@sveltejs/kit";

export async function load({ fetch, url }) {

    let order_id = url.searchParams.get("order_id");
    if (!order_id)
        redirect(307, "/");

    return {
        order_id: order_id
    }
}
