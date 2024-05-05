<script lang="ts">
    import {
        cookies_consent_store,
        cookies_consent_store_set,
    } from "./cookies";

    let cookie_consent: boolean | undefined;
    cookies_consent_store.subscribe(($cookie_consent) => {
        cookie_consent = $cookie_consent;
    });
</script>

{#if typeof cookie_consent === "undefined"}
    <div
        class="fixed left-4 bottom-4 max-w-[300px] bg-vspot-secondary-bg rounded-lg p-4 z-[50]"
    >
        <span>
            Acest site foloseste cookies pentru a-ti imbunatati experienta de
            utilizare
        </span>
        <a
            class="text-vspot-link hover:text-vspot-link-hover"
            href="cookie-policy">Vezi politica</a
        >
        <div class="flex justify-between mt-2 space-x-4">
            <button
                class="bg-vspot-primary-bg hover:text-vspot-text-hovered p-2 rounded-lg w-full"
                on:click={() => {
                    cookies_consent_store_set(false);
                }}
            >
                Nu mersi
            </button>
            <button
                class="bg-vspot-primary-bg hover:text-vspot-text-hovered p-2 rounded-lg w-full"
                on:click={() => {
                    cookies_consent_store_set(true);
                }}
            >
                Sunt de acord
            </button>
        </div>
    </div>
{/if}
