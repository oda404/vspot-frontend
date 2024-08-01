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
        class="fixed rounded-none left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[10] cursor-default"
        on:click={() => {
            products_submenu_open = false;
            search_bar_open = false;
        }}
    />
{/if}

<div
    class="absolute inset-0 w-full bg-vspot-primary-bg/90 !mt-0 z-20 flex items-center lg:space-x-4 h-fit"
>
    <nav class="mx-auto w-full z-10 items-center py-8 px-16 space-y-4">
        <div class="flex items-center space-x-8">
            <SearchBar bind:open={search_bar_open} />
            <a
                href="/"
                class="min-w-[130px] max-w-[130px] z-[8] hover:filter-none !mx-auto"
            >
                <img src="/images/vspot_flat.webp" class="" alt="V Spot Logo" />
            </a>
            <div class="h-[45px] flex items-center">
                <UserNav {user} />
            </div>
            <div class="h-[45px] flex items-center">
                <CartNav />
            </div>
        </div>
        <div class="z-20 flex items-center justify-center space-x-24 py-4">
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
            <!-- <LanguageSwitch /> -->
        </div>
    </nav>
</div>
