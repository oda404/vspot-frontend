<script lang="ts">
    export let _class: string | undefined = undefined;
</script>

<div
    class="p-4 h-[44px] w-[44px] rounded-full {_class} flex items-center justify-center"
>
    <slot />
</div>
