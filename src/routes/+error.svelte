<script lang="ts">
    import { page } from "$app/stores";
    import { l } from "$lib/langs";
    import LayoutMain from "$lib/layout/LayoutMain.svelte";
    import "../app.css";

    const status = $page.status;
</script>

<LayoutMain user={undefined}>
    <div>
        {#if status == 404}
            <div class="1">
                <span class="text-9xl font-[Blowhole] font-semibold">
                    404 {$l("error.page404")}
                </span>
            </div>
            <div class="text-lg">
                {$l("error.page404_description")}
            </div>
        {:else}
            <div class="">
                <span class="text-9xl font-[Blowhole] font-semibold">
                    {$page.status}
                    {$l("error.encountered_error")}
                </span>
            </div>
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
