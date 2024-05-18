<script lang="ts">
    import LanguageSwitch from "./LanguageSwitch.svelte";
    import NavItem from "./NavItem.svelte";
    import SearchBar from "./SearchBar.svelte";
    import { faUser } from "@fortawesome/free-solid-svg-icons";
    import { l } from "./langs";
    import CartNav from "./cart/CartNav.svelte";
    import type { UserDisplayInfo } from "./user/user";
    import Fa from "svelte-fa";
    import ProductsSubmenu from "./nav/ProductsSubmenu.svelte";
    import { beforeNavigate } from "$app/navigation";
    import UserNav from "./user/UserNav.svelte";

    export let user: UserDisplayInfo | undefined;

    let products_submenu_open = false;

    beforeNavigate(() => {
        products_submenu_open = false;
    });
</script>

{#if products_submenu_open}
    <button
        class="fixed z-10 inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] cursor-default"
        on:click={() => {
            products_submenu_open = false;
        }}
    />
{/if}
<div class="!mt-0 z-20 flex space-x-4 lg:h-[160px]">
    <a
        href="/"
        class="min-w-[60px] max-w-[60px] lg:min-w-[160px] lg:max-w-[160px]"
    >
        <img
            src="/images/vspot.webp"
            class="transform lg:rotate-[-15deg] transition-transform"
            alt="V Spot Logo"
        />
    </a>

    <nav
        class="bg-vspot-primary-bg border-2 border-vspot-purple border-opacity-80 z-20 opacity-90 rounded-full space-x-8 px-8 w-full h-[45px] flex items-center drop-shadow-lg"
    >
        <div class="relative z-20">
            <button
                on:click={() => {
                    products_submenu_open = !products_submenu_open;
                }}
            >
                {$l("nav.products")}
            </button>
            {#if products_submenu_open}
                <ProductsSubmenu />
            {/if}
        </div>
        <!-- <SearchBar /> -->
        <div class="!ml-auto" />
        <NavItem text={$l("nav.contact")} only_show_on_lg url="/contact" />
        <LanguageSwitch />
    </nav>

    <div class="h-[45px] flex items-center text-vspot-primary-bg">
        <UserNav {user} />
    </div>
    <div class="h-[45px] flex items-center text-vspot-primary-bg">
        <CartNav />
    </div>
</div>
