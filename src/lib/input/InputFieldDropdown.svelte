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

    let focused = false;
    let dropdown_open = false;
    $: move_label = focused || data.value.length > 0;
</script>

<div class="flex flex-col space-y-1 relative w-full">
    <label
        class="absolute {move_label ? 'top-[-8px]' : 'top-[12px]'} {move_label
            ? 'left-[8px]'
            : 'left-[14px]'} text-vspot-text-hovered bg-vspot-primary-bg px-1"
        for={id}>{label}</label
    >
    <input
        {id}
        on:focus={() => {
            focused = true;
            dropdown_open = true;
            data.error = undefined;
        }}
        on:blur={() => (focused = false)}
        bind:value={data.value}
        spellcheck={false}
        class="bg-vspot-primary-bg p-2 px-4 w-full rounded-md border {data.error
            ? 'border-vspot-text-error'
            : 'border-vspot-secondary-bg'} focus:border-vspot-green focus:outline-none"
    />
    {#if dropdown_open}
        <button
            class="fixed w-full h-full top-0 left-0"
            on:click={() => {
                dropdown_open = false;
            }}
        />
        <div
            class="absolute w-full top-[40px] z-10 max-h-[200px] overflow-y-scroll bg-vspot-primary-bg rounded-lg border border-vspot-green"
        >
            {#each working_options as option}
                <button
                    class="p-2 px-4 block w-full text-left hover:bg-vspot-secondary-bg"
                    on:click={() => {
                        data.value = option;
                        dropdown_open = false;
                    }}>{option}</button
                >
            {/each}
        </div>
    {/if}
    {#if data.error}
        <div class="text-sm text-vspot-text-error">{data.error}</div>
    {/if}
</div>
