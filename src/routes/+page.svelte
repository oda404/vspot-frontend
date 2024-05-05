<script lang="ts">
    import LinkButton from "$lib/LinkButton.svelte";
    import SiteFeatureBox from "$lib/SiteFeatureBox.svelte";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import {
        faTruck,
        faCreditCard,
        faMoneyBill,
        faArrowLeft,
    } from "@fortawesome/free-solid-svg-icons";
    import Product from "$lib/products/Product.svelte";
    import Disposable from "$lib/icons/disposable.svelte";
    import Cig from "$lib/icons/cig.svelte";
    import Pouch from "$lib/icons/pouch.svelte";
    import Liquid from "$lib/icons/liquid.svelte";
    import Kit from "$lib/icons/kit.svelte";
    import ProductShowcase from "$lib/mainpage/ProductShowcase.svelte";

    export let data;

    const products = data.products;
</script>

<svelte:head>
    <title>{pagetitle_make($l("home.title"))}</title>
</svelte:head>

<div class="space-y-4">
    <div class="space-y-8 lg:w-[60%]">
        <span class="text-7xl lg:text-8xl font-semibold opacity-80">
            {$l("home.title")}
        </span>
    </div>
    <div
        class="w-full h-fit p-4 drop-shadow flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between"
    >
        <div class="flex space-x-4 items-center">
            <div class="rotate-[24deg]">
                <Disposable h={52} />
            </div>
            <LinkButton simple href="/disposables">
                <div class="text-2xl">{$l("product.disposables")}</div>
            </LinkButton>
        </div>
        <div class="flex space-x-4 items-center">
            <div class="rotate-[0deg]">
                <Cig h={16} />
            </div>
            <LinkButton simple href="/smoking">
                <div class="text-2xl">{$l("product.smoking")}</div>
            </LinkButton>
        </div>
        <div class="flex space-x-4 items-center">
            <div>
                <Pouch h={35} />
            </div>
            <LinkButton simple href="/pouches">
                <div class="text-2xl">{$l("product.pouches")}</div>
            </LinkButton>
        </div>
        <div class="flex space-x-4 items-center">
            <div class="rotate-[24deg]">
                <Liquid h={52} />
            </div>
            <LinkButton simple href="/liquids">
                <div class="text-2xl">{$l("product.liquids")}</div>
            </LinkButton>
        </div>
        <div class="flex space-x-4 items-center">
            <div>
                <Kit h={46} />
            </div>
            <LinkButton simple href="/kits">
                <div class="text-2xl">{$l("product.kits")}</div>
            </LinkButton>
        </div>
    </div>
    <div class="space-y-24 pb-24">
        <ProductShowcase name={$l("product.new")} {products} />
        <div class="relative">
            <div
                class="
                absolute inset-0 my-auto
                h-[110%] w-[200%] lg:translate-y-[0%] translate-x-[-25%]
                bg-vspot-secondary-bg opacity-40 -z-10 drop-shadow-lg
            "
            />
            <ProductShowcase name={$l("product.pouches")} {products}>
                <div>
                    <Pouch h={32} />
                </div>
            </ProductShowcase>
        </div>
        <ProductShowcase name={$l("product.kits")} {products}>
            <div>
                <Kit h={32} />
            </div>
        </ProductShowcase>
        <div class="p-4 !mt-[150px] relative">
            <div
                class="
                    absolute inset-0 my-auto
                    h-[120%] lg:h-[180%] w-[200%] lg:translate-y-[10%] translate-x-[-25%] skew-y-3
                    bg-vspot-secondary-bg opacity-80 -z-10 drop-shadow-lg
                "
            />
            <span class="text-2xl block"> Cele mai bune branduri </span>
            <span
                >Lucram exclusiv cu cele mai bune branduri pentru a-ti asigura
                satisfactia completa cand dai o comanda!</span
            >
            <div
                class="grid lg:flex lg:justify-between grid-cols-1 gap-y-24 mt-8"
            >
                <img
                    src="/images/vozol/vozol.png"
                    alt="Vozol"
                    class="h-[60px]"
                />
                <img
                    src="/images/elfv2/elfbar.png"
                    alt="Elf Bar"
                    class="h-[60px]"
                />
                <img
                    src="/images/aspire/aspire.webp"
                    alt="Aspire"
                    class="h-[60px]"
                />
                <img
                    src="/images/nasty/nasty.webp"
                    alt="Vozol"
                    class="h-[60px]"
                />
            </div>
        </div>
        <div class="space-y-4 !mt-48">
            <div
                class="grid lg:flex lg:justify-between lg:grid-cols-none grid-cols-2"
            >
                <SiteFeatureBox
                    icon={faTruck}
                    title="Transport in tota tara"
                    description="Transport prin firma ta preferata de curierat oriunde in Romania"
                />
                <SiteFeatureBox
                    icons={[faCreditCard, faMoneyBill]}
                    title="Plata card sau ramburs"
                    description="Platesti folosind cardul online cu 3DSecure sau cash cand preiei comanda"
                />
                <SiteFeatureBox
                    icon={faArrowLeft}
                    title="Retur gratuit"
                    description="Daca nu esti multumit de un produs iti trimitem altul sau banii inapoi"
                >
                    <a
                        class="text-sm text-vspot-link hover:text-vspot-link-hover"
                        href="/return-policy"
                        >*Vezi politica de retur
                    </a>
                </SiteFeatureBox>
                <SiteFeatureBox
                    img_url={"/images/ahh.png"}
                    title="Satisfactie totala"
                    description="Atat am avut de spus"
                />
            </div>
        </div>
    </div>
</div>
