<script lang="ts">
    import { l } from "$lib/langs";
    import Fa from "svelte-fa";
    import type { RadioOption } from "./InputRadio";

    export let name: string;
    export let options: RadioOption[];
    export let do_locale: boolean = false;
    export let do_locale_description = false;

    let selected_value = options.find((o) => o.selected)?.value || "";
    $: {
        options.forEach((o) => {
            if (o.value === selected_value) o.selected = true;
            else o.selected = false;
        });
        options = options;
    }
</script>

<div class="space-y-2">
    {#each options as option}
        <label
            class="flex items-center space-x-2 p-2 border border-vspot-secondary-bg rounded-sm"
        >
            <input
                checked={option.selected}
                value={option.value}
                on:change={(e) => {
                    selected_value = e.currentTarget.value;
                }}
                {name}
                type="radio"
            />
            {#if option.icon}
                <div>
                    <Fa icon={option.icon} />
                </div>
            {:else if option.image_url}
                <div
                    class="{option.description
                        ? 'w-[40px]'
                        : 'w-[25px]'} h-full"
                >
                    <img
                        src={option.image_url}
                        alt="{do_locale
                            ? $l(option.display)
                            : option.display} image"
                        class="rounded-lg"
                    />
                </div>
            {/if}
            <div>
                <div>
                    {do_locale ? $l(option.display) : option.display}
                </div>
                {#if option.description}
                    <div>
                        {#if do_locale_description}
                            {#if typeof option.description === "string"}
                                {$l(option.description)}
                            {:else if typeof option.description === "object"}
                                {$l(
                                    option.description.translation,
                                    option.description.args,
                                )}
                            {/if}
                        {:else}
                            {option.description}
                        {/if}
                    </div>
                {/if}
            </div>
        </label>
    {/each}
</div>
