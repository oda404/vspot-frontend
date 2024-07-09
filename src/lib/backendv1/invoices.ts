import { backendv1_base_fetch } from "./base_fetch";
import { backendv1_endpoint } from "./endpoint";
import type { FetchFunction } from "./safe_fetch";
import { BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

export type V1ServerInvoice = {
    id: string;
    year: number;
    month: number;
    day: number;
    pdf_endpoint: string;
};

export async function v1_find_all_invoices(
    year: number | undefined,
    month: number | undefined,
    day: number | undefined,
    fetch: FetchFunction
): Promise<ServerResponse<V1ServerInvoice[]>> {
    const params = new URLSearchParams();
    if (typeof year !== "undefined")
        params.set("year", year.toString());

    if (typeof month !== "undefined")
        params.set("month", month.toString());

    if (typeof day !== "undefined")
        params.set("day", day.toString());

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
