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
        class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10 overflow-y-hidden"
    >
        <div class="h-full flex justify-center items-center drop-shadow-lg">
            <div
                class="bg-vspot-primary-bg p-4 max-w-[400px] rounded-lg space-y-4"
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
                    <div class="flex space-x-4 items-center">
                        <img
                            src={item.preview_image_url}
                            alt={`${item.name} preview`}
                            class="w-[40px] drop-shadow border border-vspot-secondary-bg rounded"
                        />
                        <div class="text-lg">
                            {item.name}
                        </div>
                        <div class="mx-4" />
                        <div class="text-xl !ml-auto whitespace-nowrap">
                            <div class="ml-auto">
                                {item.price}
                                {item.currency}
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <button on:click={on_close_cb} class="text-vspot-green">
                            {$l("action.continueshopping")}
                        </button>
                        <div class="!ml-auto" />
                        <LinkButton href="/cart"
                            ><div>{$l("action.seecart")}</div></LinkButton
                        >
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
                        <div class="text-lg">
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
