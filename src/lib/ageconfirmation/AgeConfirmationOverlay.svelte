<script lang="ts">
    import { onDestroy } from "svelte";
    import {
        ageconfirmation_minimum_age,
        ageconfirmation_store,
        ageconfirmation_store_set,
    } from "./ageconfirmation";
    import { l } from "$lib/langs";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";
    import { browser } from "$app/environment";

    let age = 0;
    onDestroy(
        ageconfirmation_store.subscribe(($age) => {
            if (browser) age = $age;
        }),
    );

    $: if (age < ageconfirmation_minimum_age) scroll_add_lock("age");
    else scroll_remove_lock("age");
</script>

{#if browser && age < ageconfirmation_minimum_age}
    <div
        class="fixed flex z-[100] top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] hideScroll justify-center items-center"
    >
        <div class="hidden">te-a dus capul sa ajungi aici</div>
        <div
            class="bg-vspot-primary-bg p-4 rounded-lg overflow-hidden max-w-[300px] relative"
        >
            <img
                src="/images/vspot.webp"
                alt="VSpot logo"
                class="w-[80px] absolute z-0 right-[-6%] top-[-6%] rotate-[15deg] opacity-15"
            />
            <span class="text-lg block">
                {$l("age.confirmation", { n: ageconfirmation_minimum_age })}
            </span>
            <span class="text-vspot-text-hovered">
                {$l("age.description", { n: ageconfirmation_minimum_age })}
            </span>
            <div class="flex space-x-4">
                <a
                    class="w-full bg-vspot-text-error p-2 rounded-full text-vspot-text-pimary mt-4 text-center"
                    href="https://ro.wikipedia.org/wiki/Penitenciarul_Slobozia"
                    >{$l("action.no")}</a
                >
                <button
                    class="w-full bg-vspot-green p-2 rounded-full text-vspot-primary-bg mt-4"
                    on:click={() =>
                        ageconfirmation_store_set(ageconfirmation_minimum_age)}
                    >{$l("action.yes")}</button
                >
            </div>
        </div>
    </div>
{/if}
