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
            { name: "Reincarcabile", href: "/disposable?reusable=true" },
            { name: "Cartuse", href: "/disposable?cartridge=true" },
            { name: "Fara nicotina", href: "/disposable?nicotinefree=true" },
        ]}
        bind:current_hover
    >
        <span>
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
            { name: "Brichete", href: "/smoking/lighter" },
            { name: "Grindere", href: "/smoking/grinder" },
        ]}
        bind:current_hover
    >
        <span>
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
            { name: "Sa te apere Dumnezeu", href: "/pouch/strong" },
        ]}
    >
        <span>
            {$l("product.pouches")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/liquid"
        suboptions={[{ name: "Nicotinizare", href: "/liquid/nicotine" }]}
        bind:current_hover
    >
        <span>
            {$l("product.liquids")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/kit"
        suboptions={[
            { name: "Kituri incepatori", href: "/kit/entry" },
            { name: "Rezistente", href: "/kit/resistor" },
        ]}
        bind:current_hover
    >
        <span>
            {$l("product.kits")}
        </span>
    </ProductSubmenuItem>
</div>
