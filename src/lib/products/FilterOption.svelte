<script lang="ts">
    import { l } from "$lib/langs";
    import CheckBox from "$lib/input/CheckBox.svelte";

    export let filter: {
        name: string;
        options: { name: string; selected: boolean }[];
    };

    export let cb: (name: string) => void;
</script>

<div>
    <span class="text-lg font-semibold">
        {$l(`filter.${filter.name}`)}
    </span>
    <div class="space-y-[1px]">
        {#each filter.options as selectable}
            <button
                class="flex items-center text-vspot-text-pimary space-x-2"
                on:click={() => {
                    cb(selectable.name);
                }}
            >
                <CheckBox selected={selectable.selected} />
                <span class="">
                    {$l(`filteropt.${selectable.name}`)}
                </span>
            </button>
        {/each}
    </div>
</div>
