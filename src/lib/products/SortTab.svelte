<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { l } from "$lib/langs";
    import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let options: { label: string; value: string }[];
    let selected: string;

    $: {
        const url_sort_value = $page.url.searchParams.get("sort");
        if (url_sort_value && options.find((o) => o.value === url_sort_value))
            selected = $l(`sort.${url_sort_value}`);
        else if (options.length > 0) selected = options[0].label;
    }

    let opened = false;

    const on_sort_selected = (value: string) => {
        let url_params = new URLSearchParams(window.location.search);
        url_params.set("sort", value);
        opened = false;
        goto(`?${url_params.toString()}`);
    };
</script>

{#if options.length > 0}
    <div class="relative w-full lg:w-fit">
        <button
            class="flex items-center w-full justify-center space-x-8 px-2 border-b border-vspot-secondary-bg pb-2 !rounded-none"
            on:click={() => {
                opened = !opened;
            }}
        >
            <span class="whitespace-nowrap text-lg">
                {selected}
            </span>
            <Fa
                icon={faChevronDown}
                size="sm"
                class="{opened
                    ? 'transform -rotate-180'
                    : ''} transition ease-out duration-250"
            />
        </button>
        {#if opened}
            <button
                class="fixed top-0 left-0 h-full w-full cursor-default"
                on:click={() => {
                    opened = false;
                }}
            />
            <div
                class="absolute w-[100%] rounded-b-lg bg-vspot-primary-bg border-b border-l border-r border-vspot-secondary-bg"
            >
                {#each options as option}
                    <button
                        on:click={() => {
                            if (option.label === selected) opened = false;
                            else on_sort_selected(option.value);
                        }}
                        class="whitespace-nowrap w-full text-left block hover:bg-vspot-secondary-bg p-2 px-4 !rounded-none"
                        >{option.label}</button
                    >
                {/each}
            </div>
        {/if}
    </div>
{/if}
