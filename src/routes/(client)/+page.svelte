<script lang="ts">
    import LinkButton from "$lib/LinkButton.svelte";
    import SiteFeatureBox from "$lib/SiteFeatureBox.svelte";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import {
        faTruck,
        faCreditCard,
        faMoneyBill,
        faLightbulb,
        faCheck,
    } from "@fortawesome/free-solid-svg-icons";
    import Disposable from "$lib/icons/disposable.svelte";
    import Cig from "$lib/icons/cig.svelte";
    import Pouch from "$lib/icons/pouch.svelte";
    import Liquid from "$lib/icons/liquid.svelte";
    import Kit from "$lib/icons/kit.svelte";
    import ProductShowcase from "$lib/mainpage/ProductShowcase.svelte";
    import Slideshow from "$lib/mainpage/Slideshow.svelte";
    import Fa from "svelte-fa";

    export let data;

    const newest = data.products.newest;
    const pouches = data.products.pouches;
    const kits = data.products.kits;
</script>

<svelte:head>
    <title>{pagetitle_make($l("home.title"))}</title>
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "V-Spot",
            "url": "https://vspot.ro"
        }
    </script>
    <meta
        name="description"
        content="Noul tau vape shop. La The VSpot gasesti toate produsele ce au de a face cu nicotina: vapes, pouchuri, kituri, e-lichide, nicotina si accesorii!"
    />
    <meta
        name="keywords"
        content="V Spot, VSpot, The VSpot, The V Spot, Vape Shop, Tigara electronica, Tigari electronice, Tutungerie, Vape, Vapes, Pouchuri, Tigari, Vapat, Kituri, E-Lichide, Lichide, Nicotina, Accesorii"
    />
</svelte:head>

<div class="space-y-16">
    <div class="lg:flex space-y-4 lg:space-y-0 lg:space-x-8">
        <a
            class="space-y-4 block hover:filter-none"
            href="/disposable?subtype=crystal4in1"
        >
            <video autoplay loop muted class="rounded-lg lg:min-w-[60%]">
                <track kind="captions" />
                <source
                    src="/videos/ske/crystal_4_in_1_promo.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </a>
        <section class="space-y-4">
            <a
                class="block !mt-0 hover:filter-none"
                href="/disposable?subtype=crystal4in1"
            >
                <img
                    alt="SKE Crystal 4-in-1"
                    src="/images/ske/crystal_4_in_1.webp"
                />
            </a>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">Gustul unic Crystal</span>
            </div>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">2400 Pufuri</span>
            </div>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">4 Arome diferite interschimbabile</span>
            </div>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">Reincarcabil cu poduri</span>
            </div>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">2% Nicotina</span>
            </div>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">Baterie 950mAh</span>
            </div>
            <div class="flex items-center space-x-4">
                <Fa size="lg" icon={faCheck} />
                <span class="text-xl">Port Tip-C</span>
            </div>
            <a
                href="/disposable?subtype=crystal4in1"
                class="block p-2 px-4 bg-vspot-green text-vspot-primary-bg text-center rounded-tl-lg rounded-br-lg"
            >
                Cumpara acum
            </a>
            <small>
                Acest produs contine nicotina si este interzis persoanelor sub
                18 ani.
            </small>
        </section>
    </div>
    <section class="space-y-4">
        <div class="flex items-center space-x-4">
            <h1 class="text-4xl lg:text-6xl text-nowrap">Noul Argus P2!</h1>
            <div class="w-full bg-vspot-green h-[1px]" />
        </div>
        <a
            class="space-y-4 block hover:filter-none"
            href="/kit?subtype=argus_p2"
        >
            <video autoplay loop muted class="rounded-lg">
                <track kind="captions" />
                <source
                    src="/videos/voopoo/argus_p2_showcase.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </a>
    </section>

    <div class="space-y-2 lg:w-[100%] p-4 relative pt-8">
        <div class="flex flex-col items-center justify-center lg:flex-row pb-4">
            <span
                class="z-[8] text-7xl lg:text-8xl font-[Blowhole] text-center lg:text-left opacity-100 bg-clip-text inline-block drop-shadow-2xl"
            >
                {$l("home.title")}
            </span>
        </div>
        <div
            class="grid lg:flex lg:justify-between lg:grid-cols-none grid-cols-1 lg:space-y-0 space-y-12"
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
                icon={faLightbulb}
                title={$l("page.main.support")}
                description={$l("page.main.support.description")}
            />
        </div>
        <div
            class="w-full h-fit grid grid-cols-2 gap-16 lg:gap-0 lg:flex lg:justify-between py-4"
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
    <div class="space-y-4">
        <div class="flex items-center space-x-4">
            <h1 class="text-4xl lg:text-6xl text-nowrap">Vozol Switch PRO</h1>
            <div class="w-full bg-vspot-green h-[1px]" />
        </div>
        <a href="/disposable?subtype=switchpro" class="block hover:filter-none">
            <img
                class="rounded-lg"
                alt="Vozol Switch Pro Promo"
                src="/images/vozol/vozol_switch_pro_promo.jpg"
            />
        </a>
        <ProductShowcase products={newest} />
    </div>

    <div class="space-y-24 pb-24">
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
        <!-- <div class="p-4 !mt-[150px] relative">
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
                    src="/images/vaporesso/logo.webp"
                    alt="Elf Bar"
                    class="h-[60px] object-contain"
                />
                <img
                    src="/images/aspire/aspire.webp"
                    alt="Aspire"
                    class="h-[60px] object-contain"
                />
                <img
                    src="/images/voopoo/logo.webp"
                    alt="Vozol"
                    class="h-[60px] object-contain"
                />
            </div>
        </div> -->
    </div>
</div>
