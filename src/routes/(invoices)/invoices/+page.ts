import { v1_find_all_invoices } from '$lib/backendv1/invoices.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, url }) {

    const now = new Date();

    let year = url.searchParams.get("year");
    if (!year) {
        year = now.getFullYear().toString();
        url.searchParams.set("year", year);
    }

    let month = url.searchParams.get("month");
    if (!month) {
        month = (now.getMonth() + 1).toString();
        url.searchParams.set("month", month);
    }

    let date_type = url.searchParams.get("date_type");
    if (!date_type || !["issue", "spv"].includes(date_type)) {
        date_type = "spv";
        url.searchParams.set("date_type", date_type);
    }

    const res = await v1_find_all_invoices(year, month, undefined, fetch);
    if (res.status !== 200)
        error(res.status, res.body.msg);

    return {
        invoices: res.body.data!,
        year,
        month,
        date_type
    }
}
