<script lang="ts">
    import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { cart_add_item, cart_remove_one_item } from "./cart";
    import { l } from "$lib/langs";
    import { onDestroy, onMount } from "svelte";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";

    export let cart: any;
    export let on_close_cb: () => void;

    $: cart_items = cart["items"];

    $: total = cart_items ? 0 : 0;
    $: for (let i = 0; i < cart_items.length; ++i) {
        total +=
            cart_items[i].qty *
            (cart_items[i].price + cart_items[i].price_decimals);
    }

    onMount(() => {
        scroll_add_lock("cart_preview");
    });
    onDestroy(() => {
        scroll_remove_lock("cart_preview");
    });
</script>

<button
    class="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[100] cursor-default"
    on:click={() => {
        on_close_cb();
    }}
/>
<div
    class="absolute bg-vspot-primary-bg w-[350px] right-[-14px] top-12 p-4 px-4 rounded-lg drop-shadow z-[100] border-vspot-green"
>
    <div class="flex items-center mb-2 justify-between">
        <div class="whitespace-nowrap text-vspot-green text-md">
            {$l("description.yourcart")}
        </div>
        <button
            on:click={() => {
                on_close_cb();
            }}
        >
            <Fa size="sm" icon={faX} />
        </button>
    </div>
    <div class="space-y-2">
        {#if cart_items.length}
            {#each cart_items as item}
                <div class="border-b border-vspot-secondary-bg p-2">
                    <div class="flex space-x-2 items-center">
                        <img
                            src={item.preview_image_url}
                            alt={`${item.name} preview`}
                            class="rounded max-w-[50px] max-h-[50px]"
                        />
                        <div class="w-full">
                            <div class="overflow-hidden">
                                {item.name}
                            </div>
                            <div
                                class="w-full flex text-vspot-text-hovered justify-between space-y-1 items-center"
                            >
                                <div class="text whitespace-nowrap">
                                    {item.price * item.qty}
                                    {item.currency}
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button
                                        on:click={() =>
                                            cart_remove_one_item(item.id)}
                                    >
                                        <Fa icon={faMinus} size="sm" />
                                    </button>
                                    <div
                                        class="px-4 bg-vspot-secondary-bg rounded"
                                    >
                                        {item.qty}
                                    </div>
                                    <button
                                        on:click={() => {
                                            cart_add_item(
                                                item.id,
                                                undefined,
                                                false,
                                            );
                                        }}
                                        disabled={item.qty >= item.stock}
                                    >
                                        <Fa
                                            icon={faPlus}
                                            color={item.qty < item.stock
                                                ? "#FFFFFF"
                                                : "#999999"}
                                            size="sm"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
            <div class="flex justify-between !mt-4">
                <div class="mt-auto">
                    {$l("description.total", {
                        n: `${total} ${cart_items[0].currency}`,
                    })}
                </div>
                <a
                    class="rounded-lg bg-vspot-green text-vspot-secondary-bg px-4 p-1 text-left hover:text-vspot-primary-bg"
                    href="/cart"
                >
                    {$l("description.cartcheckout")}
                </a>
            </div>
        {:else}
            <div class="whitespace-nowrap">{$l("description.cartempty")}</div>
        {/if}
    </div>
</div>
