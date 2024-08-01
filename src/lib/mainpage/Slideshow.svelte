<script>
    import { l } from "$lib/langs";
</script>

<div class="h-fit inset-0 z-[5]">
    <a
        href="/disposable?subtype=switchpro"
        class="relative block hover:filter-none"
    >
        <img
            class="min-w-[100vw] h-[100vh] object-none object-top"
            src="/images/vozol/switchpro_promo.webp"
            alt="Vozol Switch Pro Promo"
        />
        <div
            class="absolute space-y-2 pl-[20px] lg:pl-[40px] pr-[80px] bottom-[5%] p-4"
        >
            <div class="">
                <img
                    id="fade-image"
                    class="h-[80px] fade-image"
                    src="/images/vozol/vozol.webp"
                    alt="Vozol"
                />
                <span
                    class="pl-2 font-semibold text-vspot-secondary-bg text-7xl whitespace-nowrap"
                >
                    Switch Pro
                </span>
            </div>
            <span
                class="text-lg block w-fit font-semibold bg-vspot-green px-8 p-4 rounded-tl-lg rounded-br-lg text-vspot-primary-bg"
            >
                {$l("slideshow.switchpro")}
            </span>
        </div>
    </a>
</div>
