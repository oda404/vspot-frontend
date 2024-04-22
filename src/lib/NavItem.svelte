<script lang="ts">
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let text: string | undefined = undefined;
    export let url: string;
    export let only_show_on_lg: boolean = false;

    export let icon: IconDefinition | undefined = undefined;
    export let icon_size: "xs" | "sm" | "lg" | undefined = undefined;
    export let icon_only_show_on_small: boolean = false;

    let hovered = false;
</script>

<a
    href={url}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
    class="flex items-center space-x-2"
>
    {#if icon}
        <Fa
            size={icon_size ? icon_size : "sm"}
            color={hovered ? "#dddddd" : "#ffffff"}
            {icon}
            class={icon_only_show_on_small ? "lg:hidden" : ""}
        />
    {/if}
    {#if text}
        <div
            class="whitespace-nowrap {hovered
                ? 'text-vspot-text-hovered'
                : ''} {only_show_on_lg ? 'hidden lg:inline' : ''}"
        >
            {text}
        </div>
    {/if}
</a>
