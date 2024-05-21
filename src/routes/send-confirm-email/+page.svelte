<script lang="ts">
    import { l } from "$lib/langs.js";

    export let data;

    $: user = data.user!;
</script>

<div>
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("page.send_confirm_email.title")}
    </h1>
    <span class="text-lg block">
        {$l("page.send_confirm_email.description")}
        <b class="text-lg">{user.email}</b>
    </span>
    <span class="text-lg block">
        {$l("page.send_confirm_email.follow_instructions")}
    </span>
    <span class="block mt-4">
        {$l("page.send_confirm_email.spam_notice")}
    </span>
    <span class="block mt-12">
        {$l("page.send_confirm_email.wrong_email")}
        <a class="text-vspot-purple" href="/account">{$l("description.here")}</a
        >
    </span>
</div>
