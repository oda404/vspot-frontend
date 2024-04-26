<script lang="ts">
    import { page } from "$app/stores";
    import { l } from "$lib/langs";

    const status = $page.status;
</script>

<div>
    {#if status == 404}
        <div class="mb-14 flex items-center space-x-8">
            <span class="text-6xl font-semibold opacity-80">
                404 {$l("error.page404")}
            </span>
        </div>
        <div class="text-2xl">
            {$l("error.page404_description")}
        </div>
    {:else}
        <div class="mb-14 flex items-center space-x-8">
            <span class="text-6xl font-semibold opacity-80">
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
        class="block !mt-4 text-vspot-primary-bg px-4 p-2 rounded-lg bg-vspot-green w-fit hover:text-vspot-secondary-bg"
    >
        {$l("action.backtomainpage")}
    </a>
</div>
