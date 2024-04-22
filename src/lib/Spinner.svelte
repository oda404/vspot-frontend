<script lang="ts">
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let fg: string;
</script>

<Fa class="animate-spin" color={fg} icon={faSpinner} />
