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
            name: $l("product.disposables"),
            categories: [
                {
                    name: "Produse",
                    options: [
                        {
                            name: "SKE Crystal 4-in-1",
                            href: "/disposable?subtype=crystal4in1",
                        },
                        {
                            name: "SKE Crystal Bar",
                            href: "/disposable?subtype=crystalbar",
                        },
                        {
                            name: "Vozol Switch Pro",
                            href: "/disposable?subtype=switchpro",
                        },
                        {
                            name: "Vozol Neon 800",
                            href: "/disposable?subtype=neon800",
                        },
                        {
                            name: "Elf Bar V2",
                            href: "/disposable?subtype=elfbarv2",
                        },
                    ],
                },
                {
                    name: "Tip",
                    options: [
                        {
                            name: "Vape cu poduri",
                            href: "/disposable/reusable",
                        },
                        {
                            name: "Poduri pentru vape",
                            href: "/disposable/cartridge",
                        },
                        {
                            name: "De unica folosinta",
                            href: "/disposable/onetimeuse",
                        },
                        {
                            name: "Fara nicotina",
                            href: "/disposable?nicotinefree=true",
                        },
                    ],
                },
                {
                    name: "Brand",
                    options: [
                        {
                            name: "SKE",
                            href: "/disposable?brand=ske",
                        },
                        {
                            name: "Vozol",
                            href: "/disposable?brand=vozol",
                        },
                        {
                            name: "Elf Bar",
                            href: "/disposable?brand=elfbar",
                        },
                    ],
                },
                {
                    name: "SKE Crystal 4-in-1",
                    options: [
                        {
                            name: "Dispozitive",
                            href: "/disposable?subtype=crystal4in1&reusable=true",
                        },
                        {
                            name: "Poduri",
                            href: "/disposable?subtype=crystal4in1&cartridge=true",
                        },
                    ],
                },
                {
                    name: "Vozol Switch PRO",
                    options: [
                        {
                            name: "Dispozitive",
                            href: "/disposable?subtype=switchpro&reusable=true",
                        },
                        {
                            name: "Poduri",
                            href: "/disposable?subtype=switchpro&cartridge=true",
                        },
                    ],
                },
            ],
        },
        {
            href: "/liquid",
            name: $l("product.liquids"),
            categories: [
                {
                    name: "Tip",
                    options: [
                        {
                            name: "E-lichid",
                            href: "/liquid",
                        },
                        {
                            name: "Nicotinizare",
                            href: "/liquid/nicotine",
                        },
                    ],
                },
                {
                    name: "Branduri e-lichid",
                    options: [
                        {
                            name: "Guerrilla Flavors",
                            href: "/liquid?brand=guerrilla_flavors",
                        },
                    ],
                },
                {
                    name: "Branduri nicotinizare",
                    options: [
                        {
                            name: "EPotion",
                            href: "/liquid/nicotine?brand=epotion",
                        },
                        {
                            name: "Nico Boom",
                            href: "/liquid/nicotine?brand=nicoboom",
                        },
                        {
                            name: "ELiquid France",
                            href: "/liquid/nicotine?brand=eliquid_france",
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
                        { name: "Capsule tigari", href: "/smoking/capsules" },
                        { name: "Filtre", href: "/smoking/filter" },
                        { name: "Foite", href: "/smoking/rollingpaper" },
                        { name: "Grindere", href: "/smoking/grinder" },
                        { name: "Conuri", href: "/smoking/cone" },
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
            name: $l("product.pouches"),
            categories: [
                {
                    name: "Tip",
                    options: [{ name: "Plicuri cu nicotina", href: "/pouch" }],
                },
                {
                    name: "Brand",
                    options: [
                        { name: "CUBA", href: "/pouch?brand=cuba" },
                        { name: "Iceberg", href: "/pouch?brand=iceberg" },
                        { name: "FEDRS", href: "/pouch?brand=fedrs" },
                    ],
                },
                {
                    name: "Intensitate",
                    options: [
                        { name: "Slabe", href: "/pouch/weak" },
                        { name: "Moderate", href: "/pouch/mid" },
                        { name: "Tari", href: "/pouch/strong" },
                    ],
                },
            ],
        },
        {
            href: "/kit",
            name: $l("product.kits"),
            categories: [
                {
                    name: "Tip",
                    options: [
                        { name: "Kituri incepatori", href: "/kit/entry" },
                        { name: "Rezistente/Cartuse", href: "/kit/resistor" },
                    ],
                },
                {
                    name: "Produse",
                    options: [
                        { name: "Argus P2", href: "/kit?subtype=argus_p2" },
                        {
                            name: "Argus G2 Mini",
                            href: "/kit?subtype=argus_g2_mini",
                        },
                        {
                            name: "Aspire Gotek",
                            href: "/kit?subtype=gotek",
                        },
                        {
                            name: "Vaporesso XROS 4",
                            href: "/kit?subtype=xros4",
                        },
                        {
                            name: "Vaporesso GTX GO 80",
                            href: "/kit?subtype=gtx_go80",
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
                src="/images/vspot_flat.webp"
                class="w-[130px] h-[75.86px]"
                alt="V Spot Logo"
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
                    src="/images/vspot_flat.webp"
                    class="w-[92px] h-[52.52px]"
                    alt="V Spot Logo"
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
            text={$l("product.disposables")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/liquid"
            text={$l("product.liquids")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/smoking"
            text={$l("product.smoking")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/pouch"
            text={$l("product.pouches")}
        />
        <NavItem
            bind:active_name={activate_submenu}
            url="/kit"
            text={$l("product.kits")}
        />
    </div>
    {#if activate_submenu}
        <div
            on:mouseleave={() => {
                nav_hovered = false;
            }}
            role="contentinfo"
            class="absolute !m-0 bg-vspot-primary-bg left-0 w-full z-10 h-fit border-b
            border-vspot-green flex space-x-24 justify-center py-12"
        >
            {#each active_options.categories as category}
                <div>
                    <span class="font-extrabold block">{category.name}</span>
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
