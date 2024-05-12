<script lang="ts">
    export let active: boolean;
    export let text: string;
    export let on_click: () => void;
</script>

<div class="flex space-x-1">
    {#if active}
        <div class="w-[4px] my-[2px] bg-vspot-green rounded-lg" />
    {/if}
    <button
        on:click={on_click}
        class="block text-left px-4 p-2 w-full rounded-lg whitespace-nowrap
        {active ? 'bg-vspot-secondary-bg' : ''}"
    >
        {text}
    </button>
</div>
