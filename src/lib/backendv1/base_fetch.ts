import type { ServerResponse } from "./response";
import { safe_fetch, type FetchFunction, type SafeFetchServerExploded } from "./safe_fetch";

export async function backendv1_base_fetch<T>(input: RequestInfo | URL,
    init?: RequestInit | undefined,
    fetch_func: FetchFunction = fetch
): Promise<ServerResponse<T>> {

    const res = await safe_fetch(input, init, fetch_func);
    /* if res is a string it's the e caught in safe_fetch */
    if (typeof res === "string")
        return { status: 500, body: { msg: res } };

    let body: any;
    try {
        body = await res.json();
    } catch (e: any) {
        return { status: 500, body: { msg: `${e.name}: ${e.message}` } };
    }

    return { status: res.status, body };
}
