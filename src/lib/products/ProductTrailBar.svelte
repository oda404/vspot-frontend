<script lang="ts">
    import { l } from "$lib/langs";
    import { product_trail_translate } from "./product_trail_translations";

    export let product_name: string;
    export let tags: string[];

    let trails = product_trail_translate(tags[0], tags.slice(1));
</script>

<div class="flex items-center space-x-2">
    <a class="text-sm" href="/">{$l("page.main")} /</a>
    {#each trails as trail, i}
        <a href="/{tags.slice(0, i + 1).join('/')}" class="text-sm">{trail} /</a
        >
    {/each}
    <span class="text-sm opacity-80">{product_name}</span>
</div>
