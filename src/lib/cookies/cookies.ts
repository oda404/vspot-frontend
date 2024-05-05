
import { writable } from "svelte/store";

export const cookies_consent_store = writable<boolean | undefined>(
    typeof window !== "undefined" &&
    (localStorage.cookies_consent && JSON.parse(localStorage.cookies_consent)) || undefined
);

export function cookies_consent_store_set(value: boolean) {
    typeof window !== "undefined" && (localStorage.cookies_consent = JSON.stringify(value));
    cookies_consent_store.set(value);
}

