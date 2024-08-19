<script>
    import { CONTACT_EMAIL, CONTACT_PHONE } from "$lib/contact/info";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.tos"))}</title>
</svelte:head>

<section>
    <h1
        class="!text-6xl font-semibold flex items-center"
    >
        {$l("page.tos")}
    </h1>
    <div class="space-y-8">
        <span> Ultima actualizare: 19/08/2024 </span>
        <section class="space-y-2">
            <h1 class="font-bold text-lg">1. Definitii</h1>
            <ul>
                <li>
                    <b>Compania</b> (noi, societatea) se refera la Societatea Terrible
                    Fortune SRL, CUI: 49657195, Numar de inregistrare la registrul
                    comertului: J33/380/26.02.2024, Sediu social: Romania, Suceava,
                    Falticeni, Strada Sucevei, Nr. 85.
                </li>
                <li>
                    <b>Administrator</b> se refera la o persoana cu titlul oficial
                    de adminstrator in societate.
                </li>
                <li>
                    <b>Site</b> (pagina) se refera la orice resursa accesibila pe
                    domeniul vspot.ro dar si orice alt subdomeniu al vspot.ro, fiind
                    detinute si administrate de noi.
                </li>
                <li>
                    <b>Utilizator</b> (dumneavoastra, client) se refera la orice
                    persoana fizica/juridica ce NU este asociata cu societatea, care
                    foloseste serviciile/produsele oferite de site in oricare masura.
                </li>
                <li>
                    <b>Termenii serviciului</b> (Termenii si conditiile, termeni
                    ai serviciului) se refera la termenii de pe aceasta pagina ce
                    formeaza un contract intre dumneavoastra si noi.
                </li>
                <li>
                    <b>Contul</b> se refera la combinatia de date ce va identifica
                    pe serverele noastre.
                </li>
                <li>
                    <b>Comanda</b> se refera la o comanda de produse plasata de dumneavoastra
                    prin intermediul site-ului nostru.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">2. Acceptarea termenilor</h1>
            <ul>
                <li>
                    Prin folosirea oricarui produs si/sau serviciu oferit de
                    site, acceptati implicit acesti termeni ai serviciului. Daca
                    nu sunteti de acord cu acesti termeni, NU folositi
                    serviciile si/sau produsele oferite prin intermediul
                    site-ului.
                </li>
                <li>
                    Ne rezervam dreptul de a actualiza acesti termeni in functie
                    de legislatie si/sau schimbari interne fara notificare
                    prealabila.
                </li>
                <li>
                    Utilizatorul site-ului este obligat sa citeasca acesti
                    termeni inainte de a folosi serviciile si/sau produsele puse
                    la dispozitie prin intermediul site-ul in orice masura.
                </li>
                <li>
                    Produsele/serviciile oferite de site sunt destinate strict
                    persoanelor cu varsta minima de 18 ani. Prin acceptarea
                    acestori termeni, declarati pe propria raspundere ca aveti
                    varsta minima de 18 ani.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">3. Contul utilizatorului</h1>
            <ul>
                <li>
                    Cand va creati un cont pe site-ul nostru, trebuie sa va
                    asigurati ca datele pe care le introduceti sunt corecte si
                    valabile in acel moment. Daca intervine o schimbare la
                    aceste date dupa crearea contului, aveti obligatia de a
                    actualiza datele pentru a reflecta aceste schimbari. In caz
                    contrar, se considera ca ati incalcat termenii serviciului.
                </li>
                <li>
                    Sunteti responsabil pentru pastrarea in mod sigur a parolei
                    folosite pentru contul dumneavoastra.
                </li>
                <li>
                    Impartasirea datelor de intrare in cont cu o alta
                    persona/entitate este interiza si va rezulta incalcarea
                    termenii serviciului.
                </li>
                <li>
                    In cazul in care ati aflat ca o alta persoana/entitate stie
                    datele dumneavoastra de intrare in cont, aveti obligatia de
                    a ne anunta imediat.
                </li>
                <li>
                    Folosirea detelor de identificare a unei persoane/enititati
                    ce nu va apartin/la care nu aveti acces in mod legal este
                    interzisa si va rezulta incalcarea termenii serviciului.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">4. Drepturi de autor</h1>
            <span class="block">
                Utilizatorul nu are voie sa descarce/sa foloseasca continutul
                site-ului (imagini, descrieri, elemente grafice, fonturi,
                fisiere sursa, etc) fara acordul scris al administratorului,
                intrucat reprezinta proprietatea noastra, fiind aparata de
                legile dreptului de autor si legile proprietatilor intelectuale.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">5. Plata</h1>
            <ul>
                <li>
                    Numerar la livrare: Puteti plati o comanda in numerar cand
                    preluati comanda de la agentia de curierat fara nici o taxa
                    adaugata.
                </li>
                <li>
                    Card prin intermediul online: Puteti plati o comanda
                    folosind cardul prin intermediul online cu 3DSecure.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">6. Comanda, Preturi</h1>
            <ul>
                <li>
                    Ne rezervam dreptul de a refuza comenzi in valoare mai mica
                    de 200 RON plasate prin intermediul site-ului in judetul
                    Suceava, localitatea Falticeni si in imprejurimi.
                </li>
                <li>
                    O comanda plasat pe site nu reprezinta o obligatie legala
                    din partea noastra, pana nu este confirmata de catre noi. In
                    cazul in care o comanda a fost platita prin intermediul
                    online (card) si este respinsa de catre noi, valoarea
                    comenzii va fi restituita intr-un maxim de 14 zile
                    lucratoare in contul din care s-a facut plata, dupa anularea
                    acesteia.
                </li>
                <li>
                    Preturile afisate pe site pot sa difere fata de preturile
                    din locatiile fizice.
                </li>
                <li>Preturile afisate pe site contin TVA.</li>
                <li>
                    Odata ce o comanda a fost confirmata de noi cu un anumit
                    pret, acela va fi pretul final imprimat pe factura.
                </li>
                <li>
                    In anumite situatii vom incerca sa va contactam telefonic
                    sau prin email in cazul unei schimbari legate de comanda
                    dumneavoastra (pret, disponibilitate produse, neclaritati,
                    etc.) inainte ca aceasta sa fie confirmata.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 id="shipping" class="font-bold text-lg">7. Livrare</h1>
            <ul>
                <li>
                    Livrarea comenzii se face in 1-2 zile de la confirmarea ei
                    de catre noi, pentru comenzile plasate de luni pana vineri
                    in intervalul orar 9:00 - 12:00. Daca comanda a fost plasata in afara acestui interval, livrarea se va face intr-un termen de 1-2 zile incepand cu urmatoarea zi lucratoare. Acest estimat de livrare
                    poate varia in cazul in care agentia de curierat intampina
                    neprevazute.
                </li>
                <li>
                    Pentru orice comanda costul transportul este de 25 RON,
                    oriunde pe teritoriul Romaniei prin agentia de curierat Fan
                    Courier.
                </li>
                <li>
                    Ne luam angajamentul de a livra comanda intr-un maxim de 30
                    de zile lucratoare de la confirmarea comenzii de catre noi,
                    indiferent de orice neprevazute ce pot interveni din partea
                    agentiei de curierat.
                </li>
                <li>
                    In cazul in care nu putem onora angajamentul de la
                    subpunctul anterior, valoare comenzii va fi restituita (in
                    cazul in care plata comenzii a fost efectuata cu cardul),
                    intr-un maxim de 14 zile lucratoare in contul din care s-a
                    facut plata, dupa termenul de 30 de zile lucratoare de la
                    confirmarea comenzii.
                </li>
                <li>
                    Clientul are dreptul de a refuza primirea comenzii in oricare etapa a procesului de livrare fara nici un cost aditional. Daca clientul a refuzat livrarea, valoare comenzii va fi restituita in contul din care s-a facut plata (in cazul in care plata s-a facut cu cardul online), intr-un termen de maxim 7 zile de la reintoarcerea comenzii inapoi la noi.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">8. Anularea unei comenzi, Retur</h1>
            <ul>
                <li>
                    Clientul poate anula o comanda plasata prin intermediul
                    site-ului, contactându-ne prin oricare dintre modalitatile
                    gasite
                    <a class="text-lg text-vspot-link" href="/contact">
                        aici
                    </a>. Daca coletul a fost predat deja curierului de catre
                    noi, clientul poate refuza coletul in ziua in care trebuie
                    sa ajunga la el, fara nici o penalitate. In cazul in care o
                    comanda a fost platita prin intermediul online (card),
                    valoarea comenzii va fi restituita intr-un maxim de 14 zile
                    lucratoare in contul din care s-a facut plata, dupa ce
                    coletul ajunge inapoi la noi.
                </li>
                <li>
                    Clientii beneficiaza de retur pentru produsele comandate, in
                    cadrul <a
                        class="text-lg text-vspot-link"
                        href="/return-policy"
                    >
                        Politicii de retur</a
                    >.
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                9. Prelucrarea si stocarea datelor
            </h1>
            <ul>
                <li>
                    Mentionam ca in cazul in care achitati o comanda online
                    folosind card-ul bancar, datele cardului dumneavoastra nu
                    vor fi procesate si retinute de noi sub nicio forma. Ele vor
                    fi procesate de procesatorul nostru de plati.
                </li>
            </ul>
            <span class="block">
                Politica GDPR pentru prelucrarea datelor cu caracter personal
                poate fi gasita pe pagina <a
                    class="text-lg text-vspot-link"
                    href="/privacy-policy">Politica de Confidentialitate</a
                >.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                10. Incalcarea acestor termeni, Inchiderea contului de catre noi
            </h1>
            <span class="block">
                Incalcarea acestor termeni si/sau exploatarea in oricare masura
                a serviciilor si/sau produser oferite prin indermediul
                site-ului, reprezinta incalcarea acestui contract. In acest caz
                va putem inchide contul si refuza prestarea serviciilor pe
                termen nedeterminat.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">11. Litigii</h1>
            <span class="block">
                In caz de litigiu, se poate inregistra o reclamatie folosind una
                dintre metodele de contact gasite
                <a class="text-vspot-link" href="/contact">aici</a>, fie prin
                e-mail sau telefonic. Daca acest procedeu nu duce la
                solutionarea conflictului, consumatorul are optiunea de a apela
                la
                <a href="https://anpc.ro/ce-este-sal" class="text-vspot-link">
                    Solutionarea Alternativa A Litigiilor
                </a>
                sau
                <a
                    href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
                    class="text-vspot-link"
                >
                    Solutionarea Online A Litigiilor
                </a>. Link-uri catre ambele optiuni sunt disponibile oricand la
                finalul paginii in rubrica "{$l("footer.legal")}".
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">12. Raspundere limitata</h1>
            <span class="block">
                Nu purtam raspundere in cazul in care site-ul nu este accesibil
                din motive tehnice (mentenanta, eroare umana, neprevazute,
                etc.).
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">13. Contact</h1>
            Pentru orice intrebari va rugam sa ni le adresati prin:
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
        </section>
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
