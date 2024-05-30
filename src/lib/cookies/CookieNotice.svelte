<script lang="ts">
    import { browser } from "$app/environment";
    import { l } from "$lib/langs";

    let show = false;

    if (browser) {
        const cookies = document.cookie.replace(/\s+/g, "").split(";");
        const cookies_parsed = cookies.map((c) => c.split("="));

        if (!cookies_parsed.find((c) => c[0] === "cookie_consent")) show = true;
    }
</script>

{#if show}
    <div
        class="fixed left-4 bottom-4 max-w-[350px] bg-vspot-secondary-bg rounded-lg p-4 z-[50]"
    >
        <span class="text-sm">
            {$l("cookies.mandatory_notice")}
        </span>
        <a class="text-vspot-link text-sm" href="/cookie-policy"
            >{$l("action.see_policy")}</a
        >
        <div class="flex justify-between mt-2 space-x-4">
            <button
                class="bg-vspot-primary-bg p-2 rounded-tl-lg rounded-br-lg w-full"
                on:click={() => {
                    document.cookie = `cookie_consent=true; SameSite=strict; Domain=.dev.vspot.ro; Max-Age=31536000`;
                    show = false;
                }}
            >
                OK
            </button>
        </div>
    </div>
{/if}
