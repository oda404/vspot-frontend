<script lang="ts">
    import { page } from "$app/stores";
</script>

<div
    class="text-8xl font-semibold opacity-80 flex items-center justify-center text-vspot-text-error"
>
    {$page.status}: {$page.error.message}
</div>
