<script lang="ts">
    import LayoutMain from "$lib/layout/LayoutMain.svelte";
    import "../app.css";

    export let data;
</script>

<LayoutMain user={data.user}>
    <slot />
</LayoutMain>
