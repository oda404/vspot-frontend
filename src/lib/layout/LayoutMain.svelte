<script lang="ts">
    import { page } from "$app/stores";
    import TopNavBar from "$lib/TopNavBar.svelte";
    import AgeConfirmationOverlay from "$lib/ageconfirmation/AgeConfirmationOverlay.svelte";
    import { scroll_lock_store } from "$lib/scroll";
    import { onDestroy } from "svelte";
    import Footer from "./Footer.svelte";
    import LayoutBgFoldBig from "./LayoutBgFoldBig.svelte";
    import LayoutBgFoldSmall from "./LayoutBgFoldSmall.svelte";
    import LayoutBgFoldStraight from "./LayoutBgFoldStraight.svelte";
    import BackendShatpantsOverlay from "$lib/backend_shatpants/BackendShatpantsOverlay.svelte";

    let bg_component: any = null;
    $: {
        if (["/", "/cart"].includes($page.url.pathname)) {
            bg_component = [LayoutBgFoldSmall, LayoutBgFoldBig];
        } else if ($page.url.pathname.startsWith("/order-")) {
            bg_component = LayoutBgFoldStraight;
        } else {
            bg_component = LayoutBgFoldBig;
        }
    }

    let global_disable_scroll = false;
    onDestroy(
        scroll_lock_store.subscribe(($scroll_lock) => {
            global_disable_scroll = $scroll_lock.length > 0;
        }),
    );
</script>

<svelte:window
    on:wheel|nonpassive={(e) => {
        if (global_disable_scroll) e.preventDefault();
    }}
/>

<div
    class="min-h-screen h-max w-[100%] flex justify-center bg-vspot-primary-bg relative overflow-x-hidden"
>
    {#if bg_component}
        {#if Array.isArray(bg_component)}
            {#each bg_component as comp}
                <svelte:component this={comp} />
            {/each}
        {:else}
            <svelte:component this={bg_component} />
        {/if}
    {/if}
    <AgeConfirmationOverlay />
    <BackendShatpantsOverlay />
    <div class="p-4 space-y-16 w-full lg:w-[1100px] z-10">
        <TopNavBar />
        <main>
            <slot />
        </main>
    </div>
</div>
<Footer />
