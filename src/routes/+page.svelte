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
    import Slideshow from "$lib/mainpage/Slideshow.svelte";

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
    <Slideshow />
    <div class="!mt-[950px] lg:!mt-[800px] space-y-4 lg:w-[100%] p-4 relative">
        <div
            class="
                    absolute inset-0 my-auto
                    h-[120%] lg:h-[140%] w-[1000%] translate-y-[-15%] lg:translate-y-[-30%] translate-x-[-25%] -skew-y-2
                    bg-vspot-secondary-bg/40 drop-shadow-lg
                "
        />
        <div class="flex flex-col items-center justify-center lg:flex-row pb-4">
            <span
                class="z-[8] text-8xl lg:text-9xl font-[Blowhole] text-center lg:text-left opacity-100 bg-clip-text inline-block drop-shadow-2xl"
            >
                {$l("home.title")}
            </span>
            <img
                class="lg:block max-h-[210px] max-w-[210px] z-[8]"
                src="/images/vspot.webp"
                alt="The VSpot"
            />
        </div>
        <div
            class="w-full h-fit grid grid-cols-2 gap-16 lg:gap-0 lg:flex lg:justify-between py-8 pb-14"
        >
            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
                <div class="rotate-[24deg] mb-auto lg:mb-0">
                    <Disposable h={52} />
                </div>
                <div class="mt-2 lg:mt-0">
                    <LinkButton simple href="/disposable">
                        <div class="text-2xl">
                            {$l("product.disposables")}
                        </div>
                    </LinkButton>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
                <div class="rotate-[24deg] mb-auto lg:mb-0">
                    <Liquid h={52} />
                </div>
                <div class="mt-2 lg:mt-0">
                    <LinkButton simple href="/liquid">
                        <div class="text-2xl">{$l("product.liquids")}</div>
                    </LinkButton>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
                <div class="rotate-[0deg] mb-auto lg:mb-0">
                    <Cig h={16} />
                </div>
                <div class="mt-2 lg:mt-0">
                    <LinkButton simple href="/smoking">
                        <div class="text-2xl">{$l("product.smoking")}</div>
                    </LinkButton>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
                <div class="mb-auto lg:mb-0">
                    <Pouch h={35} />
                </div>
                <div class="mt-2 lg:mt-0">
                    <LinkButton simple href="/pouch">
                        <div class="text-2xl">{$l("product.pouches")}</div>
                    </LinkButton>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
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
    </div>
    <div class="space-y-24 pt-12 pb-24">
        <ProductShowcase name={$l("product.new")} products={newest} />
        <div class="relative">
            <div
                class="
                absolute inset-0 my-auto
                h-[110%] w-[1000%] lg:translate-y-[0%] translate-x-[-25%]
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
                    h-[120%] lg:h-[180%] w-[600%] translate-y-[0%] lg:translate-y-[25%] translate-x-[-30%] skew-y-3
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
        <div
            class="grid lg:flex lg:justify-between lg:grid-cols-none grid-cols-2 !mt-48"
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
