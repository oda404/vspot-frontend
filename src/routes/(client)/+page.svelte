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
        faBattery,
        faSmoking,
        faRecycle,
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

<div class="space-y-24">
    <section class="space-y-4">
        <h1 class="text-2xl text-nowrap whitespace-nowrap">
            SKE Crystal 4-in-1
        </h1>
        <div class="lg:flex lg:space-x-8 space-y-4 lg:space-y-0">
            <div class="h-fit relative">
                <div
                    class="w-full h-full border-2 border-vspot-green absolute mt-2 ml-2 -z-10"
                />
                <video
                    use:play_on_visible
                    disablepictureinpicture
                    preload="none"
                    loop
                    muted
                    poster="/images/ske/crystal_4_in_1_promo_thumb.webp"
                    class="lg:w-[600px] lg:h-[600px] w-full h-full rounded-sm !ml-0 z-10"
                >
                    <source
                        src="/videos/ske/crystal_4_in_1_promo3.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
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
                    <span class="text-xl">Incarcare rapida Type-C</span>
                </div>
                <a
                    href="/disposable?subtype=crystal4in1"
                    class="block p-2 px-4 bg-vspot-green text-vspot-primary-bg text-center rounded-sm"
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
            <div class="flex items-center space-x-4">
                <div class="w-full h-[1px] bg-vspot-secondary-bg" />
                <a
                    href="/disposable?subtype=crystal4in1"
                    class="block text-center whitespace-nowrap">Vezi toate</a
                >
                <div class="w-full h-[1px] bg-vspot-secondary-bg" />
            </div>
        </div>
    </section>
    <div class="space-y-8">
        <div
            class="flex lg:flex-row flex-col items-center space-x-4 justify-center"
        >
            <img
                src="/images/vspot_flat.webp"
                alt="V-Spot logo"
                class="w-[140px]"
            />
            <h1
                class="text-5xl lg:mt-10 mt-4 text-center font-extrabold lg:whitespace-nowrap"
            >
                {$l("home.title")}
            </h1>
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
                            {$l("product.disposable")}
                        </div>
                    </LinkButton>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
                <div class="rotate-[24deg] mb-auto lg:mb-0">
                    <Liquid h={52} />
                </div>
                <div class="mt-2 lg:mt-0">
                    <LinkButton simple href="/eliquid">
                        <div class="text-2xl">{$l("product.eliquid")}</div>
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
                        <div class="text-2xl">{$l("product.pouch")}</div>
                    </LinkButton>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row space-x-4 items-center z-[8]">
                <div class="mb-auto lg:mb-0">
                    <Kit h={46} />
                </div>
                <div class="mt-2 lg:mt-0">
                    <LinkButton simple href="/kit">
                        <div class="text-2xl">{$l("product.kit")}</div>
                    </LinkButton>
                </div>
            </div>
        </div>
    </div>
    <section class="space-y-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-nowrap whitespace-nowrap">
                VooPoo Argus P2
            </h1>
            <a
                href="/kit?subtype=argus_p2"
                class="block text-center whitespace-nowrap">Vezi toate</a
            >
        </div>
        <a
            class="space-y-4 block hover:filter-none relative"
            href="/kit?subtype=argus_p2"
        >
            <div class="h-fit relative">
                <div
                    class="w-full h-full border-2 border-[#097381] absolute mt-2 ml-2 -z-10"
                />
                <video
                    use:play_on_visible
                    disablepictureinpicture
                    loop
                    muted
                    preload="none"
                    class="w-[1100px] aspect-video rounded-sm z-10"
                    poster="images/voopoo/argus_p2_showcase_thumb.webp"
                >
                    <track kind="captions" />
                    <source
                        src="/videos/voopoo/argus_p2_showcase_720p.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </a>
    </section>

    <section class="space-y-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-nowrap whitespace-nowrap">
                Vozol Switch PRO
            </h1>
            <a
                href="/disposable?subtype=switchpro"
                class="block text-center whitespace-nowrap">Vezi toate</a
            >
        </div>
        <a href="/disposable?subtype=switchpro" class="block hover:filter-none">
            <div class="h-fit relative">
                <div
                    class="w-full h-full border-2 border-[#1d61a3] absolute mt-2 ml-2 -z-10"
                />
                <img
                    class="w-[1100px] aspect-video rounded-sm z-10"
                    alt="Vozol Switch Pro Promo"
                    src="/images/vozol/vozol_switch_pro_promo.webp"
                />
            </div>
        </a>
        <div
            class="!mt-8 grid grid-cols-2 lg:grid-cols-4 lg:gap-0 gap-4 justify-between"
        >
            <div
                class="flex mx-auto flex-col lg:flex-row items-center space-x-2"
            >
                <Fa size="lg" icon={faRecycle} />
                <span class="font-bold text-xl text-center lg:text-left"
                    >Reincarcabil cu poduri</span
                >
            </div>
            <div
                class="flex mx-auto flex-col lg:flex-row items-center space-x-2"
            >
                <Fa size="lg" icon={faSmoking} />
                <span class="font-bold text-xl text-center lg:text-left"
                    >800 de fumuri per pod</span
                >
            </div>
            <div
                class="flex mx-auto flex-col lg:flex-row items-center space-x-2"
            >
                <Fa size="lg" icon={faBattery} />
                <span class="font-bold text-xl text-center lg:text-left"
                    >Baterie de 800 mAh</span
                >
            </div>
            <div
                class="flex mx-auto flex-col lg:flex-row items-center space-x-2"
            >
                <Fa size="lg" icon={faCheck} />
                <span class="font-bold text-xl text-center lg:text-left"
                    >Gustul unic Vozol</span
                >
            </div>
        </div>
        <div class="!mt-8">
            <ProductShowcase products={newest} />
        </div>
    </section>

    <ProductShowcase
        href="/pouch"
        name={$l("product.pouch")}
        products={pouches}
    >
        <div>
            <Pouch h={32} />
        </div>
    </ProductShowcase>
    <ProductShowcase href="/kit" name={$l("product.kit")} products={kits}>
        <div>
            <Kit h={32} />
        </div>
    </ProductShowcase>
</div>
