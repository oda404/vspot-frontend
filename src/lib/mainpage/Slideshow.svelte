<script>
    import { l } from "$lib/langs";
</script>

<div class="absolute h-fit inset-0 -z-10 drop-shadow-lg">
    <a href="/disposable?subtype=switchpro" class="relative block">
        <img
            class="min-w-[100vw] h-[100vh] object-none object-top"
            src="/images/vozol/switchpro_promo.webp"
            alt="Vozol Switch Pro Promo"
        />
        <div
            class="absolute space-y-2 pl-[20px] lg:pl-[40px] pr-[80px] bottom-[40px] p-4 bg-gradient-to-r from-vspot-green/80 to-vspot-purple/0"
        >
            <div class="drop-shadow-lg">
                <img
                    class="h-[80px]"
                    src="/images/vozol/vozol.webp"
                    alt="Vozol"
                />
                <span
                    class="pl-2 font-semibold text-vspot-secondary-bg text-7xl whitespace-nowrap"
                >
                    Switch Pro
                </span>
            </div>
            <a
                class="text-lg block w-fit font-semibold drop-shadow-lg bg-vspot-green px-8 p-4 rounded-tl-lg rounded-br-lg text-vspot-primary-bg"
                href="/disposable?subtype=switchpro"
            >
                {$l("slideshow.switchpro")}
            </a>
        </div>
    </a>
</div>
