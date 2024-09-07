<script lang="ts">
    import NavItem from "./NavItem.svelte";
    import SearchBar from "./SearchBar.svelte";
    import { l } from "./langs";
    import CartNav from "./cart/CartNav.svelte";
    import type { UserDisplayInfo } from "./user/user";
    import { beforeNavigate } from "$app/navigation";
    import UserNav from "./user/UserNav.svelte";

    export let user: UserDisplayInfo | undefined;

    let search_bar_open = false;

    beforeNavigate(() => {
        search_bar_open = false;
        nav_hovered = false;
        activate_submenu = undefined;
    });

    let nav_hovered = false;
    let activate_submenu: string | undefined = undefined;

    $: if (!nav_hovered) activate_submenu = undefined;

    $: active_options = options.find((opt) => opt.name === activate_submenu)!;

    let options = [
        {
            href: "/disposable",
            name: $l("product.disposable"),
            categories: [
                {
                    name: "Vozol Switch Pro",
                    href: "/disposable?subtype=switchpro",
                    options: [
                        {
                            name: "Dispozitive",
                            href: "/disposable?subtype=switchpro&reusable=true",
                        },
                        {
                            name: "Pod-uri",
                            href: "/disposable?subtype=switchpro&cartridge=true",
                        },
                    ],
                },
                {
                    name: "SKE Crystal 4-in-1",
                    href: "/disposable?subtype=crystal4in1",
                    options: [
                        {
                            name: "Dispozitive",
                            href: "/disposable?subtype=crystal4in1&reusable=true",
                        },
                        {
                            name: "Pod-uri",
                            href: "/disposable?subtype=crystal4in1&cartridge=true",
                        },
                    ],
                },
                {
                    name: "De unica folosinta",
                    href: "/disposable/onetimeuse",
                    options: [
                        {
                            name: "Vozol Neon 800",
                            href: "/disposable?subtype=neon800",
                        },
                        {
                            name: "SKE Crystal Bar",
                            href: "/disposable?subtype=crystalbar",
                        },
                    ],
                },
            ],
        },
        {
            href: "/eliquid",
            name: $l("product.eliquid"),
            categories: [
                {
                    name: "Tip",
                    options: [
                        {
                            name: "E-lichid",
                            href: "/eliquid",
                        },
                        {
                            name: "Nicotinizare",
                            href: "/eliquid/nicotine",
                        },
                    ],
                },
                {
                    name: "Branduri e-lichid",
                    options: [
                        {
                            name: "Guerrilla Flavors",
                            href: "/eliquid?brand=guerrilla_flavors",
                        },
                    ],
                },
                {
                    name: "Branduri nicotinizare",
                    options: [
                        {
                            name: "EPotion",
                            href: "/eliquid/nicotine?brand=epotion",
                        },
                        {
                            name: "Nico Boom",
                            href: "/eliquid/nicotine?brand=nicoboom",
                        },
                        {
                            name: "ELiquid France",
                            href: "/eliquid/nicotine?brand=eliquid_france",
                        },
                    ],
                },
            ],
        },
        {
            href: "/smoking",
            name: $l("product.smoking"),
            categories: [
                {
                    name: "Tip",
                    options: [
                        { name: "Filtre", href: "/smoking/filter" },
                        { name: "Foite", href: "/smoking/rollingpaper" },
                        { name: "Grindere", href: "/smoking/grinder" },
                    ],
                },
                {
                    name: "Brand",
                    options: [
                        { name: "OCB", href: "/smoking?brand=ocb" },
                        { name: "RAW", href: "/smoking?brand=raw" },
                        { name: "ActiTube", href: "/smoking?brand=actitube" },
                    ],
                },
                {
                    name: "Filtre cu carbune activ",
                    options: [
                        { name: "ActiTube", href: "/smoking?brand=actitube" },
                    ],
                },
            ],
        },
        {
            href: "/pouch",
            name: $l("product.pouch"),
            categories: [
                {
                    name: "Tip",
                    options: [{ name: "Plicuri cu nicotina", href: "/pouch" }],
                },
                {
                    name: "Intensitate",
                    options: [
                        { name: "Slabe", href: "/pouch/weak" },
                        { name: "Moderate", href: "/pouch/mid" },
                        { name: "Intense", href: "/pouch/strong" },
                    ],
                },
                {
                    name: "Brand",
                    options: [
                        { name: "CUBA", href: "/pouch?brand=cuba" },
                        { name: "Iceberg", href: "/pouch?brand=iceberg" },
                        { name: "FEDRS", href: "/pouch?brand=fedrs" },
                    ],
                },
            ],
        },
        {
            href: "/kit",
            name: $l("product.kit"),
            categories: [
                {
                    name: "Tip",
                    options: [
                        { name: "Kituri incepatori", href: "/kit/entry" },
                        { name: "Rezistente si Cartuse", href: "/kit/coil" },
                    ],
                },
                {
                    name: "Produse",
                    options: [
                        { name: "Argus P2", href: "/kit?subtype=argus_p2" },
                        {
                            name: "Aspire Gotek",
                            href: "/kit?subtype=gotek",
                        },
                        {
                            name: "Vaporesso XROS 4 Mini",
                            href: "/kit?subtype=xros4_mini",
                        },
                    ],
                },
                {
                    name: "Brand",
                    options: [
                        { name: "Aspire", href: "/kit?brand=aspire" },
                        { name: "Vaporesso", href: "/kit?brand=vaporesso" },
                        { name: "Voopoo", href: "/kit?brand=voopoo" },
                        { name: "Lost Vape", href: "/kit?brand=lostvape" },
                    ],
                },
            ],
        },
    ];
</script>

{#if search_bar_open}
    <button
        class="fixed rounded-none left-0 top-0 w-full h-full z-[10] cursor-default"
        on:click={() => {
            search_bar_open = false;
        }}
    />
{/if}

<nav class="relative w-full lg:py-8 px-4 lg:px-16 space-y-8 lg:space-x-4">
    <div class="hidden lg:flex items-center">
        <div class="flex flex-[1] justify-center mr-auto">
            <div class="mr-auto">
                <SearchBar id="searchbar_desktop" bind:open={search_bar_open} />
            </div>
        </div>
        <a href="/" class="hover:filter-none flex flex-[1] justify-center">
            <img
                src="/res-images/vspot_flat.webp"
                class="w-[100px] h-[58.35px]"
                alt="The V-Spot Logo"
            />
        </a>
        <div class="flex flex-[1] justify-center">
            <div class="ml-auto flex items-center space-x-8">
                <UserNav {user} />
                <CartNav />
            </div>
        </div>
    </div>
    <div class="lg:hidden space-y-8">
        <div class="flex items-center space-x-8">
            <a href="/" class="hover:filter-none">
                <img
                    src="/res-images/vspot_flat.webp"
                    class="w-[80] h-[46.68px]"
                    alt="The V-Spot Logo"
                />
            </a>
            <div class="h-[45px] flex items-center !ml-auto">
                <UserNav {user} />
            </div>
            <div class="h-[45px] flex items-center">
                <CartNav />
            </div>
        </div>
        <SearchBar id="searchbar_mobile" bind:open={search_bar_open} />
    </div>
    <div
        class="z-20 hidden lg:flex items-center space-x-24 justify-center !mx-auto"
        role="list"
        on:mouseenter={() => {
            nav_hovered = true;
        }}
    >
        <NavItem
            bind:active_name={activate_submenu}
            url="/disposable"
            text={$l("product.disposable")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/eliquid"
            text={$l("product.eliquid")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/smoking"
            text={$l("product.smoking")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/pouch"
            text={$l("product.pouch")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/kit"
            text={$l("product.kit")}
        />
    </div>
    {#if activate_submenu}
        <div
            on:mouseleave={() => {
                nav_hovered = false;
            }}
            role="contentinfo"
            class="absolute !m-0 bg-vspot-primary-bg left-0 w-full z-10 h-fit border-b
            border-vspot-green flex space-x-44 justify-center py-12"
        >
            {#each active_options.categories as category}
                <div class="space-y-2">
                    {#if category.href}
                        <a href={category.href} class="font-extrabold block"
                            >{category.name}</a
                        >
                    {:else}
                        <span class="font-extrabold block">{category.name}</span
                        >
                    {/if}
                    <div class="space-y-1">
                        {#each category.options as option}
                            <a class="block" href={option.href}>{option.name}</a
                            >
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</nav>
