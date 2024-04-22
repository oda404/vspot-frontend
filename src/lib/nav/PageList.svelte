<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import {
        faChevronLeft,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let pages: number;
    export let current_page: number;

    $: pages_expanded = Array.from({ length: pages }, (_, index) => index + 1);

    const navigate_to_page = (page: number) => {
        if (page <= 0 || page > pages) return;

        const url_params = new URLSearchParams(window.location.search);
        url_params.set("page", page.toString());

        goto(`?${url_params.toString()}`);
    };
</script>

<div class="flex">
    {#if pages > 1 && current_page > 1}
        <button
            class="!mx-4"
            on:click={() => navigate_to_page(current_page - 1)}
        >
            <Fa icon={faChevronLeft} />
        </button>
    {/if}
    <div class="flex space-x-2">
        {#each pages_expanded as p}
            <button
                on:click={() => navigate_to_page(p)}
                disabled={current_page === p}
                class="p-4 py-2 rounded-lg
                {current_page === p
                    ? 'bg-vspot-purple'
                    : 'bg-vspot-secondary-bg'}"
            >
                {p}
            </button>
        {/each}
    </div>
    {#if pages > 1 && current_page < pages}
        <button
            class="!mx-4"
            on:click={() => navigate_to_page(current_page + 1)}
        >
            <Fa icon={faChevronRight} />
        </button>
    {/if}
</div>
