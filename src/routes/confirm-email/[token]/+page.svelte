<script lang="ts">
    import { l } from "$lib/langs.js";

    export let data;
</script>

{#if data.status >= 400}
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("page.confirm_email.title.failed")}
    </h1>
    <div class="text-lg">
        {$l("page.confirm_email.description.failed")}
        <a href="/send-confirm-email" class="text-vspot-link">
            {$l("page.confirm_email.resend")}
        </a>
    </div>
{:else}
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("page.confirm_email.title.success")}
    </h1>
    <span class="text-lg block mb-2">
        {$l("page.confirm_email.description.success")}
    </span>
    <a
        href="/"
        class="px-4 p-2 block w-fit !mt-4 rounded-lg bg-vspot-green text-vspot-primary-bg"
    >
        {$l("action.backtomainpage")}
    </a>
{/if}
