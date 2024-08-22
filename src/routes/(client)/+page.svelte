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
    import Fa from "svelte-fa";

    export let data;

    const newest = data.products.newest;
    const pouches = data.products.pouches;
    const kits = data.products.kits;

    function play_on_visible(e: HTMLVideoElement) {
        const observer = new IntersectionObserver((entries, {}) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target as Partial<HTMLVideoElement>;
                if (typeof el.play !== "undefined") {
                    el.play();
                    observer.disconnect();
                }
            });
        });

        observer.observe(e);

        return {
            destroy() {
                observer.disconnect();
            },
        };
    }
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
        content="The V-Spot este vape shop-ul ce îți oferă doar cele mai bune produse destinate pasionaților de vapat, fie că ești începător sau expert!"
    />
    <meta
        name="keywords"
        content="V Spot, VSpot, The VSpot, The V Spot, Vape Shop, Tigara electronica, Tutungerie, Vape, pouch, Tigari, Vapat, plicuri nicotina, E-Lichide, Lichide, Nicotina"
    />
</svelte:head>

<div class="space-y-12">
    <section class="space-y-4">
        <div class="flex space-x-4 items-center">
            <h1 class="text-3xl text-nowrap whitespace-nowrap">
                SKE Crystal 4-in-1
            </h1>
            <div class="w-full h-[1px] bg-vspot-secondary-bg" />
        </div>
        <div class="lg:flex lg:space-x-8 space-y-4 lg:space-y-0">
            <video
                use:play_on_visible
                disablepictureinpicture
                preload="none"
                loop
                muted
                poster="/images/ske/crystal_4_in_1_promo_thumb.webp"
                class="lg:w-[600px] lg:h-[600px] w-full h-full rounded-sm"
            >
                <source
                    src="/videos/ske/crystal_4_in_1_promo3.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div class="space-y-4 !mx-auto">
                <a
                    class="block hover:filter-none"
                    href="/disposable?subtype=crystal4in1"
                >
                    <img
                        alt="SKE Crystal 4-in-1"
                        src="/images/ske/crystal_4_in_1.webp"
                        class="lg:w-[360px] lg:h-[155.41px] w-full h-full"
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
                    <span class="text-xl"
                        >4 Arome diferite interschimbabile</span
                    >
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
                    Acest produs contine nicotina si este interzis persoanelor
                    sub 18 ani.
                </small>
            </div>
        </div>
        <div class="!mt-8 space-y-2">
            <ProductShowcase products={data.products.crystal_4in1} />
            <a href="/disposable?subtype=crystal4in1" class="block text-center"
                >Vezi toate</a
            >
        </div>
    </section>
    <div class="space-y-8">
        <div class="flex flex-col items-center justify-center lg:flex-row">
            <span
                class="text-6xl font-extrabold text-center lg:text-left bg-clip-text inline-block"
            >
                {$l("home.title")}
            </span>
        </div>
        <div
            class="grid lg:flex lg:justify-between lg:grid-cols-none grid-cols-1 lg:space-y-0 space-y-8"
        >
            <SiteFeatureBox
                icon={faTruck}
                description={$l("page.main.shipping.description")}
            />
            <SiteFeatureBox
                icons={[faCreditCard, faMoneyBill]}
                description={$l("page.main.payment.description")}
            />
            <SiteFeatureBox
                icon={faLightbulb}
                description={$l("page.main.support.description")}
            />
        </div>
        <div
            class="w-full grid grid-cols-2 gap-16 lg:gap-0 lg:flex lg:justify-between"
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
    <section class="space-y-4">
        <div class="flex items-center space-x-4">
            <h1 class="text-3xl text-nowrap whitespace-nowrap">
                VooPoo Argus P2
            </h1>
            <div class="w-full bg-vspot-secondary-bg h-[1px]" />
        </div>
        <a
            class="space-y-4 block hover:filter-none"
            href="/kit?subtype=argus_p2"
        >
            <video
                use:play_on_visible
                disablepictureinpicture
                loop
                muted
                preload="none"
                class="w-[1100px] rounded-sm"
                poster="images/voopoo/argus_p2_showcase_thumb.webp"
            >
                <track kind="captions" />
                <source
                    src="/videos/voopoo/argus_p2_showcase_720p.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </a>
        <div class="!mt-8 space-y-2">
            <!-- <ProductShowcase products={data.products.argus_p2} /> -->
            <a href="/kit?subtype=argus_p2" class="block text-center"
                >Vezi toate</a
            >
        </div>
    </section>

    <div class="space-y-4">
        <div class="flex items-center space-x-4">
            <h1 class="text-3xl text-nowrap whitespace-nowrap">
                Vozol Switch PRO
            </h1>
            <div class="w-full bg-vspot-secondary-bg h-[1px]" />
        </div>
        <a href="/disposable?subtype=switchpro" class="block hover:filter-none">
            <img
                class="w-[1100px] rounded-sm"
                alt="Vozol Switch Pro Promo"
                src="/images/vozol/vozol_switch_pro_promo.webp"
            />
        </a>
        <div class="!mt-8 space-y-2">
            <ProductShowcase products={newest} />
            <a href="/disposable?subtype=switchpro" class="block text-center"
                >Vezi toate</a
            >
        </div>
    </div>

    <ProductShowcase
        href="/pouch"
        name={$l("product.pouches")}
        products={pouches}
    >
        <div>
            <Pouch h={32} />
        </div>
    </ProductShowcase>
    <ProductShowcase href="/kit" name={$l("product.kits")} products={kits}>
        <div>
            <Kit h={32} />
        </div>
    </ProductShowcase>
</div>
