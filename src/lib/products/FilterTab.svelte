<script lang="ts">
    import FilterOption from "./FilterOption.svelte";
    import { goto } from "$app/navigation";
    import type { ProductFilter } from "./types";

    export let filters: ProductFilter[];

    const set_filter_opt = (filter: ProductFilter, option: string) => {
        filter.options.forEach((opt) => {
            if (opt.name === option) opt.selected = !opt.selected;
            else if (opt.selected) opt.selected = false;
        });
    };

    // FIXME: nothing stops the user from typing in more than one filter option
    const apply_filters = () => {
        let url_params = new URLSearchParams(window.location.search);
        for (let i = 0; i < filters.length; ++i) {
            let filt = filters[i];

            // good fucking luck reading this shit
            for (let k = 0; k < filt.options.length; ++k) {
                let o = filt.options[k];

                let url_value = url_params.get(filt.name);
                if (!url_value) {
                    if (!o.selected) continue;

                    url_params.set(filt.name, o.name);
                } else {
                    let url_values = url_value.split("+");
                    if (o.selected) {
                        if (url_values.includes(o.name)) continue;

                        url_values.push(o.name);
                        url_params.set(filt.name, url_values.join("+"));
                    } else {
                        if (!url_values.includes(o.name)) continue;

                        url_values.splice(url_values.indexOf(o.name), 1);
                        if (url_values.length === 0)
                            url_params.delete(filt.name);
                        else url_params.set(filt.name, url_values.join("+"));
                    }
                }
            }
        }

        goto(`?${url_params.toString()}`);
    };
</script>

{#if filters.length > 0}
    <div class="w-full h-max rounded-lg bg-vspot-primary-bg py-2 space-y-1">
        <div class="space-y-4">
            {#each filters as filter}
                <FilterOption
                    {filter}
                    cb={(name) => {
                        set_filter_opt(filter, name);
                        apply_filters();
                    }}
                />
            {/each}
        </div>
    </div>
{/if}
