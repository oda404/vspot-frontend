<script lang="ts">
    import { l } from "$lib/langs";
    import type { Address, ContactInfo } from "$lib/orderinfo/orderinfo";

    export let address: Address;
    export let info: ContactInfo;
    export let title: string;
    export let change_url: string | undefined = undefined;
</script>

<div class="p-4 rounded-sm w-full border border-vspot-secondary-bg">
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
    <div class="space-y-1">
        <span class="block text-vspot-text-hovered">
            Nume
            <b>
                {info.lastname}
                {info.firstname}
            </b>
        </span>
        <span class="block text-vspot-text-hovered">
            Telefon <b>{info.phone}</b>
        </span>
        <span class="block text-vspot-text-hovered">
            Judetul <b>{address.county}</b>
        </span>
        <span class="block text-vspot-text-hovered">
            Localitatea <b>{address.city}</b>
        </span>
        <span class="block text-vspot-text-hovered">
            Strada <b>{address.street}</b>
        </span>
        <span
            class="block text-vspot-text-hovered border-b border-vspot-secondary-bg pb-2"
        >
            Cod postal <b>{address.postalcode}</b>
        </span>
        {#if address.house}
            <span class="block pt-1 text-vspot-text-hovered">
                Numarul <b>{address.house.number}</b>
            </span>
        {:else if address.building}
            <span class="block text-vspot-text-hovered pt-1">
                Bloc <b>{address.building.number}</b>
                Scara <b>{address.building.entrance}</b>
            </span>
            <span class="block text-vspot-text-hovered">
                Apartamentul <b>{address.building.apartment}</b>
            </span>
        {/if}
    </div>
</div>
