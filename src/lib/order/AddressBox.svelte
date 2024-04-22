<script lang="ts">
    import { l } from "$lib/langs";
    import type { Address, ContactInfo } from "$lib/orderinfo/orderinfo";

    export let address: Address;
    export let info: ContactInfo;
    export let title: string;
    export let change_url: string;
</script>

<div
    class="p-4 rounded-lg w-full bg-vspot-primary-bg border border-vspot-secondary-bg"
>
    <div class="flex justify-between">
        <div class="text-lg text-vspot-text-hovered">
            {title}
        </div>
        <a class="text-vspot-text-hovered" href={change_url}
            >{$l("action.change")}</a
        >
    </div>
    <div>
        <div>
            {info.lastname}
            {info.firstname} |
            {info.phone}
        </div>
        <div>
            {address.county},
            {address.city}
        </div>
        <div>
            {address.address},
            {address.postalcode}
        </div>
    </div>
</div>
