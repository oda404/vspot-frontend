<script lang="ts">
    import {
        backendv1_order_cancel,
        backendv1_order_complete,
        backendv1_order_confirm,
        backendv1_order_delete,
        backendv1_order_ship,
        type V1ServerOrder,
    } from "$lib/backendv1/order";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let order: V1ServerOrder;

    let shipping_number_ctx = new InputFieldContext(
        order.shipping_tracking_number,
    );
    shipping_number_ctx.validate = (value: string) => {
        if (value.length === 0)
            return $l("order.admin.missing_shipping_number");
    };
</script>

<div class="space-y-2">
    <div class="flex w-full space-x-4">
        {#if order.status !== "canceled"}
            {#if order.status !== "completed"}
                <button
                    disabled={order.status !== "registered"}
                    class="px-4 p-2 bg-vspot-green text-vspot-primary-bg w-full h-fit disabled:bg-vspot-green/60"
                    on:click={async () => {
                        await backendv1_order_confirm(order.id);
                        window.location.reload();
                    }}
                >
                    Confirma
                </button>
            {/if}
            <div class="w-full space-y-2">
                {#if order.status !== "completed"}
                    <button
                        disabled={order.status !== "confirmed"}
                        class="px-4 p-2 bg-vspot-green text-vspot-primary-bg w-full disabled:bg-vspot-green/60 text-nowrap"
                        on:click={async () => {
                            const has_error =
                                shipping_number_ctx.do_validate() !== undefined;
                            shipping_number_ctx = shipping_number_ctx;

                            if (has_error) return;

                            await backendv1_order_ship(
                                order.id,
                                shipping_number_ctx.value,
                            );
                            window.location.reload();
                        }}
                    >
                        In transport
                    </button>
                {/if}
                <InputField
                    id="shipping_number"
                    label={$l("order.admin.shipping_number")}
                    data={shipping_number_ctx}
                    disabled={order.status !== "confirmed"}
                />
            </div>
            {#if order.status !== "completed"}
                <button
                    disabled={order.status !== "shipped"}
                    class="px-4 p-2 bg-vspot-green text-vspot-primary-bg w-full h-fit disabled:bg-vspot-green/60"
                    on:click={async () => {
                        await backendv1_order_complete(order.id);
                        window.location.reload();
                    }}
                >
                    Finalizeaza
                </button>
            {/if}
        {/if}
        {#if order.status !== "completed"}
            <button
                disabled={order.status !== "registered"}
                class="px-4 p-2 bg-vspot-secondary-bg w-full disabled:bg-vspot-secondary-bg/60 h-fit disabled:text-vspot-text-pimary/60"
                on:click={async () => {
                    await backendv1_order_cancel(order.id);
                    window.location.reload();
                }}
            >
                Anuleaza
            </button>
        {/if}
        <button
            on:click={async () => {
                await backendv1_order_delete(order.id);
                window.location.reload();
            }}
            class="px-4 p-3 bg-vspot-text-error h-fit text-nowrap"
        >
            <Fa icon={faTrashCan} />
        </button>
    </div>
    <span class="block">
        Email: <b>{order.email}</b>
    </span>
</div>
