import { backendv1_base_fetch } from "./base_fetch";
import { backendv1_endpoint } from "./endpoint";
import type { FetchFunction } from "./safe_fetch";
import { BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

type V1ServerInvoiceInfo = {
    year_emited: number;
    month_emited: number;
    day_emited: number;
    from: string;
    price: string;
}

export type V1ServerInvoice = {
    id: string;
    year: number;
    month: number;
    day: number;
    pdf_endpoint: string;

    info: V1ServerInvoiceInfo;
};

export async function v1_find_all_invoices(
    year: string | undefined,
    month: string | undefined,
    day: string | undefined,
    fetch: FetchFunction
): Promise<ServerResponse<V1ServerInvoice[]>> {
    const params = new URLSearchParams();
    if (typeof year !== "undefined")
        params.set("year", year);

    if (typeof month !== "undefined")
        params.set("month", month);

    if (typeof day !== "undefined")
        params.set("day", day);

    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/invoices/find?${params.toString()}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS
            },
        },
        fetch
    );
}
