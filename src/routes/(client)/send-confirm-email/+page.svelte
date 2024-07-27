<script lang="ts">
    import { l } from "$lib/langs.js";
    import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let data;

    $: user = data.user!;
</script>

<div>
    <div class="flex items-center space-x-8">
        <span class="text-6xl lg:text-9xl font-[Blowhole] font-semibold">
            {$l("page.send_confirm_email.title")}
        </span>
        <Fa primaryColor="#cccccc" size="6x" icon={faEnvelope} />
    </div>
    <span class="text-lg block">
        {$l("page.send_confirm_email.description")}
        <b class="text-lg">{user.email}</b>.
        {$l("page.send_confirm_email.follow_instructions")}
    </span>
    <span class="text-lg block"> </span>
    <span class="block mt-4">
        {$l("page.send_confirm_email.spam_notice")}
    </span>
    <span class="block mt-4 border-t border-vspot-secondary-bg py-4">
        {$l("page.send_confirm_email.wrong_email")}
        <a class="text-vspot-purple" href="/account">{$l("description.here")}</a
        >
    </span>
</div>
