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

    $: left_disabled = pages === 1 || current_page === 1;
    $: right_disabled = pages === 1 || current_page === pages;
</script>

<div class="flex">
    <button
        disabled={left_disabled}
        aria-label="Pagina anterioara"
        class="!mx-4"
        on:click={() => navigate_to_page(current_page - 1)}
    >
        <Fa
            color={left_disabled ? "#888888" : "#ffffff"}
            size="sm"
            icon={faChevronLeft}
        />
    </button>
    <div class="flex space-x-2">
        {#each pages_expanded as p}
            <button
                on:click={() => navigate_to_page(p)}
                disabled={current_page === p}
                class="p-3 py-1 rounded-sm
                {current_page === p ? 'bg-vspot-purple' : ''}"
            >
                {p}
            </button>
        {/each}
    </div>
    <button
        disabled={right_disabled}
        aria-label="Pagina urmatoare"
        class="!mx-4"
        on:click={() => navigate_to_page(current_page + 1)}
    >
        <Fa
            color={right_disabled ? "#888888" : "#ffffff"}
            size="sm"
            icon={faChevronRight}
        />
    </button>
</div>
