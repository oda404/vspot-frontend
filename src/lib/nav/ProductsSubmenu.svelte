<script lang="ts">
    import { l } from "$lib/langs";
    import ProductSubmenuItem from "./ProductSubmenuItem.svelte";

    let current_hover: string | undefined;
</script>

<div
    role="menu"
    tabindex="0"
    class="z-20 absolute -left-4 top-10 p-4 rounded-lg bg-vspot-primary-bg space-y-2"
>
    <!-- <div
        class="flex space-x-8 justify-between items-center border-b border-vspot-secondary-bg"
    ></div> -->
    <ProductSubmenuItem
        simple
        href="/disposable"
        suboptions={[
            { name: "Reincarcabile", href: "/disposable/reusable" },
            { name: "Poduri", href: "/disposable/cartridge" },
            { name: "Fara nicotina", href: "/disposable?nicotinefree=true" },
            {},
            { name: "Vozol Switch Pro", href: "/disposable?subtype=switchpro" },
            { name: "Vozol Neon 800", href: "/disposable?subtype=neon800" },
            { name: "Elf Bar V2", href: "/disposable?subtype=elfbarv2" },
        ]}
        bind:current_hover
    >
        <span class="hover:text-vspot-text-hovered">
            {$l("product.disposables")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/smoking"
        suboptions={[
            { name: "Capsule tigari", href: "/smoking/capsules" },
            { name: "Filtre", href: "/smoking/filter" },
            { name: "Foite", href: "/smoking/rollingpaper" },
            // { name: "Brichete", href: "/smoking/lighter" },
            { name: "Grindere", href: "/smoking/grinder" },
            { name: "Conuri", href: "/smoking/cone" },
        ]}
        bind:current_hover
    >
        <span class="hover:text-vspot-text-hovered">
            {$l("product.smoking")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/pouch"
        bind:current_hover
        suboptions={[
            { name: "Slabe", href: "/pouch/weak" },
            { name: "Moderate", href: "/pouch/mid" },
            { name: "Tari", href: "/pouch/strong" },
        ]}
    >
        <span class="hover:text-vspot-text-hovered">
            {$l("product.pouches")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/liquid"
        suboptions={[
            { name: "E-Lichide", href: "/liquid" },
            { name: "Nicotinizare", href: "/liquid/nicotine" },
            {},
            {
                name: "Guerrilla Flavors",
                href: "/liquid?brand=guerrilla_flavors",
            },
        ]}
        bind:current_hover
    >
        <span class="hover:text-vspot-text-hovered">
            {$l("product.liquids")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/kit"
        suboptions={[
            { name: "Kituri incepatori", href: "/kit/entry" },
            { name: "Rezistente", href: "/kit/resistor" },
            {},
            { name: "Aspire", href: "/kit?brand=aspire" },
            { name: "Voopoo", href: "/kit?brand=voopoo" },
        ]}
        bind:current_hover
    >
        <span class="hover:text-vspot-text-hovered">
            {$l("product.kits")}
        </span>
    </ProductSubmenuItem>
</div>
