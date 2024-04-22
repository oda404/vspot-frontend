<script lang="ts">
    import { goto } from "$app/navigation";
    import ProgressBubble from "$lib/ProgressBubble.svelte";
    import { l } from "$lib/langs";

    export let stage: number;
</script>

<div class=" flex justify-between">
    <button
        on:click={() => {
            goto("/order-info");
        }}
        class="flex flex-col items-center"
        disabled={stage === 1}
    >
        <ProgressBubble
            _class="{stage === 1
                ? 'border-2 border-vspot-green'
                : ''} bg-vspot-primary-bg"
            ><div class="font-bold">1</div></ProgressBubble
        >
        <div class="font-bold text-lg whitespace-nowrap">
            {$l("order.info")}
        </div>
    </button>
    <div
        class="{stage > 1
            ? 'bg-vspot-green'
            : 'bg-vspot-primary-bg'} h-[2px] w-full mt-5"
    />
    <button
        on:click={() => {
            goto("/order-shipping");
        }}
        class="flex flex-col items-center"
        disabled={stage < 3}
    >
        <ProgressBubble
            _class="{stage === 2
                ? 'border-2 border-vspot-green'
                : ''} bg-vspot-primary-bg"
            ><div class="font-bold">2</div></ProgressBubble
        >
        <div class="font-bold text-lg whitespace-nowrap">
            {$l("order.shipping")}
        </div>
    </button>
    <div
        class="{stage > 2
            ? 'bg-vspot-green'
            : 'bg-vspot-primary-bg'} h-[2px] w-full mt-5"
    />
    <button class="flex flex-col items-center" disabled>
        <ProgressBubble
            _class="{stage === 3
                ? 'border-2 border-vspot-green'
                : ''} bg-vspot-primary-bg"
            ><div class="font-bold">3</div></ProgressBubble
        >
        <div class="font-bold text-lg whitespace-nowrap">
            {$l("order.send")}
        </div>
    </button>
</div>
