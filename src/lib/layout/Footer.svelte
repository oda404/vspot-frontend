<script>
    import { CONTACT_EMAIL, CONTACT_PHONE } from "$lib/contact/info";
    import { l } from "$lib/langs";
    import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import FooterSection from "./FooterSection.svelte";
</script>

<footer
    class=" border-t border-vspot-green w-full p-10 lg:p-28 flex-col space-y-8 justify-center"
>
    <div
        class="flex flex-col lg:flex-row lg:space-x-32 lg:items-start lg:w-[1100px] mx-auto lg:space-y-0 space-y-10"
    >
        <FooterSection title={$l("footer.products")}>
            <a class="block" href="/disposable">{$l("product.disposables")}</a>
            <a class="block" href="/pouch">{$l("product.pouches")}</a>
            <a class="block" href="/smoking">{$l("product.smoking")}</a>
            <a class="block" href="/liquid">{$l("product.liquids")}</a>
            <a class="block" href="/kit">{$l("product.kits")}</a>
        </FooterSection>
        <FooterSection title={$l("footer.locations")}>
            <address class="whitespace">
                RO Suceava, Falticeni, Ana Iapatescu 14
            </address>
        </FooterSection>
        <FooterSection title={$l("footer.legal")}>
            <a class="block" href="/tos">{$l("page.tos")}</a>
            <a class="block" href="/privacy-policy"
                >{$l("page.privacy_policy")}</a
            >
            <a class="block" href="/cookie-policy">{$l("page.cookie_policy")}</a
            >
            <a class="block" href="/return-policy">{$l("page.return_policy")}</a
            >
            <a class="block w-[200px]" href="https://anpc.ro/ce-este-sal/">
                <img
                    src="/images/legalstuff/sal.webp"
                    alt="Soluționarea Alternativă a Litigiilor"
                />
            </a>
            <a
                class="block w-[200px]"
                href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
            >
                <img
                    src="/images/legalstuff/sol.webp"
                    alt="Soluționarea Alternativă a Litigiilor"
                />
            </a>
        </FooterSection>
        <FooterSection title={$l("footer.contact")}>
            {#each CONTACT_EMAIL as email}
                <div class="flex items-center space-x-2">
                    <Fa icon={faEnvelope} />
                    <address>{email}</address>
                </div>
            {/each}
            {#each CONTACT_PHONE as phone}
                <div class="flex items-center space-x-2">
                    <Fa icon={faPhone} />
                    <address>{phone}</address>
                </div>
            {/each}
            <a class="text-vspot-link" href="/contact"
                >{$l("footer.seedetails")}</a
            >
        </FooterSection>
    </div>
    <div
        class="mx-auto lg:max-w-[1100px] border-t border-vspot-secondary-bg pt-4"
    >
        <span>{$l("footer.seo")}</span>
    </div>
    <div class="mx-auto lg:max-w-[1100px]">
        <span>Terrible Fortune SRL |</span>
        <span>CUI: 49657195 |</span>
        <span>J33/380/26.02.2024 |</span>
        <span>Romania, Suceava, Falticeni, Strada Sucevei, Nr. 85 |</span>
        <span>Capital social: 200 RON</span>
    </div>
</footer>
