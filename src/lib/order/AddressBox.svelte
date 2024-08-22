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
        <span class="block">
            Nume
            <b>
                {info.lastname}
                {info.firstname}
            </b>
        </span>
        <span class="block">
            Telefon <b>{info.phone}</b>
        </span>
        <span class="block">
            Judetul <b>{address.county}</b> - Localitatea <b>{address.city}</b>
        </span>
        <span class="block">
            Strada <b>{address.street} -</b>
            {#if address.house}
                Numarul <b>{address.house.number}</b>
            {:else if address.building}
                Bloc <b>{address.building.number}</b> - Scara
                <b>{address.building.entrance}</b> - Apartamentul
                <b>{address.building.apartment}</b>
            {/if}
        </span>
    </div>
</div>
