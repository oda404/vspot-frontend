<script lang="ts">
    import TopNavBar from "$lib/TopNavBar.svelte";
    import AgeConfirmationOverlay from "$lib/ageconfirmation/AgeConfirmationOverlay.svelte";
    import { scroll_lock_store } from "$lib/scroll";
    import { onDestroy } from "svelte";
    import Footer from "./Footer.svelte";
    import BackendShatpantsOverlay from "$lib/backend_shatpants/BackendShatpantsOverlay.svelte";
    import type { UserDisplayInfo } from "$lib/user/user";
    import CookieNotice from "$lib/cookies/CookieNotice.svelte";

    // let bg_component: any = null;
    // let rotate = false;

    // $: {
    //     switch ($page.url.pathname) {
    //         case "/":
    //             bg_component = LayoutBgFoldSmall;
    //             rotate = true;
    //             break;

    //         default:
    //             bg_component = null;
    //             rotate = false;
    //             break;
    //     }
    // }

    let global_disable_scroll = false;
    onDestroy(
        scroll_lock_store.subscribe(($scroll_lock) => {
            global_disable_scroll = $scroll_lock.length > 0;
        }),
    );

    export let user: UserDisplayInfo | undefined;
</script>

<svelte:window
    on:wheel|nonpassive={(e) => {
        if (global_disable_scroll) e.preventDefault();
    }}
/>

<div
    class="min-h-screen h-max w-[100%] flex justify-center bg-vspot-primary-bg relative overflow-x-hidden"
>
    <!-- {#if bg_component}
        <svelte:component this={bg_component} />
    {/if}
    <LayoutBgFoldBig {rotate} />
    {#if bg_component}
        {#if Array.isArray(bg_component)}
            {#each bg_component as comp}
                <svelte:component this={comp} {...prosp} />
            {/each}
        {:else}
            <svelte:component this={bg_component} />
        {/if}
    {/if} -->
    <AgeConfirmationOverlay />
    <BackendShatpantsOverlay />
    <CookieNotice />
    <div class="p-4 space-y-16 w-full lg:w-[1100px] z-10">
        <TopNavBar {user} />
        <main>
            <slot />
        </main>
    </div>
</div>
<Footer />
