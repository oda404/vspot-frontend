<script lang="ts">
    import { l } from "$lib/langs";

    export let title: string;
    export let specs: { name: string; value: string[] }[];
    export let localization_prefix: string;
</script>

<table class="w-full !mt-4 border border-vspot-secondary-bg">
    <tr>
        <th class="py-4 pl-4 pb-0 text-start font-bold">{title}</th>
    </tr>
    {#each specs as spec}
        <tr>
            <td class="pl-4 py-4">
                {$l(`spec.${spec.name}`)}
            </td>
            <td class="py-4 pr-4 text-right">
                {#if spec.value.length === 1}
                    {$l(`${localization_prefix}.${spec.value}`)}
                {:else}
                    <ul>
                        {#each spec.value as value}
                            <li class="list-none">
                                {$l(`${localization_prefix}.${value}`)}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </td>
        </tr>
    {/each}
</table>

<style lang="postcss">
    td:first-child {
        @apply border-b;
        @apply border-vspot-secondary-bg;
    }
    td:last-child {
        @apply border-b;
        @apply border-vspot-secondary-bg;
    }
    tr:last-child > td:first-child,
    tr:last-child > td:last-child {
        @apply border-b-0;
    }
</style>
