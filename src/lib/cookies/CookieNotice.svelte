<script lang="ts">
    import { browser, dev } from "$app/environment";

    let show = false;

    if (browser) {
        const cookies = document.cookie.replace(/\s+/g, "").split(";");
        const cookies_parsed = cookies.map((c) => c.split("="));

        if (!cookies_parsed.find((c) => c[0] === "cookie_consent")) show = true;
    }
</script>

{#if show}
    <div
        class="fixed left-4 bottom-4 max-w-[300px] bg-vspot-secondary-bg rounded-lg p-4 z-[50]"
    >
        <span>
            Acest site foloseste cookies pentru a-ti imbunatati experienta de
            utilizare
        </span>
        <a class="text-vspot-link" href="cookie-policy">Vezi politica</a>
        <div class="flex justify-between mt-2 space-x-4">
            <button
                class="bg-vspot-primary-bg p-2 rounded-lg w-full"
                on:click={() => {
                    document.cookie = `cookie_consent=false; SameSite=strict; Domain=.dev.vspot.ro; Max-Age=31536000`;
                    show = false;
                }}
            >
                Nu mersi
            </button>
            <button
                class="bg-vspot-primary-bg p-2 rounded-lg w-full"
                on:click={() => {
                    document.cookie = `cookie_consent=true; SameSite=strict; Domain=.dev.vspot.ro; Max-Age=31536000`;
                    show = false;
                }}
            >
                Sunt de acord
            </button>
        </div>
    </div>
{/if}
