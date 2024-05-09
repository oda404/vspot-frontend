<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { l } from "$lib/langs";
    import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let options: SortOption[];
    let selected: SortOption;

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
    <div
        class="flex w-full h-max items-center bg-vspot-primary-bg rounded-lg py-2 space-x-4"
    >
        <h1 class=" text-lg text-white whitespace-nowrap">
            {$l("sort.title")}
        </h1>
        <div>
            <button
                on:click={() => {
                    opened = !opened;
                }}
                class="flex items-center space-x-2"
            >
                <div class="whitespace-nowrap">
                    {selected}
                </div>
                <Fa
                    icon={faChevronDown}
                    class="{opened
                        ? 'transform -rotate-180'
                        : ''} transition ease-out duration-250"
                />
            </button>
            {#if opened}
                <button
                    class="fixed top-0 left-0 h-full w-full z-10 cursor-default"
                    on:click={() => {
                        opened = false;
                    }}
                />
                <div class="relative z-20 drop-shadow">
                    <div
                        class="absolute w-max rounded-lg bg-vspot-secondary-bg border border-vspot-purple"
                    >
                        {#each options as option}
                            <button
                                on:click={() => on_sort_selected(option.value)}
                                class="whitespace-nowrap w-full text-left block hover:bg-vspot-purple p-1 px-2"
                                disabled={option.label === selected}
                                >{option.label}</button
                            >
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}
