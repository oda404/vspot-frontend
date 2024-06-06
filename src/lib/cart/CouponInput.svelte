<script lang="ts">
    import { backendv1_coupon_get_info } from "$lib/backendv1/coupon";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import {
        ORDERINFO_STORE,
        orderinfo_set_coupon,
        orderinfo_unset_coupon,
        type Coupon,
    } from "$lib/orderinfo/orderinfo";
    import { onDestroy } from "svelte";

    let current_coupon: Coupon | undefined;
    onDestroy(
        ORDERINFO_STORE.subscribe(($orderinfo) => {
            current_coupon = $orderinfo?.coupon;
        }),
    );

    let coupon_data = new InputFieldContext(current_coupon?.code);

    const validate_and_set_coupon = async () => {
        let new_coupon_code = coupon_data.value;
        if (new_coupon_code === current_coupon?.code) return;

        if (!new_coupon_code) {
            orderinfo_unset_coupon();
            return;
        }

        const coupon_res = await backendv1_coupon_get_info(new_coupon_code);
        if (coupon_res.status >= 400) {
            coupon_data.error = $l(coupon_res.body.msg + ".coupon");
            orderinfo_unset_coupon();
            return;
        }

        const coupon: Coupon = {
            code: new_coupon_code,
            value_perc: coupon_res.body.data!.discount_perc,
        };

        orderinfo_set_coupon(coupon);
    };
</script>

<div class="space-y-1">
    <div class="flex space-x-2 items-center">
        <InputField
            id="coupon"
            label={$l("order.coupon")}
            bind:data={coupon_data}
        />
        <button
            on:click={() => validate_and_set_coupon()}
            class="px-4 p-1 w-fit whitespace-nowrap bg-vspot-green text-vspot-primary-bg"
        >
            {$l("action.apply")}
        </button>
    </div>
    {#if current_coupon}
        <span class="text-vspot-green block">
            Felicitari ai {current_coupon.value_perc}% reducere pentru aceasta
            comanda!
        </span>
    {/if}
</div>
