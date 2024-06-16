<script lang="ts">
    import Fa from "svelte-fa";

    export let icon: any = undefined;
    export let icons: any = undefined;
    export let img_url: string | undefined = undefined;
    export let title: string;
    export let description: string;
</script>

<div class="flex flex-col p-4 space-y-1">
    {#if icon}
        <Fa size="lg" {icon} />
    {:else if icons}
        <div class="flex justify-center space-x-4">
            {#each icons as ic}
                <Fa size="lg" icon={ic} />
            {/each}
        </div>
    {:else if img_url}
        <img
            src={img_url}
            alt="Statisfactie maxima"
            class="w-[28px] -mb-2 mx-auto"
        />
    {/if}
    <span class="text-lg font-bold mx-auto">{title}</span>
    <span class="max-w-[210px] mx-auto text-center">{description}</span>
    <slot />
</div>
