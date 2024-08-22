<script lang="ts">
    import { l } from "$lib/langs";
    import Fa from "svelte-fa";
    import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

    export let data;
</script>

<div class="mb-4 flex lg:flex-row space-x-8 items-center">
    <span class="text-6xl font-semibold">
        {$l("description.orderthankyou")}
    </span>
    <div class="hidden lg:block">
        <Fa size="lg" scale="2.5" color="#00ff01" icon={faCircleCheck} />
    </div>
</div>
<span class="text-xl whitespace-nowrap pb-4 block">
    Comanda
    <span class="text-xl text-vspot-green whitespace-nowrap">
        #{data.order_id}
    </span>
    a fost inregistrata si vei primi cat de curand un email de confirmare din partea
    noastra!
</span>
<span class="block border-t border-vspot-secondary-bg pt-4">
    Pentru mai multe detalii despre comanda vezi rubrica "Comenzile mele" a
    profilului tau.
</span>
<span class="block">
    Daca ai orice intrebare nu ezita sa ne contactezi <a
        href="/contact"
        class="text-vspot-link">aici</a
    >.
</span>
<a
    href="/"
    class="px-4 p-2 bg-vspot-green text-vspot-primary-bg rounded-tl-lg rounded-br-lg mt-2 block w-fit"
    >Inapoi la pagina principala</a
>
