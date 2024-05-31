<script lang="ts">
    import LinkButton from "$lib/LinkButton.svelte";
    import { l } from "$lib/langs";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";
    import { faXmark } from "@fortawesome/free-solid-svg-icons";
    import { Fa } from "svelte-fa";

    export let show: boolean;
    export let on_close_cb: any;
    export let item: any;
    export let stock_error: boolean;

    $: if (show) scroll_add_lock("cart_overlay");
    else scroll_remove_lock("cart_overlay");
</script>

{#if show}
    <div
        class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[100] overflow-y-hidden"
    >
        <div class="h-full flex justify-center items-center drop-shadow-lg">
            <div
                class="bg-vspot-primary-bg p-4 max-w-[400px] rounded-lg space-y-2"
            >
                {#if !stock_error}
                    <div class="flex items-center">
                        <div class="text-vspot-text-hovered">
                            {$l("description.addedtocart")}
                        </div>
                        <button class="ml-auto" on:click={on_close_cb}>
                            <Fa size="lg" color="#dddddd" icon={faXmark} />
                        </button>
                    </div>
                    <div class="flex space-x-4">
                        <img
                            src={item.preview_image_url}
                            alt={`${item.name} preview`}
                            class="h-[60px] drop-shadow rounded"
                        />
                        <div>
                            <div>
                                {item.name}
                            </div>
                            <span
                                class="block text-lg font-semibold leading-tight"
                            >
                                {item.price - item.discount}.00
                                {item.currency}
                            </span>
                            <span class="line-through">
                                {item.price}.00
                                {item.currency}
                            </span>
                        </div>
                    </div>
                    <div class="flex space-x-16">
                        <button
                            on:click={on_close_cb}
                            class="text-vspot-green mt-auto"
                        >
                            {$l("action.continueshopping")}
                        </button>
                        <div class="!ml-auto" />
                        <a
                            class="px-4 bg-vspot-green rounded-lg text-vspot-primary-bg p-1"
                            href="/cart"
                        >
                            {$l("action.seecart")}
                        </a>
                    </div>
                {:else}
                    <div class="flex items-center">
                        <div class="text-vspot-text-hovered">
                            {$l("description.notaddedtocart")}
                        </div>
                        <button class="ml-auto" on:click={on_close_cb}>
                            <Fa size="lg" color="#dddddd" icon={faXmark} />
                        </button>
                    </div>
                    <div class="flex items-center">
                        <div>
                            {$l("description.cartlimithit")}
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <button on:click={on_close_cb} class="text-vspot-green">
                            {$l("action.continueshopping")}
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
