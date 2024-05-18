<script>
    import { CONTACT_EMAIL, CONTACT_PHONE } from "$lib/contact/info";
    import { l } from "$lib/langs";
</script>

<footer
    class="bg-vspot-primary-bg border-t border-vspot-green w-full p-10 lg:p-20 flex flex-col justify-center z-[200]"
>
    <div class="flex justify-center">
        <div
            class="justify-between w-full lg:w-[1100px] grid grid-cols-2 lg:grid-cols-5 gap-4"
        >
            <div class="flex flex-col items-center col-span-2 lg:col-span-1">
                <img
                    src="/images/vspot.webp"
                    alt="V Spot Logo"
                    class="w-[150px]"
                />
                <div class="font-bold">&copy; 2024 Terrible Fortune SRL</div>
            </div>
            <div>
                <span class="font-bold">{$l("footer.products")}</span>
                <a class="block" href="/disposable"
                    >{$l("product.disposables")}</a
                >
                <a class="block" href="/pouch">{$l("product.pouches")}</a>
                <a class="block" href="/smoking">{$l("product.smoking")}</a>
                <a class="block" href="/liquid">{$l("product.liquids")}</a>
                <a class="block" href="/kit">{$l("product.kits")}</a>
            </div>
            <div>
                <span class="font-bold">{$l("footer.locations")}</span>
                <address>RO Suceava, Falticeni, Ana Iapatescu 14</address>
            </div>
            <div>
                <span class="font-bold">{$l("footer.legal")}</span>
                <a class="block" href="/tos">{$l("tos.title")}</a>
                <a class="block" href="/cookie-policy"
                    >{$l("cookie_policy.title")}</a
                >
                <a class="block" href="/return-policy"
                    >{$l("return_policy.title")}</a
                >
                <a class="block mt-2" href="https://anpc.ro/ce-este-sal/">
                    <img
                        src="/images/legalstuff/sal.webp"
                        alt="Soluționarea Alternativă a Litigiilor"
                    />
                </a>
                <a
                    class="block"
                    href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
                >
                    <img
                        src="/images/legalstuff/sol.webp"
                        alt="Soluționarea Alternativă a Litigiilor"
                    />
                </a>
            </div>
            <div>
                <span class="font-bold">{$l("footer.contact")}</span>
                {#each CONTACT_EMAIL as email}
                    <address>{email}</address>
                {/each}
                {#each CONTACT_PHONE as phone}
                    <address>{phone}</address>
                {/each}
                <a class="text-vspot-link" href="/contact"
                    >{$l("footer.seedetails")}</a
                >
            </div>
        </div>
    </div>
    <div
        class="justify-center mx-auto mt-2 border-vspot-secondary-bg pt-2 lg:max-w-[1100px]"
    >
        <span>{$l("footer.seo")}</span>
    </div>
</footer>
