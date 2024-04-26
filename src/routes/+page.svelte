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

    export let data;
</script>

<svelte:head>
    <title>{pagetitle_make($l("home.title"))}</title>
</svelte:head>

<div class="space-y-16">
    <div class="space-y-10 lg:space-y-0 lg:flex lg:space-x-10">
        <div class="space-y-8 lg:w-[60%]">
            <div class="text-7xl lg:text-8xl font-semibold opacity-80">
                {$l("home.title")}
            </div>
        </div>
        <div
            class="w-full lg:w-[40%] h-fit space-y-4 p-4 border-l border-vspot-green drop-shadow flex flex-col"
        >
            <LinkButton simple href="/disposables">
                <div class="text-3xl">{$l("product.disposables")}</div>
            </LinkButton>
            <LinkButton simple href="/smoking">
                <div class="text-3xl">{$l("product.smoking")}</div>
            </LinkButton>
            <LinkButton simple href="/pouches">
                <div class="text-3xl">{$l("product.pouches")}</div>
            </LinkButton>
            <LinkButton simple href="/liquids">
                <div class="text-3xl">{$l("product.liquids")}</div>
            </LinkButton>
            <LinkButton simple href="/kits">
                <div class="text-3xl">{$l("product.kits")}</div>
            </LinkButton>
        </div>
    </div>
    <div class="p-4 rounded-b-lg border-vspot-purple">
        <div class="flex items-center justify-between">
            <span class="text-2xl"> Produse noi </span>
            <a href="/new" class=""> Vezi toate </a>
        </div>
        <div class="flex">
            <!-- <Product product={  } /> -->
        </div>
    </div>
    <div class="p-4 rounded-b-lg space-y-2 border-vspot-purple">
        <span class="text-2xl"> Doar cele mai bune branduri </span>
        <div class="flex justify-between">
            <img src="/images/vozol/vozol.png" alt="Vozol" class="h-[60px]" />
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
            <img src="/images/nasty/nasty.webp" alt="Vozol" class="h-[60px]" />
        </div>
    </div>

    <div class="bg-vspot-primary-bg flex justify-between">
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
                class="text-sm text-[#0055EE] hover:text-[#0000EE]"
                href="/return-policy">*Vezi politica de retur</a
            >
        </SiteFeatureBox>
        <SiteFeatureBox
            img_url={"/images/ahh.png"}
            title="Satisfactie totala"
            description="Atat am avut de spus"
        />
    </div>
</div>
