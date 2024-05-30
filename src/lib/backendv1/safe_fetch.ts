
export type FetchFunction = typeof fetch;

export type SafeFetchServerExploded = string;

/* God I love js */
export async function safe_fetch(
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
    fetch_func: FetchFunction = fetch
): Promise<SafeFetchServerExploded | Response> {
    try {
        return await fetch_func(input, init);
    }
    catch (e: any) {
        return `${e.name}: ${e.message}`;
    }
}
