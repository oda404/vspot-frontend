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
        <div class="bg-vspot-primary-bg p-12 max-w-[450px] relative">
            <img
                class="max-w-[200px] mb-8 mx-auto"
                src="/images/18plus.webp"
                alt="18+"
            />

            <span class="text-lg block">
                {$l("age.notice")}
            </span>
            <div class="flex justify-center space-x-4">
                <button
                    class="w-full bg-vspot-green p-2 px-4 text-vspot-primary-bg mt-4"
                    on:click={() =>
                        ageconfirmation_store_set(ageconfirmation_minimum_age)}
                    >{$l("age.confirmok", {
                        age: ageconfirmation_minimum_age,
                    })}</button
                >
                <a
                    class="w-full bg-vspot-text-error p-2 px-4 rounded-tl-lg rounded-br-lg text-vspot-text-pimary mt-4 text-center"
                    href="https://ro.wikipedia.org/wiki/Penitenciarul_Slobozia"
                    >{$l("age.confirm_not_ok", {
                        age: ageconfirmation_minimum_age,
                    })}</a
                >
            </div>
        </div>
    </div>
{/if}
