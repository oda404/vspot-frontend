<script lang="ts">
    import { l } from "$lib/langs.js";
    import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let data;
</script>

{#if data.status >= 400}
    <h1 class="text-4xl font-semibold">
        {$l("page.confirm_email.title.failed")}
    </h1>
    <div class="text-lg">
        {$l("page.confirm_email.description.failed")}
        <a href="/send-confirm-email" class="text-vspot-link">
            {$l("page.confirm_email.resend")}
        </a>
    </div>
{:else}
    <div class="flex items-center space-x-20">
        <span class="text-4xl font-semibold">
            {$l("page.confirm_email.title.success")}
        </span>
        <Fa primaryColor="#00ff01" scale="6x" icon={faEnvelopeCircleCheck} />
    </div>
    <span class="text-lg block mb-2">
        {$l("page.confirm_email.description.success")}
    </span>
    <a
        href="/"
        class="px-4 p-2 block w-fit !mt-4 rounded-sm bg-vspot-green text-vspot-primary-bg"
    >
        {$l("action.backtomainpage")}
    </a>
{/if}
