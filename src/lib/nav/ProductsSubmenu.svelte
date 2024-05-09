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
        href="/disposables"
        suboptions={[
            { name: "Reincarcabile", href: "/disposables?reusable=true" },
            { name: "Cartuse", href: "/disposables?cartridge=true" },
            { name: "Fara nicotina", href: "/disposables?nicotinefree=true" },
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
        href="/pouches"
        bind:current_hover
        suboptions={[
            { name: "Slabe", href: "/pouches/weak" },
            { name: "Moderate", href: "/pouches/mid" },
            { name: "Sa te apere Dumnezeu", href: "/pouches/strong" },
        ]}
    >
        <span>
            {$l("product.pouches")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/liquids"
        suboptions={[{ name: "Nicotina", href: "/liquids/nic" }]}
        bind:current_hover
    >
        <span>
            {$l("product.liquids")}
        </span>
    </ProductSubmenuItem>

    <ProductSubmenuItem
        simple
        href="/kits"
        suboptions={[
            { name: "Kituri incepatori", href: "/kits/entry" },
            { name: "Rezistente", href: "/kits/resistor" },
        ]}
        bind:current_hover
    >
        <span>
            {$l("product.kits")}
        </span>
    </ProductSubmenuItem>
</div>
