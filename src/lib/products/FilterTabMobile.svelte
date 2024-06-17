<script lang="ts">
    import { goto } from "$app/navigation";
    import Fa from "svelte-fa";
    import FilterOption from "./FilterOption.svelte";
    import type { ProductFilter } from "./types";
    import { faX } from "@fortawesome/free-solid-svg-icons";

    export let on_close_cb: () => void;
    export let filters: ProductFilter[];

    const set_filter_opt = (filter: ProductFilter, option: string) => {
        filter.options.forEach((opt) => {
            if (opt.name === option) opt.selected = !opt.selected;
            else if (opt.selected) opt.selected = false;
        });
    };

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

        on_close_cb();
        goto(`?${url_params.toString()}`);
    };
</script>

<button
    class="fixed rounded-none left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[10] cursor-default"
    on:click={on_close_cb}
/>

<div
    role="menu"
    tabindex="0"
    class="z-20 flex flex-col fixed lg:hidden w-[60vw] h-[calc(100vh-20px)] left-[10px] top-[10px] p-4 rounded-lg bg-vspot-primary-bg space-y-4"
>
    <div
        class="flex items-center justify-between border-b border-vspot-secondary-bg pb-2"
    >
        <span class="text-lg">Filtre</span>
        <button on:click={on_close_cb}>
            <Fa icon={faX} />
        </button>
    </div>
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
