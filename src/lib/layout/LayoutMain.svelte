<script lang="ts">
    import TopNavBar from "$lib/TopNavBar.svelte";
    import AgeConfirmationOverlay from "$lib/ageconfirmation/AgeConfirmationOverlay.svelte";
    import { scroll_lock_store } from "$lib/scroll";
    import { onDestroy } from "svelte";
    import Footer from "./Footer.svelte";
    import BackendShatpantsOverlay from "$lib/backend_shatpants/BackendShatpantsOverlay.svelte";
    import type { UserDisplayInfo } from "$lib/user/user";
    import CookieNotice from "$lib/cookies/CookieNotice.svelte";
    import { navigating } from "$app/stores";
    import NavigatingOverlay from "./NavigatingOverlay.svelte";

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
    {#if $navigating}
        <NavigatingOverlay />
    {/if}
    <AgeConfirmationOverlay />
    <BackendShatpantsOverlay />
    <CookieNotice />
    <div class="p-4 w-full lg:w-[1100px] z-10">
        <TopNavBar {user} />
        <main class="pt-[150px] lg:pt-[200px]">
            <slot />
        </main>
    </div>
</div>
<Footer />
