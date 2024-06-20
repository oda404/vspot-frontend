<script lang="ts">
    import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import ProductSubmenuItem from "./ProductSubmenuItem.svelte";

    export let on_close_cb: () => void;
    export let options: {
        href: string;
        name: string;
        suboptions: ({ name: string; href: string } | {})[];
    }[];

    let current_selected: string | undefined = undefined;

    $: topname =
        options.find((opt) => opt.href === current_selected)?.name || "Produse";

    $: show_back = topname !== "Produse";
</script>

<div
    role="menu"
    tabindex="0"
    class="z-20 flex flex-col fixed lg:hidden w-[60vw] h-[calc(100vh-20px)] left-[-40px] top-[-10px] p-4 rounded-lg bg-vspot-primary-bg space-y-4"
>
    <div
        class="flex space-x-4 items-center border-b border-vspot-secondary-bg pb-2"
    >
        {#if show_back}
            <button
                on:click={() => {
                    current_selected = undefined;
                }}
            >
                <Fa icon={faArrowLeft} />
            </button>
        {/if}
        <div class="text-xl">
            {topname}
        </div>
        <button class="!ml-auto" on:click={on_close_cb}>
            <Fa icon={faX} />
        </button>
    </div>
    {#each options as option}
        <ProductSubmenuItem
            mobile
            simple
            href={option.href}
            mobile_on_select={(href) => {
                current_selected = href;
            }}
            mobile_hide_if_href_is_not={current_selected}
            mobile_selected={current_selected === option.href}
            suboptions={option.suboptions}
        >
            <span class="hover:text-vspot-text-hovered">
                {option.name}
            </span>
        </ProductSubmenuItem>
    {/each}
    <div class="!mt-auto">
        <a href="/">
            <img class="w-[60px]" alt="VSpot" src="/images/vspot.webp" />
        </a>
    </div>
</div>
