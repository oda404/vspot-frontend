<script lang="ts">
    import { l } from "$lib/langs.js";
    import { pagetitle_make } from "$lib/title";
    import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.forgot_password.success"))}</title>
</svelte:head>

<div>
    <div class="flex items-center space-x-8">
        <span class="text-6xl lg:text-9xl font-[Blowhole] font-semibold">
            {$l("page.forgot_password.success.header")}
        </span>
        <Fa primaryColor="#cccccc" size="6x" icon={faEnvelope} />
    </div>
    <span class="text-lg block">
        {$l("page.forgot_password.success.description")}
    </span>
    <span class="text-lg block"> </span>
    <span class="block mt-4">
        {$l("page.send_confirm_email.spam_notice")}
    </span>
    <span class="block mt-4 border-t border-vspot-secondary-bg py-4">
        {$l("description.need_assistance")}
        <a class="text-vspot-purple" href="/contact">{$l("description.here")}</a
        >.
    </span>
</div>
