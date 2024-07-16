<script lang="ts">
    import { onDestroy } from "svelte";
    import { current_language_set, current_language } from "./langs";
    import { Ro, Us } from "svelte-flags";

    let lang = $current_language;
    onDestroy(current_language.subscribe(($lang) => (lang = $lang)));
</script>

<div class="">
    <svelte:component
        this={lang === "ro" ? Ro : Us}
        on:click={() => {
            // current_language_set(lang === "ro" ? "en" : "ro");
        }}
    />
</div>
