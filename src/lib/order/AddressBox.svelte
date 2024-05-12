<script lang="ts">
    import { l } from "$lib/langs";
    import type { Address, ContactInfo } from "$lib/orderinfo/orderinfo";

    export let address: Address;
    export let info: ContactInfo;
    export let title: string;
    export let change_url: string | undefined = undefined;
</script>

<div
    class="p-4 rounded-lg w-full bg-vspot-primary-bg border border-vspot-secondary-bg"
>
    <div class="flex justify-between">
        <span class="text-lg text-vspot-text-hovered">
            {title}
        </span>
        {#if change_url}
            <a class="text-vspot-text-hovered" href={change_url}
                >{$l("action.change")}</a
            >
        {/if}
    </div>
    <div>
        <span class="block">
            {info.lastname}
            {info.firstname} |
            {info.phone}
        </span>
        <span class="block">
            {address.county},
            {address.city}
        </span>
        <span class="block">
            {address.address},
            {address.postalcode}
        </span>
    </div>
</div>
