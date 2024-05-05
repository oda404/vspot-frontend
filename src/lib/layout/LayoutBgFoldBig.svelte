<script lang="ts">
    export let rotate: boolean = false;
</script>

<div
    class="
        h-[960px] w-screen scale-150 absolute bg-[linear-gradient(-90deg,theme(colors.vspot-purple),theme(colors.vspot-blue))]
            animate-gradient transition-all {rotate
        ? 'rotate-[-13deg]'
        : ''} z-0 top-[-875px] lg:left-0 drop-shadow-lg
    "
/>
