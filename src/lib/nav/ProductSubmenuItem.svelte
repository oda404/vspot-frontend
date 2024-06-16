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

    export let mobile: boolean = false;
    export let mobile_hide_if_href_is_not: string | undefined = undefined;
    export let mobile_selected: boolean = false;
    export let mobile_on_select:
        | ((href: string | undefined) => void)
        | undefined = undefined;

    export let current_hover: string | undefined = undefined;

    export let suboptions: ({ name: string; href: string } | {})[] | undefined =
        undefined;

    const is_suboption_dividider = (
        suboption: { name: string; href: string } | {},
    ) => {
        return Object.keys(suboption).length === 0;
    };

    const suboption_as_defined = (
        suboption: { name: string; href: string } | {},
    ): { name: string; href: string } => {
        return suboption as { name: string; href: string };
    };

    $: hovered = current_hover === href;
    $: mobile_hide =
        typeof mobile_hide_if_href_is_not === "undefined"
            ? false
            : mobile_hide_if_href_is_not !== href;
</script>

{#if !mobile}
    <a
        {href}
        on:mouseenter={() => {
            if (!mobile) current_hover = href;
        }}
        class="relative flex items-center {!simple
            ? `p-2 px-4 ${!bg ? 'bg-vspot-purple' : bg} rounded-lg`
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
                        {#if is_suboption_dividider(suboption)}
                            <div class="bg-vspot-secondary-bg h-[1px] w-full" />
                        {:else}
                            <a
                                class="block whitespace-nowrap hover:text-vspot-text-hovered"
                                href={suboption_as_defined(suboption).href}
                                >{suboption_as_defined(suboption).name}</a
                            >
                        {/if}
                    {/each}
                </div>
            {/if}
        {/if}
    </a>
{:else if mobile_selected}
    <div class="space-y-2 mt-4">
        {#if suboptions}
            {#each suboptions as suboption}
                {#if is_suboption_dividider(suboption)}
                    <div class="bg-vspot-secondary-bg h-[1px] w-full" />
                {:else}
                    <a
                        class="block whitespace-nowrap hover:text-vspot-text-hovered"
                        href={suboption_as_defined(suboption).href}
                        >{suboption_as_defined(suboption).name}</a
                    >
                {/if}
            {/each}
        {/if}
    </div>
{:else if !mobile_hide}
    <button
        class="flex items-center"
        on:click={() => {
            if (mobile_on_select) mobile_on_select(href);
        }}
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
        {/if}
    </button>
{/if}
