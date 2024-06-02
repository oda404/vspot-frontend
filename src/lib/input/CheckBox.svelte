<script lang="ts">
    import { faCheck } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let selected: boolean;
</script>

<div class="size-[15px] rounded border border-vspot-secondary-bg">
    {#if selected}
        <Fa color="#00ff01" icon={faCheck} />
    {/if}
</div>
