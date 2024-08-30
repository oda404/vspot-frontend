<script lang="ts">
    import { l } from "$lib/langs";
    import LinkButton from "$lib/LinkButton.svelte";
    import { pagetitle_make } from "$lib/title";
    import { faCheck } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.reset_password.success"))}</title>
</svelte:head>

<div class="space-y-0">
    <div class="flex items-center space-x-16">
        <span class="text-5xl font-semibold">
            {$l("page.reset_password.success")}
        </span>
        <Fa primaryColor="#00ff01" scale="6x" icon={faCheck} />
    </div>
    <span class="text-lg font-semibold block text-vspot-text-hovered">
        {$l(`page.reset_password.success.description`)}
    </span>
    <div class="!mt-4">
        <LinkButton simple href="/login">
            <span>{$l("action.login")}</span>
        </LinkButton>
    </div>
</div>
