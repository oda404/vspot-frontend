<script lang="ts">
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import Fa, { type IconSize } from "svelte-fa";

    export let fg: string;
    export let scale: number | undefined = undefined;
</script>

<Fa scale={scale || 1} class="animate-spin" color={fg} icon={faSpinner} />
