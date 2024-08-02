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
    let search_bar_open = false;

    beforeNavigate(() => {
        products_submenu_open = false;
        search_bar_open = false;
    });
</script>

{#if products_submenu_open || search_bar_open}
    <button
        class="fixed rounded-none left-0 top-0 w-full h-full z-[10] cursor-default"
        on:click={() => {
            products_submenu_open = false;
            search_bar_open = false;
        }}
    />
{/if}

<nav
    class="absolute inset-0 w-full lg:py-8 z-[20] px-4 lg:px-16 space-y-8 lg:space-x-4 h-fit"
>
    <div class="hidden lg:flex items-center space-x-8">
        <SearchBar bind:open={search_bar_open} />
        <div class="!mx-auto" />
        <a href="/" class="min-w-[130px] max-w-[130px] z-[8] hover:filter-none">
            <img src="/images/vspot_flat.webp" class="" alt="V Spot Logo" />
        </a>
        <div class="!mx-auto" />

        <div class="h-[45px] flex items-center !ml-auto">
            <UserNav {user} />
        </div>
        <div class="h-[45px] flex items-center">
            <CartNav />
        </div>
    </div>
    <div class="lg:hidden space-y-8">
        <div class="flex items-center space-x-8">
            <a
                href="/"
                class="min-w-[90px] max-w-[90px] z-[8] hover:filter-none"
            >
                <img src="/images/vspot_flat.webp" class="" alt="V Spot Logo" />
            </a>
            <div class="h-[45px] flex items-center !ml-auto">
                <UserNav {user} />
            </div>
            <div class="h-[45px] flex items-center">
                <CartNav />
            </div>
        </div>
        <SearchBar bind:open={search_bar_open} />
    </div>
    <div class="z-20 hidden lg:flex items-center space-x-24 justify-center">
        <NavItem url="/disposable" text={$l("product.disposables")} />
        <NavItem url="/liquid" text={$l("product.liquids")} />
        <NavItem url="/smoking" text={$l("product.smoking")} />
        <NavItem url="/pouch" text={$l("product.pouches")} />
        <NavItem url="/kit" text={$l("product.kits")} />
    </div>
</nav>
