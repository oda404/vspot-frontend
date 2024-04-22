<script lang="ts">
    import { browser } from "$app/environment";
    import { beforeNavigate, goto } from "$app/navigation";
    import { backend_shatpants_store } from "./backend_shatpants";

    let backend_shat: boolean;
    backend_shatpants_store.subscribe(($val) => {
        backend_shat = $val;
    });

    $: beforeNavigate(() => {
        if (backend_shat) backend_shatpants_store.set(false);
    });
</script>

{#if browser && backend_shat}
    <div
        class="fixed flex z-[100] top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] hideScroll justify-center items-center"
    >
        <div
            class="bg-vspot-primary-bg p-4 rounded-lg overflow-hidden relative"
        >
            <div class="text-4xl mb-2">:(</div>
            <div class="text-lg">
                Am intampinat o problema incercand sa accesez serverul...
            </div>
            <div class="flex space-x-1">
                <div>Daca problema persista ne poti contacta</div>
                <a href="/contact">aici</a>
            </div>
            <button
                class="bg-vspot-green text-vspot-primary-bg p-2 rounded-lg w-full mt-4"
                on:click={() => {
                    goto(window.location.pathname);
                }}
            >
                Reincarca pagina
            </button>
        </div>
    </div>
{/if}
