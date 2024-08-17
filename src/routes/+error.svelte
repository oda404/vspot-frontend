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
                <span class="text-6xl font-semibold">
                    {$l("error.page404")}
                </span>
            </div>
            <span class="block">
                Link-ul pe care l-ati urmat a fost sters sau nu a existat
                niciodata. Daca credeti ca este o eroare din partea noastra, ne
                puteti contacta <a href="/contact" class="text-vspot-link"
                    >aici</a
                >.
            </span>
            <span> </span>
        {:else}
            <span class="text-9xl font-semibold">
                {$page.status}
                {$l("error.encountered_error")}
            </span>
            <span>
                {$page.error?.message}
            </span>
            <div class="text-2xl">
                {$l("error.encountered_error_description")}
                <a
                    class="text-2xl text-vspot-link hover:text-vspot-link-hover"
                    href="/contact">{$l("description.here")}</a
                >
            </div>
        {/if}
        <a
            href="/"
            class="block !mt-4 text-vspot-primary-bg px-4 p-2 rounded-tl-lg rounded-br-lg bg-vspot-green w-fit hover:text-vspot-secondary-bg"
        >
            {$l("action.backtomainpage")}
        </a>
    </div>
</LayoutMain>
