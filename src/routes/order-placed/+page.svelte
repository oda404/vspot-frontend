<script lang="ts">
    import { l } from "$lib/langs";
    import Fa from "svelte-fa";
    import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
    import { browser } from "$app/environment";
    import ProductHorizontalDisplay from "$lib/products/ProductHorizontalDisplay.svelte";

    export let data;

    let order_stage: string | undefined;
    if (data.order) order_stage = "order" + data.order.status;

    let order_id: string | null;

    if (browser)
        order_id = new URLSearchParams(window.location.search).get("order_id");
</script>

{#if data.order}
    <div class="mb-4 flex lg:flex-row space-x-8 items-center">
        <div class="text-6xl font-semibold opacity-80">
            {$l("description.orderthankyou")}
        </div>
        <div class="hidden lg:block">
            <Fa size="lg" scale="2.5" color="#00ff01" icon={faCircleCheck} />
        </div>
    </div>
    <div class="flex flex-col lg:flex-row space-x-1">
        <div class="text-2xl whitespace-nowrap">
            {$l("description.ordernumber")}
        </div>
        <div class="text-xl lg:text-2xl text-vspot-green whitespace-nowrap">
            {data.order.id}
        </div>
    </div>
    <div class="text-lg">
        {$l(`description.${order_stage}`)}
    </div>
    <div class="text-2xl mt-8">
        {$l("description.details")}
    </div>
    <div class="mt-0 space-y-4 divide-y divide-vspot-secondary-bg">
        {#each data.order.products as product}
            <div class="pt-4">
                <ProductHorizontalDisplay
                    show_qty
                    qty={product.qty}
                    large
                    show_discount
                    {product}
                />
            </div>
        {/each}
        <div class="pt-4">
            {$l("description.orderplacedextrainfo")}
            <a class="text-vspot-link" href="/contact"
                >{$l("description.here")}</a
            >
        </div>
    </div>
{:else if order_id}
    <div>
        <div class="mb-14 flex items-center space-x-8">
            <div class="text-6xl font-semibold opacity-80">:(</div>
        </div>
    </div>
    <div class="flex space-x-1">
        <div class="text-2xl">
            {$l("description.ordernumber")}
        </div>
        <div class="text-2xl text-[#dd000a]">
            {order_id}
        </div>
    </div>
    <div class="text-lg">
        {$l("description.badorder")}
    </div>
    <div class="mt-8">
        {$l("easter.badorder")}
    </div>
{/if}
