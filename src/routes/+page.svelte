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
    import Disposable from "$lib/icons/disposable.svelte";
    import Cig from "$lib/icons/cig.svelte";
    import Pouch from "$lib/icons/pouch.svelte";
    import Liquid from "$lib/icons/liquid.svelte";
    import Kit from "$lib/icons/kit.svelte";
    import ProductShowcase from "$lib/mainpage/ProductShowcase.svelte";

    export let data;

    const newest = data.products.newest;
    const pouches = data.products.pouches;
    const kits = data.products.kits;
</script>

<svelte:head>
    <title>{pagetitle_make($l("home.title"))}</title>
    <meta
        name="description"
        content="Noul tau vape shop. La The VSpot gasesti toate produsele ce au de a face cu nicotina: vapes, pouchuri, kituri, e-lichide, nicotina si accesorii!"
    />
    <meta
        name="keywords"
        content="V Spot, VSpot, The VSpot, The V Spot, Vape Shop, Tigara electronica, Tigari electronice, Tutungerie, Vape, Vapes, Pouchuri, Tigari, Vapat, Kituri, E-Lichide, Lichide, Nicotina, Accesorii"
    />
</svelte:head>

<div class="space-y-4">
    <div class="space-y-4 lg:w-[100%]">
        <span
            class="text-8xl font-[Blowhole] lg:text-9xl font-semibold opacity-80 block max-w-[100%] lg:max-w-[80%]"
        >
            {$l("home.title")}
        </span>
        <span class="block text-lg opacity-80">
            <span class="font-[Blowhole] font-bold text-3xl !opacity-100">
                The V-Spot
            </span>
            {$l("page.main.description")}
        </span>
    </div>

    <div
        class="w-full h-fit p-4 grid grid-cols-2 gap-16 lg:gap-0 lg:flex lg:justify-between !my-12"
    >
        <div class="flex flex-col lg:flex-row space-x-4 items-center">
            <div class="rotate-[24deg] mb-auto lg:mb-0">
                <Disposable h={52} />
            </div>
            <div class="mt-2 lg:mt-0">
                <LinkButton simple href="/disposable">
                    <div class="text-2xl">{$l("product.disposables")}</div>
                </LinkButton>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row space-x-4 items-center">
            <div class="rotate-[24deg] mb-auto lg:mb-0">
                <Liquid h={52} />
            </div>
            <div class="mt-2 lg:mt-0">
                <LinkButton simple href="/liquid">
                    <div class="text-2xl">{$l("product.liquids")}</div>
                </LinkButton>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row space-x-4 items-center">
            <div class="rotate-[0deg] mb-auto lg:mb-0">
                <Cig h={16} />
            </div>
            <div class="mt-2 lg:mt-0">
                <LinkButton simple href="/smoking">
                    <div class="text-2xl">{$l("product.smoking")}</div>
                </LinkButton>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row space-x-4 items-center">
            <div class="mb-auto lg:mb-0">
                <Pouch h={35} />
            </div>
            <div class="mt-2 lg:mt-0">
                <LinkButton simple href="/pouch">
                    <div class="text-2xl">{$l("product.pouches")}</div>
                </LinkButton>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row space-x-4 items-center">
            <div class="mb-auto lg:mb-0">
                <Kit h={46} />
            </div>
            <div class="mt-2 lg:mt-0">
                <LinkButton simple href="/kit">
                    <div class="text-2xl">{$l("product.kits")}</div>
                </LinkButton>
            </div>
        </div>
    </div>
    <div class="space-y-24 pb-24">
        <ProductShowcase name={$l("product.new")} products={newest} />
        <div class="relative">
            <div
                class="
                absolute inset-0 my-auto
                h-[110%] w-[200%] lg:translate-y-[0%] translate-x-[-25%]
                bg-vspot-secondary-bg opacity-40 -z-10 drop-shadow-lg
            "
            />
            <ProductShowcase
                href="/pouch"
                name={$l("product.pouches")}
                products={pouches}
            >
                <div>
                    <Pouch h={32} />
                </div>
            </ProductShowcase>
        </div>
        <ProductShowcase href="/kit" name={$l("product.kits")} products={kits}>
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
            <span class="text-2xl block"> {$l("page.main.best_brands")} </span>
            <span>{$l("page.main.best_brands.description")}</span>
            <div
                class="flex flex-col lg:flex-row lg:justify-between grid-cols-1 gap-y-24 mt-8"
            >
                <img
                    src="/images/vozol/vozol.webp"
                    alt="Vozol"
                    class="max-h-[60px] object-contain"
                />
                <img
                    src="/images/elfv2/elfbar.webp"
                    alt="Elf Bar"
                    class="h-[60px] object-contain"
                />
                <img
                    src="/images/aspire/aspire.webp"
                    alt="Aspire"
                    class="h-[60px] object-contain"
                />
                <img
                    src="/images/nasty/nasty.webp"
                    alt="Vozol"
                    class="h-[60px] object-contain"
                />
            </div>
        </div>
        <div class="space-y-4 !mt-48">
            <div
                class="grid lg:flex lg:justify-between lg:grid-cols-none grid-cols-2"
            >
                <SiteFeatureBox
                    icon={faTruck}
                    title={$l("page.main.shipping")}
                    description={$l("page.main.shipping.description")}
                />
                <SiteFeatureBox
                    icons={[faCreditCard, faMoneyBill]}
                    title={$l("page.main.payment")}
                    description={$l("page.main.payment.description")}
                />
                <SiteFeatureBox
                    icon={faArrowLeft}
                    title={$l("page.main.return")}
                    description={$l("page.main.return.description")}
                >
                    <a class="text-sm text-vspot-link" href="/return-policy"
                        >{$l("page.main.return.check_policy")}
                    </a>
                </SiteFeatureBox>
                <SiteFeatureBox
                    img_url={"/images/ahh.webp"}
                    title={$l("page.main.satisfaction")}
                    description={$l("page.main.satisfaction.description")}
                />
            </div>
        </div>
    </div>
</div>
