<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faArrowRight,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";

    export let href: string;
    export let simple: boolean = false;
    export let bg: string | undefined = undefined;
    export let color: string | undefined = undefined;

    let hovered: boolean = false;
</script>

<a
    {href}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
    class="flex items-center {!simple
        ? `p-2 px-4 ${!bg ? 'bg-vspot-purple' : bg} rounded-lg`
        : ''} {hovered ? 'space-x-2' : 'space-x-3'}"
>
    <slot />
    {#if hovered}
        <Fa color={color ? color : ""} icon={faArrowRight} />
    {:else}
        <Fa color={color ? color : ""} icon={faChevronRight} />
    {/if}
</a>
