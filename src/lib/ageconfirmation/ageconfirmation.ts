import { writable } from "svelte/store";

export const ageconfirmation_minimum_age = 18;

export const ageconfirmation_store = writable(
    typeof window !== "undefined" &&
    (localStorage.ageconfirmation && JSON.parse(localStorage.ageconfirmation)) || 0
);

export function ageconfirmation_store_set(value: number) {
    typeof window !== "undefined" && (localStorage.ageconfirmation = JSON.stringify(value));
    ageconfirmation_store.set(value);
}
