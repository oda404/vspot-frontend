<script lang="ts">
    import TopNavBar from "$lib/TopNavBar.svelte";
    import AgeConfirmationOverlay from "$lib/ageconfirmation/AgeConfirmationOverlay.svelte";
    import { scroll_lock_store } from "$lib/scroll";
    import { onDestroy } from "svelte";
    import Footer from "./Footer.svelte";
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

{#if $navigating}
    <NavigatingOverlay />
{/if}
<AgeConfirmationOverlay />
<CookieNotice />
<TopNavBar {user} />
<main class="w-full lg:w-[1100px] lg:p-0 p-4 mx-auto mt-8 mb-8 min-h-[100vh]">
    <slot />
</main>
<Footer />
