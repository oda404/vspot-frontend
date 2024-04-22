<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faChevronDown,
        faSquareCheck,
        faSquare,
    } from "@fortawesome/free-solid-svg-icons";
    import { l } from "$lib/langs";

    export let filter: FilterTabOptionSelectable;
    export let cb: (name: string) => void;

    let expanded = false;
    let toggle_expanded = () => {
        expanded = !expanded;
    };
</script>

<div>
    <button class="flex items-center space-x-2" on:click={toggle_expanded}>
        <div>
            {$l(`filter.${filter.title}`)}
        </div>
        <Fa
            class="{expanded
                ? 'transform -rotate-180'
                : ''} transition ease-out duration-250"
            icon={faChevronDown}
        />
    </button>
    {#if expanded}
        <div>
            {#each filter.options as selectable}
                <button
                    class="flex items-center text-vspot-text-pimary space-x-2 ml-2"
                    on:click={() => {
                        cb(selectable.name);
                    }}
                >
                    <Fa icon={selectable.selected ? faSquareCheck : faSquare} />
                    <div>
                        {$l(`filteropt.${selectable.name}`)}
                    </div>
                </button>
            {/each}
        </div>
    {/if}
</div>
