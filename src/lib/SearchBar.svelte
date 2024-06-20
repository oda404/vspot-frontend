<script lang="ts">
    import Fa from "svelte-fa";
    import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
    import { l } from "./langs";
    import { onDestroy } from "svelte";
    import {
        backendv1_product_search,
        type V1ServerProductDisplayData,
    } from "./backendv1/product";
    import type { ServerResponse } from "./backendv1/response";
    import Spinner from "./Spinner.svelte";
    import ProductHorizontalDisplay from "./products/ProductHorizontalDisplay.svelte";

    export let open: boolean;

    let search_data: string;
    let search_data_last: string | undefined;
    let search_promise:
        | Promise<ServerResponse<V1ServerProductDisplayData[]>>
        | undefined;

    const query_interval_ms = 300;

    const interval_id = setInterval(() => {
        if (search_data === search_data_last) return;

        search_data_last = search_data;
        const keywords = search_data.split(" ");
        if (keywords.length === 0) return;

        search_promise = backendv1_product_search(keywords, fetch);
    }, query_interval_ms);

    onDestroy(() => {
        clearInterval(interval_id);
    });

    $: if (search_data) open = true;
</script>

<div class="lg:relative w-full">
    <button class="flex w-full items-center hover:cursor-pointer">
        <Fa icon={faSearch} />
        <form class="relative">
            <label
                for="search_bar_input"
                class="absolute {open || search_data ? 'hidden' : ''} left-4"
            >
                {$l("nav.search")}
            </label>
            <input
                id="search_bar_input"
                on:focus={() => (open = true)}
                bind:value={search_data}
                spellcheck={false}
                class="bg-vspot-primary-bg px-4 w-full outline-none focus:outline-none"
            />
        </form>
    </button>
    {#if open && search_data}
        <div
            class="absolute flex justify-center left-0 lg:top-12 top-14 bg-vspot-primary-bg lg:w-full w-[calc(100vw-30px)] border-2 border-vspot-secondary-bg rounded-lg p-4 drop-shadow-lg"
        >
            {#if search_promise}
                {#await search_promise}
                    <Spinner scale={1.5} fg="#ffffff" />
                {:then search_res}
                    {#if !search_res || search_res.status !== 200}
                        <div class="flex items-center justify-between">
                            <span class="text-left w-full"
                                >Am intampinat o problema</span
                            >
                            <button
                                on:click={() => {
                                    open = false;
                                }}
                            >
                                <Fa icon={faX} />
                            </button>
                        </div>
                    {:else if search_res.body.data?.length === 0}
                        <div class="flex items-center justify-between">
                            <span class="text-left w-full">
                                Nu s-a gasit niciun rezultat
                            </span>
                            <button
                                on:click={() => {
                                    open = false;
                                }}
                            >
                                <Fa icon={faX} />
                            </button>
                        </div>
                    {:else}
                        <div class="space-y-4 flex flex-col w-full">
                            <div class="flex items-center justify-between">
                                <span>Rezultatele cautarii</span>
                                <button
                                    on:click={() => {
                                        open = false;
                                    }}
                                >
                                    <Fa icon={faX} />
                                </button>
                            </div>
                            {#each search_res.body.data as product}
                                <div class="overflow-x-hidden">
                                    <ProductHorizontalDisplay
                                        show_discount
                                        {product}
                                    />
                                </div>
                            {/each}
                            <!-- <a
                                class="mx-auto"
                                href="/product/search?keywords={search_data
                                    .split(' ')
                                    .join('+')}">Vezi toate</a
                            > -->
                        </div>
                    {/if}
                {/await}
            {:else}
                <Spinner scale={1.5} fg="#ffffff" />
            {/if}
        </div>
    {/if}
</div>
