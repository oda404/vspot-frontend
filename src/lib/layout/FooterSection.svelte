<script lang="ts">
    export let title: string;
</script>

<div class="flex flex-col lg:items-start space-y-1">
    <span class="font-semibold text-xl mb-2 text-white">{title}</span>
    <slot />
</div>
