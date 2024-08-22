<script lang="ts">
    import type { InputFieldContext } from "./InputField";

    export let id: string;
    export let label: string;
    export let data: InputFieldContext;
    export let options: string[];

    let working_options: string[];
    $: if (data.value)
        working_options = options.filter((o) =>
            o.toLowerCase().includes(data.value.toLowerCase()),
        );
    else working_options = options;

    $: move_label = data.value.length > 0;

    $: if (data.value && data.error) data.error = undefined;
</script>

<div class="flex flex-col space-y-1 relative w-full">
    <label
        class="absolute {move_label ? 'top-[-8px]' : 'top-[12px]'} {move_label
            ? 'left-[8px]'
            : 'left-[14px]'} text-vspot-text-hovered bg-vspot-primary-bg px-1"
        for={id}>{label}</label
    >
    <select
        class="bg-vspot-primary-bg border {data.error
            ? 'border-vspot-text-error'
            : 'border-vspot-secondary-bg'} rounded-sm h-[37px] px-4"
        name="county"
        id="county"
        bind:value={data.value}
    >
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
    {#if data.error}
        <div class="text-sm leading-[1] text-vspot-text-error">
            {data.error}
        </div>
    {/if}
</div>
