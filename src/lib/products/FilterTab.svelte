<script lang="ts">
    import { l } from "$lib/langs";
    import FilterOption from "./FilterOption.svelte";
    import { goto } from "$app/navigation";
    import type { ProductSetFilter } from "./filters";
    import { browser } from "$app/environment";

    export let filters: FilterTabOption[];

    let can_apply = false;

    const apply_filters = () => {
        let url_params = new URLSearchParams(window.location.search);
        for (let i = 0; i < filters.length; ++i) {
            let filt = filters[i];

            // good fucking luck reading this shit
            for (let k = 0; k < filt.options.length; ++k) {
                let o = filt.options[k];

                let url_value = url_params.get(filt.title);
                if (!url_value) {
                    if (!o.selected) continue;

                    url_params.set(filt.title, o.name);
                } else {
                    let url_values = url_value.split("+");
                    if (o.selected) {
                        if (url_values.includes(o.name)) continue;

                        url_values.push(o.name);
                        url_params.set(filt.title, url_values.join("+"));
                    } else {
                        if (!url_values.includes(o.name)) continue;

                        url_values.splice(url_values.indexOf(o.name), 1);
                        if (url_values.length === 0)
                            url_params.delete(filt.title);
                        else url_params.set(filt.title, url_values.join("+"));
                    }
                }
            }
        }

        can_apply = false;
        goto(`?${url_params.toString()}`);
    };
</script>

{#if filters.length > 0}
    <div class="w-full h-max rounded-lg bg-vspot-primary-bg py-2 space-y-1">
        <h1 class="text-lg text-white">{$l("filters.title")}</h1>
        <div class="space-y-1">
            {#each filters as filter}
                <FilterOption
                    {filter}
                    cb={(name) => {
                        const idx = filter.options.findIndex(
                            (s) => s.name === name,
                        );
                        filter.options[idx].selected =
                            !filter.options[idx].selected;

                        can_apply = true;
                    }}
                />
            {/each}
        </div>
        {#if can_apply}
            <button
                class="flex items-center justify-center w-full !mt-2 bg-vspot-purple rounded-lg text-vspot-primary-bg hover:text-vspot-secondary-bg p-1"
                on:click={apply_filters}
            >
                {$l("action.apply")}</button
            >
        {/if}
    </div>
{/if}
