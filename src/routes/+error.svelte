<script lang="ts">
    import { page } from "$app/stores";
    import { l } from "$lib/langs";
    import LayoutMain from "$lib/layout/LayoutMain.svelte";
    import { pagetitle_make } from "$lib/title";
    import "../app.css";

    const status = $page.status;

    const title =
        status === 404
            ? `404 ${$l("error.page404")}`
            : `${status} ${$page.error?.message}`;
</script>

<svelte:head>
    <title>{pagetitle_make(title)}</title>
</svelte:head>

<LayoutMain user={undefined}>
    <div class="space-y-4">
        {#if status == 404}
            <div class="flex items-end space-x-4">
                <span class="text-7xl font-bold rotate-12 block">404</span>
                <span class="text-4xl font-semibold">
                    {$l("error.page404")}
                </span>
            </div>
            <span class="block">
                Link-ul pe care l-ati urmat a fost sters sau nu a existat
                niciodata. Daca credeti ca este o eroare din partea noastra va
                rugam sa ne contactati <a
                    href="/contact"
                    class="text-vspot-link">aici</a
                >.
            </span>
        {:else}
            <div class="flex items-end space-x-4">
                <span class="text-7xl font-semibold rotate-12 block">
                    {$page.status}
                </span>
                <span class="text-4xl font-semibold">
                    {$l("error.encountered_error")}
                </span>
            </div>
            <span
                class="block font-bold border-b border-vspot-secondary-bg pb-4"
            >
                {$page.error?.message}
            </span>
            <span class="hidden"
                >Dobitocul de la it luwcreaza ewwxtra tare ca sa repare
                pwroblema UwU</span
            >
            <span class="block">
                {$l("error.encountered_error_description")}
                <a
                    class="text-vspot-link hover:text-vspot-link-hover"
                    href="/contact">{$l("description.here")}</a
                >.
            </span>
        {/if}
        <a
            href="/"
            class="block text-vspot-primary-bg px-4 p-2 rounded-sm bg-vspot-green w-fit hover:text-vspot-secondary-bg"
        >
            {$l("action.backtomainpage")}
        </a>
    </div>
</LayoutMain>
