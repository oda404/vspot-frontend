<script lang="ts">
    import { l } from "$lib/langs";
    import ProductSubmenuItem from "./ProductSubmenuItem.svelte";
    import ProductSubmenuMobile from "./ProductSubmenuMobile.svelte";

    export let on_close_cb: () => void;

    let options = [
        {
            href: "/disposable",
            name: $l("product.disposables"),
            suboptions: [
                { name: "Reincarcabile", href: "/disposable/reusable" },
                { name: "Poduri", href: "/disposable/cartridge" },
                {
                    name: "Fara nicotina",
                    href: "/disposable?nicotinefree=true",
                },
                {},
                {
                    name: "Vozol Switch Pro",
                    href: "/disposable?subtype=switchpro",
                },
                { name: "Vozol Neon 800", href: "/disposable?subtype=neon800" },
                { name: "Elf Bar V2", href: "/disposable?subtype=elfbarv2" },
            ],
        },
        {
            href: "/smoking",
            name: $l("product.smoking"),
            suboptions: [
                { name: "Capsule tigari", href: "/smoking/capsules" },
                { name: "Filtre", href: "/smoking/filter" },
                { name: "Foite", href: "/smoking/rollingpaper" },
                { name: "Grindere", href: "/smoking/grinder" },
                { name: "Conuri", href: "/smoking/cone" },
            ],
        },
        {
            href: "/pouch",
            name: $l("product.pouches"),
            suboptions: [
                { name: "Slabe", href: "/pouch/weak" },
                { name: "Moderate", href: "/pouch/mid" },
                { name: "Tari", href: "/pouch/strong" },
            ],
        },
        {
            href: "/liquid",
            name: $l("product.liquids"),
            suboptions: [
                { name: "E-Lichide", href: "/liquid" },
                { name: "Nicotinizare", href: "/liquid/nicotine" },
                {},
                {
                    name: "Guerrilla Flavors",
                    href: "/liquid?brand=guerrilla_flavors",
                },
            ],
        },
        {
            href: "/kit",
            name: $l("product.kits"),
            suboptions: [
                { name: "Kituri incepatori", href: "/kit/entry" },
                { name: "Rezistente", href: "/kit/resistor" },
                {},
                { name: "Aspire", href: "/kit?brand=aspire" },
                { name: "Voopoo", href: "/kit?brand=voopoo" },
            ],
        },
    ];

    let current_hover: string | undefined;
</script>

<div
    role="menu"
    tabindex="0"
    class="z-20 absolute hidden lg:block -left-4 top-14 p-4 rounded-lg bg-vspot-primary-bg space-y-2"
>
    {#each options as option}
        <ProductSubmenuItem
            simple
            href={option.href}
            suboptions={option.suboptions}
            bind:current_hover
        >
            <span class="hover:text-vspot-text-hovered">{option.name}</span>
        </ProductSubmenuItem>
    {/each}
</div>

<ProductSubmenuMobile {options} {on_close_cb} />
