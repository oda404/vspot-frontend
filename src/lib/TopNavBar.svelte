<script lang="ts">
    import LanguageSwitch from "./LanguageSwitch.svelte";
    import NavItem from "./NavItem.svelte";
    import SearchBar from "./SearchBar.svelte";
    import { l } from "./langs";
    import CartNav from "./cart/CartNav.svelte";
    import type { UserDisplayInfo } from "./user/user";
    import ProductsSubmenu from "./nav/ProductsSubmenu.svelte";
    import { beforeNavigate } from "$app/navigation";
    import UserNav from "./user/UserNav.svelte";
    import { faBars } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let user: UserDisplayInfo | undefined;

    let products_submenu_open = false;

    beforeNavigate(() => {
        products_submenu_open = false;
    });
</script>

{#if products_submenu_open}
    <button
        class="fixed rounded-none left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[10] cursor-default"
        on:click={() => {
            products_submenu_open = !products_submenu_open;
        }}
    />
{/if}

<div
    class="max-w-[1100px] min-w-[1100px] w-[1100px] !mt-0 z-20 flex items-start lg:space-x-4 lg:h-[160px]"
>
    <a
        href="/"
        class="hidden lg:block left-[-2%] top-[-20px] lg:left-0 lg:top-0 lg:relative min-w-[140px] max-w-[140px] z-[8]"
    >
        <img src="/images/vspot.webp" class="mt-14" alt="V Spot Logo" />
    </a>
    <nav class="flex w-full lg:w-[1100px] z-10 space-x-4 fixed items-center">
        <div
            class="w-[calc(100%-100px)] bg-vspot-primary-bg border-2 border-vspot-purple border-opacity-80 z-20 opacity-100 rounded-full space-x-8 px-8 h-[45px] flex items-center drop-shadow-lg"
        >
            <button
                on:click={() => {
                    products_submenu_open = !products_submenu_open;
                }}
            >
                <Fa icon={faBars} />
            </button>
            {#if products_submenu_open}
                <ProductsSubmenu
                    on_close_cb={() => (products_submenu_open = false)}
                />
            {/if}
            <SearchBar />
            <div class="!ml-auto" />
            <NavItem
                only_show_on_lg
                url="/disposable"
                text={$l("product.disposables")}
            />
            <NavItem
                only_show_on_lg
                url="/liquid"
                text={$l("product.liquids")}
            />
            <NavItem
                only_show_on_lg
                url="/smoking"
                text={$l("product.smoking")}
            />
            <NavItem
                only_show_on_lg
                url="/pouch"
                text={$l("product.pouches")}
            />
            <NavItem only_show_on_lg url="/kit" text={$l("product.kits")} />
            <LanguageSwitch />
        </div>
        <div class="h-[45px] flex items-center">
            <UserNav {user} />
        </div>
        <div class="h-[45px] flex items-center">
            <CartNav />
        </div>
    </nav>
</div>
