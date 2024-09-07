<script lang="ts">
    import {
        PUBLIC_ENV,
        PUBLIC_VSPOT_BACKEND_GLOBAL_URL,
    } from "$env/static/public";
    import LayoutMain from "$lib/layout/LayoutMain.svelte";
    import "../../app.css";

    export let data;
</script>

<svelte:head>
    {#if PUBLIC_ENV === "prod"}
        <link rel="preconnect" href={PUBLIC_VSPOT_BACKEND_GLOBAL_URL} />
    {/if}
</svelte:head>

<LayoutMain user={data.user}>
    <slot />
</LayoutMain>
