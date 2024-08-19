<script lang="ts">
    import type { V1ServerOrder } from "$lib/backendv1/order";
    import { l } from "$lib/langs";
    import OrderPlacedInfo from "$lib/order/OrderPlacedInfo.svelte";
    import CouponRegister from "$lib/portal/CouponRegister.svelte";

    export let data;

    let orders: V1ServerOrder[] = data.orders.orders;
</script>

<div class="space-y-8 divide-y divide-vspot-secondary-bg w-full">
    <h1 class="text-6xl font-semibold opacity-100">
        PORTAn :3
    </h1>
    <CouponRegister />
    <div class="pt-2">
        <h1>Comenzi</h1>
        {#if orders.length === 0}
            <span class="text-lg">
                {$l("order.admin.no_orders")}
            </span>
        {/if}
        <div class="divide-y divide-vspot-secondary-bg">
            {#each orders as order}
                <div class="py-4">
                    <OrderPlacedInfo {order} show_admin_controls />
                </div>
            {/each}
        </div>
    </div>
</div>
