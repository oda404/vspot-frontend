<script lang="ts">
    import Fa from "svelte-fa";
    import type { InputFieldContext } from "./InputField";
    import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";

    export let id: string;
    export let label: string;
    export let data: InputFieldContext;
    export let type: string | undefined = undefined;
    export let disabled = false;

    let focused = false;
    $: move_label = focused || data.value.length > 0;

    const is_password = type === "password";
</script>

<div class="flex flex-col space-y-1 relative w-full">
    <label
        class="absolute px-2 transition-all {move_label
            ? 'top-[-4px]'
            : 'top-[12px]'} {move_label
            ? 'left-[10px]'
            : 'left-[10px]'} {move_label
            ? 'text-sm'
            : ''} text-vspot-text-hovered bg-vspot-primary-bg px-1"
        for={id}>{label}</label
    >
    <input
        {id}
        on:focus={() => {
            focused = true;
            data.error = undefined;
        }}
        on:blur={() => (focused = false)}
        bind:value={data.value}
        spellcheck={false}
        {disabled}
        {...{ type }}
        class="bg-vspot-primary-bg p-2 px-4 w-full rounded-sm border {typeof data.error !==
        'undefined'
            ? 'border-vspot-text-error'
            : 'border-vspot-secondary-bg'}  focus:outline-none"
    />
    {#if is_password}
        <button
            class="absolute top-[12px] right-[12px]"
            type="button"
            tabindex={-1}
            on:click={() => {
                type = type === "password" ? "" : "password";
            }}
        >
            <Fa icon={type === "password" ? faEye : faEyeLowVision} />
        </button>
    {/if}
    {#if data.error}
        <div class="text-sm leading-[1] text-vspot-text-error">
            {data.error}
        </div>
    {/if}
</div>
