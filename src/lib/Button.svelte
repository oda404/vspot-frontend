<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faArrowRight,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";

    export let href: string;

    let hovered: boolean = false;
</script>

<a
    {href}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
    class="flex items-center p-1 px-4 bg-vspot-purple rounded-full space-x-2"
>
    <slot />
    {#if hovered}
        <Fa icon={faArrowRight} />
    {:else}
        <Fa icon={faChevronRight} />
    {/if}
</a>
