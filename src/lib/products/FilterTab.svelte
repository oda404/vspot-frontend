<script lang="ts">
    import { l } from "$lib/langs";
    import FilterOption from "./FilterOption.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let filters: FilterTabOption[];

    let url_filters = structuredClone(filters);
    /* may god have mercy. This code sets filters based on the URL search query */
    $: $page.url.searchParams.forEach((v, k) => {
        let values = v.split("+");
        values.forEach((val) => {
            for (let i = 0; i < url_filters.length; ++i) {
                if (url_filters[i].title === k) {
                    for (let k = 0; k < url_filters[i].options.length; ++k) {
                        if (url_filters[i].options[k].name === val)
                            url_filters[i].options[k].selected = true;
                    }
                }
            }
        });
        filters = url_filters;
    });

    let initial_filters = structuredClone(filters);

    let can_apply = false;

    $: {
        let changed = false;

        for (let i = 0; i < filters.length; ++i) {
            let filt1 = filters[i];
            let filt2 = initial_filters[i];

            for (let k = 0; k < filt1.options.length; ++k) {
                if (filt1.options[k].selected !== filt2.options[k].selected)
                    changed = true;
            }

            if (changed) break;
        }

        can_apply = changed;
    }

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
        initial_filters = structuredClone(filters);
        goto(`?${url_params.toString()}`);
    };
</script>

<div class="w-full h-max bg-vspot-primary-bg rounded-xl py-2 px-4 space-y-1">
    <h1 class="text-lg text-vspot-text-hovered">{$l("filters.title")}</h1>
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
