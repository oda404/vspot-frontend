import { v1_find_all_invoices } from '$lib/backendv1/invoices.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {

    const now = new Date();

    const res = await v1_find_all_invoices(now.getFullYear(), now.getMonth() + 1, undefined, fetch);
    if (res.status !== 200)
        error(res.status, res.body.msg);

    return {
        invoices: res.body.data!,
        year: now.getFullYear(),
        month: now.getMonth() + 1
    }
}
