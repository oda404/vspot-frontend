<script lang="ts">
    import LanguageSwitch from "./LanguageSwitch.svelte";
    import NavItem from "./NavItem.svelte";
    import SearchBar from "./SearchBar.svelte";
    import { faUser } from "@fortawesome/free-solid-svg-icons";
    import { l } from "./langs";
    import CartNav from "./cart/CartNav.svelte";
</script>

<div class="flex space-x-4 lg:h-[160px]">
    <a href="/" class="mr-5 lg:mr-8">
        <img
            src="/images/vspot.webp"
            class="h-[60px] lg:h-[100%] max-w-[200%] transform lg:rotate-[-15deg] transition-transform"
            alt="V Spot Logo"
        />
    </a>

    <nav
        class="bg-vspot-primary-bg opacity-90 rounded-full lg:space-x-8 px-8 w-full h-[45px] flex items-center drop-shadow-lg"
    >
        <NavItem text={$l("nav.products")} only_show_on_lg url="/explore" />
        <NavItem text={$l("nav.contact")} only_show_on_lg url="/contact" />
        <SearchBar />
        <div class="!ml-auto" />
        <LanguageSwitch />
    </nav>

    <div class="space-x-2 h-[45px] flex items-center text-vspot-primary-bg">
        <NavItem
            icon={faUser}
            icon_size="lg"
            text={$l("nav.login")}
            only_show_on_lg
            url="/login"
        />
    </div>
    <div class="h-[45px] flex items-center text-vspot-primary-bg">
        <CartNav />
    </div>
</div>
