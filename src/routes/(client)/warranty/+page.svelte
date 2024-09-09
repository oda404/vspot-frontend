<script>
    import { CONTACT_EMAIL, CONTACT_PHONE } from "$lib/contact/info";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<svelte:head>
    <title>{pagetitle_make("Garantia produselor")}</title>
</svelte:head>

<section>
    <h1 class="!text-4xl font-semibold flex items-center">
        Garantia produselor
    </h1>
    <div class="space-y-8">
        <span> Ultima actualizare: 09/09/2024 </span>
        <span class="block">
            Toate produsele achizitionate de pe vspot.ro beneficiaza de garantie
            comerciala de minim 2 ani, mai putin produsele care sunt considerate
            consumabile si au garantie redusa in functie de caz. Durata
            garantiei unui produs este specificata pe pagina produsului
            respectiv. Pentru a beneficia de garantie trebuie sa aveti
            factura/bonul fiscal impreuna cu toate accesoriile si ambalajele
            originale ale produsului.
        </span>
        <span class="block">
            Forma garantiei unui produs poate fi sub 2 forme:
            <ul>
                <li>Inlocuirea produsului cu un alt produs de acelasi tip</li>
                <li>Restituirea contravaloarii produsului</li>
            </ul>
            <br />
            <span>
                Clientul are dreptul de a-si alege daca produsul defect va fi
                inlocuit sau contravaloarea lui restituita. Inlocuirea
                produselor se poate face doar in limita stocului disponibil. In
                cazul in care un produs nu se mai afla in stoc, clientului ii va
                fi restituita contravaloarea produsului.
            </span>
        </span>
        <section class="block">
            <h1>Initierea procesului de garantie</h1>
            <span>
                Pentru a initia procesul de trimitere in garantie, clientul
                trebuie sa ne contacteze folosind una din metodele de mai jos,
                specificand:
            </span>
            <ul>
                <li>Numarul de comanda</li>
                <li>Produsele defecte</li>
                <li>Descrierea defectelor</li>
                <li>
                    Daca clientul doreste un produs inlocuitor sau contravaloare
                    produsului restituita, pentru fiecare produs
                </li>
                <li>
                    IBAN-ul contului bancar in care se va face restituirea
                    contravalorii dupa caz
                </li>
                <li>
                    Adresa de la care vor fi ridicate produsele defecte de catre
                    firma de curierat
                </li>
            </ul>
            <br />
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
            <div class="flex items-center space-x-2">
                <Fa icon={faPhone} />
                <b>{$l("contact.phone")}</b>
            </div>
            {#each CONTACT_PHONE as phone}
                <li class="list-item">{phone}</li>
            {/each}
            <small>{$l("contact.fees")}</small>
            <br />
            <br />
            <span
                >Toate costurile de transport sunt suportate de catre noi,
                conform legii in vigoare.</span
            >
            <span class="block">
                Dupa confirmarea din partea noastra, un curier va fi trimis de
                catre noi la adresa specificata de catre client pentru a prelua
                produsele.
            </span>
            <span class="block">
                In coletul preluat de la client trebuie sa se afle factura/bonul
                fiscal si produsele defecte impreuna cu toate accesoriile si
                ambalajele lor orginale, impachetate corespunzator.
            </span>
            <span>
                Produsele inlocuitoare/restituirea contravaloarii produselor se
                va face in maxim 14 zile din momentul in care produsele defecte
                ajung la producator si se constata defectiunile.
            </span>
        </section>
        <section class="block">
            <h1>Nu se acorda garantie in urmatoarele cazuri</h1>
            <ul>
                <li>
                    Produsele prezinta urme de defectiuni fizice (lovituri,
                    zgarieturi).
                </li>
                <li>Produsele au sigilii lipsa.</li>
                <li>
                    Produsele au marcajele identificatoare sterse sau lipsa.
                </li>
                <li>
                    Produsele sunt de natura consumabila cum ar fi: rezistente,
                    atomizoare, cartuse, e-lichide, foite pentru tigari, filtre
                    pentru tigari, capsule pentru tigari, conuri, plicuri cu
                    nicotina.
                </li>
                <li>
                    Produsele prezinta urme de folosire in moduri
                    necorespunzatoare sau in alte scopuri decat cele pentru care
                    a fost proiectat.
                </li>
                <li>
                    Produsele prezinta urme de interventii asupra lor de catre
                    persoane neautorizate. In cazul interventiilor de catre
                    persoane autorizate trebuie furnizate dovezile acestora.
                </li>
                <li>
                    Produsele nu sunt insotite de toate accesoriile si
                    ambalajele originale.
                </li>
            </ul>
        </section>
        <section>
            <h1>Se acorda garantie redusa in urmatoarele cazuri</h1>
            <ul>
                <li>
                    Produsele sunt de tip tigara electronica de unica folosinta
                    sau cartuse pre-umplute, caz in care beneficiaza de garantie
                    redusa de doar 24 ore, deoarece aceea este perioada medie de
                    folosire al acestor tipuri de produse.
                </li>
            </ul>
        </section>
        <span class="block">
            Toate detaliile priviind garantiile produselor le puteti vedea in
            OUG nr. 140 din 28 decembrie 2021.
        </span>
        <br />
        {#if CONTACT_EMAIL.length > 0}
            <span>
                Daca aveti neclaritati cu privire la garantie, va rugam sa ne
                contactati la adresa de email <b>{CONTACT_EMAIL[0]}</b>.
            </span>
        {/if}
    </div>
</section>

<style lang="postcss">
    h1 {
        @apply text-2xl;
    }
    span,
    b,
    li {
        @apply text-lg;
    }
</style>
