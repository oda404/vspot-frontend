<script lang="ts">
    import { cart_delete_item, cart_store } from "$lib/cart/cart";
    import { l } from "$lib/langs";
    import LinkButton from "$lib/LinkButton.svelte";
    import type { CartProduct } from "$lib/types";
    import Fa from "svelte-fa";
    import {
        faMinus,
        faPlus,
        faTrashCan,
    } from "@fortawesome/free-solid-svg-icons";
    import { cart_add_item, cart_remove_one_item } from "$lib/cart/cart";
    import { onDestroy } from "svelte";
    import Spinner from "$lib/Spinner.svelte";

    export let data;

    let cart_items: any;
    let cart_item_count = 0;

    let cart_item_total = 0;

    let flash_add = false;
    let flash_add_in_progress = false;

    const update_cart = ($cart: any) => {
        if (!$cart) return;
        cart_items = $cart["items"];
        cart_item_count = 0;
        cart_item_total = 0;
        $cart["items"].forEach((i: CartProduct) => {
            cart_item_count += i.qty;
            cart_item_total += (i.price + i.price_decimals) * i.qty;
        });
    };

    onDestroy(cart_store.subscribe(($cart) => update_cart($cart)));
</script>

<div>
    <h1 class="text-6xl lg:text-8xl font-semibold opacity-80">
        {$l("cart.title")}
    </h1>
    <div class="h-[4px] rounded-full my-2 w-full" />
    <div class="flex w-full space-x-4">
        <div class="w-[70%] p-4 rounded-lg drop-shadow space-y-8">
            {#if cart_item_count}
                {#each cart_items as item}
                    <div
                        class="flex space-x-4 pb-2 border-b border-vspot-secondary-bg"
                    >
                        <a href="/product/{item.id}" class="w-[80px]">
                            <img
                                src={item.preview_image_url}
                                alt={`${item.name} preview`}
                                class="rounded border border-vspot-secondary-bg"
                            />
                        </a>
                        <div class="h-full">
                            <a href="/product/{item.id}" class="text-lg">
                                {item.name}
                            </a>
                            <div class="mt-auto text-xl font-semibold">
                                {item.price * item.qty}.{item.price_decimals}
                                {item.currency}
                            </div>
                        </div>
                        <div class="flex items-center space-x-8 !ml-auto">
                            <button
                                class="flex items-center space-x-2"
                                on:click={() => {
                                    cart_delete_item(item.id);
                                }}
                            >
                                <Fa color="red" icon={faTrashCan} />
                                <div class="text-vspot-text-hovered">
                                    {$l("action.delete")}
                                </div>
                            </button>
                            <div class="flex space-x-2">
                                <button
                                    on:click={() =>
                                        cart_remove_one_item(item.id)}
                                    disabled={item.qty === 1}
                                >
                                    <Fa
                                        color={item.qty === 1
                                            ? "#999999"
                                            : "#FFFFFF"}
                                        icon={faMinus}
                                        size="sm"
                                    />
                                </button>
                                <div class="px-4 bg-vspot-secondary-bg rounded">
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
                {/each}
                <div class="!mt-2 w-full flex justify-center">
                    {#if flash_add_in_progress}
                        <Spinner />
                    {:else}
                        <div
                            class="bg-vspot-secondary-bg rounded-full w-2 h-2"
                        />
                    {/if}
                </div>
            {:else}
                <div class="w-fit space-y-2">
                    <div class="text-xl font-semibold">
                        {$l("description.cartempty")}
                    </div>
                    <LinkButton href="/">
                        <div>{$l("action.backtomainpage")}</div>
                    </LinkButton>
                </div>
            {/if}
        </div>
        {#if cart_item_count}
            <div
                class="w-[30%] h-fit bg-vspot-primary-bg border border-vspot-secondary-bg p-4 rounded-lg drop-shadow space-y-4"
            >
                <div>
                    <div class="text-vspot-text-hovered text-xl">
                        {$l("description.ordersummary")}
                    </div>
                    <div>
                        {$l("description.productcount", { n: cart_item_count })}
                    </div>
                </div>

                <div class="space-y-3">
                    <div
                        class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                    >
                        <div>{$l("description.producttotal")}</div>
                        <div>{cart_item_total} {cart_items[0].currency}</div>
                    </div>
                    <div
                        class="flex justify-between border-b pb-2 border-vspot-secondary-bg"
                    >
                        <div>{$l("description.shipping")}</div>
                        <div>{$l("description.shippingtbd")}</div>
                    </div>
                    <div
                        class="flex justify-between border-b pb-2 border-vspot-secondary-bg !mt-6"
                    >
                        <div>{$l("description.simpletotal")}</div>
                        <div>{cart_item_total} RON</div>
                    </div>
                    <LinkButton
                        href="order-info"
                        bg="bg-vspot-green"
                        color="#242729"
                        ><span class="mx-auto text-vspot-secondary-bg"
                            >{$l("action.shipping")}</span
                        ></LinkButton
                    >
                </div>
            </div>
        {/if}
    </div>
    {#if data.product && !flash_add}
        <div class="mt-8 w-fit">
            <div class="text-2xl">
                {cart_item_count > 0
                    ? $l("description.productreminder")
                    : $l("description.productreminder_noitems")}
            </div>
            <div class="flex space-x-4 p-2 px-0">
                <a href="/product/{data.product.internal_id}" class="w-[80px]">
                    <img
                        src={data.product.image_url}
                        alt={`${data.product.name} preview`}
                        class="rounded border border-vspot-secondary-bg"
                    />
                </a>
                <div class="flex flex-col justify-between">
                    <a
                        href="/product/{data.product.internal_id}"
                        class="text-lg leading-tight"
                    >
                        {data.product.name}
                    </a>
                    <div class="text-xl font-semibold">
                        {data.product.price}.{data.product.price_decimals}
                        {data.product.currency}
                    </div>
                    <button
                        class="rounded w-fit p-1 px-2 bg-vspot-green text-vspot-secondary-bg"
                        on:click={() => {
                            cart_add_item(
                                data.product.internal_id,
                                () => {
                                    flash_add_in_progress = false;
                                },
                                false,
                            );
                            flash_add = true;
                            flash_add_in_progress = true;
                        }}
                    >
                        {$l("action.addtocart")}
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
