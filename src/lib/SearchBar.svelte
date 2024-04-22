<script lang="js">
    import Fa from "svelte-fa";
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import { l } from "./langs";
</script>

<div class="flex items-center space-x-2 hover:cursor-pointer">
    <Fa icon={faSearch} />
    <div class="hover:text-vspot-text-hovered">{$l("nav.search")}</div>
</div>
