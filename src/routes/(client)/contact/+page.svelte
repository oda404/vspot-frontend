<script>
    import { CONTACT_EMAIL, CONTACT_PHONE } from "$lib/contact/info";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.contact"))}</title>

    <meta
        name="description"
        content="Contactati-ne folosind una din metodele de pe aceasta pagina pentru orice sesizari sau intrebari legate de serviciile noastre."
    />
</svelte:head>

<section>
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold">Contact</h1>
    <div class="my-4" />
    <span class="text-lg font-semibold opacity-90 text-vspot-text-hovered">
        {$l("contact.description")}
    </span>
    <address class="space-y-4 mt-4">
        {#if CONTACT_PHONE.length > 0}
            <ul class="list-disc">
                <div class="flex items-center space-x-2">
                    <Fa icon={faPhone} />
                    <b>{$l("contact.phone")}</b>
                </div>
                {#each CONTACT_PHONE as phone}
                    <li class="list-item">{phone}</li>
                {/each}
                <small>{$l("contact.fees")}</small>
            </ul>
        {/if}
        {#if CONTACT_EMAIL.length > 0}
            <ul class="list-disc">
                <div class="flex items-center space-x-2">
                    <Fa icon={faEnvelope} />
                    <b>Email:</b>
                </div>
                {#each CONTACT_EMAIL as email}
                    <li class="list-item">{email}</li>
                {/each}
            </ul>
        {/if}
    </address>
    <span class="block mt-4">
        {$l("contact.schedule")}
    </span>
    <div class="mt-4 block border-t border-vspot-secondary-bg pt-2">
        <span class="block"> Terrible Fortune S.R.L. </span>
        <span class="block"> CUI: 49657195 </span>
        <span>J33/380/26.02.2024</span>
        <span class="block">
            {$l("contact.hq", {
                address: "Romania, Suceava, Falticeni, Strada Sucevei, Nr. 85",
            })}
        </span>
        <span class="block">
            {$l("contact.capital", { n: "200 RON" })}
        </span>
    </div>
</section>
