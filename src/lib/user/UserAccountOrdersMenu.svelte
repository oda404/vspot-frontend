<script lang="ts">
    import type { V1ServerOrder } from "$lib/backendv1/order";
    import { l } from "$lib/langs";
    import OrderPlacedInfo from "$lib/order/OrderPlacedInfo.svelte";

    export let orders: V1ServerOrder[];
</script>

<div class="space-y-8 divide-vspot-secondary-bg w-full">
    {#if orders.length === 0}
        <span class="text-lg">
            {$l("order.no_orders")}
        </span>
    {/if}
    <div class="divide-y divide-vspot-secondary-bg">
        {#each orders as order}
            <div class="py-4">
                <OrderPlacedInfo {order} />
            </div>
        {/each}
    </div>
</div>
