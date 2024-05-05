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

    export let current_hover: string | undefined;

    export let suboptions: { name: string; href: string }[] | undefined =
        undefined;

    $: hovered = current_hover === href;
</script>

<a
    {href}
    on:mouseenter={() => (current_hover = href)}
    class="relative flex items-center {!simple
        ? `p-2 px-4 ${!bg ? 'bg-vspot-purple' : bg} rounded-full`
        : ''} {hovered ? 'space-x-2' : 'space-x-3'}"
>
    <slot />
    <div />
    {#if suboptions}
        <div class="!ml-auto flex">
            {#if hovered}
                <Fa color={color ? color : ""} icon={faArrowRight} />
            {:else}
                <Fa color={color ? color : ""} icon={faChevronRight} />
            {/if}
        </div>
        {#if hovered}
            <div
                class="absolute top-[-14px] left-[110%] bg-vspot-primary-bg p-4 space-y-2 rounded-lg"
            >
                {#each suboptions as suboption}
                    <a class="block whitespace-nowrap" href={suboption.href}
                        >{suboption.name}</a
                    >
                {/each}
            </div>
        {/if}
    {/if}
</a>
