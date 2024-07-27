<script lang="ts">
    import { l } from "$lib/langs";
    import Fa from "svelte-fa";
    import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

    export let data;
</script>

<div class="mb-4 flex lg:flex-row space-x-8 items-center">
    <div class="text-6xl font-semibold">
        {$l("description.orderthankyou")}
    </div>
    <div class="hidden lg:block">
        <Fa size="lg" scale="2.5" color="#00ff01" icon={faCircleCheck} />
    </div>
</div>
<div class="flex flex-col lg:flex-row space-x-1">
    <div class="text-2xl whitespace-nowrap">
        {$l("description.ordernumber")}
    </div>
    <div class="text-xl lg:text-2xl text-vspot-green whitespace-nowrap">
        {data.order_id}
    </div>
</div>
<div class="text-lg">
    {$l(`description.order_registered`)}
</div>
<div class="text-2xl mt-8">
    {$l("description.details")}
</div>
<div class="mt-0 space-y-4 divide-y divide-vspot-secondary-bg">
    <div class="pt-4">
        {$l("description.orderplacedextrainfo")}
        <a class="text-vspot-link" href="/contact">{$l("description.here")}</a>
    </div>
</div>
