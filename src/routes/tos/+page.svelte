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
        class="!text-6xl lg:!text-9xl font-[Blowhole] font-semibold opacity-80 flex items-center"
    >
        {$l("page.tos")}
    </h1>
    <div class="space-y-8">
        <span> Ultima actualizare: 29/05/2024 </span>
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
            <h1 class="font-bold text-lg">5. Comanda, Preturi</h1>
            <ul>
                <li>
                    Ne rezervam dreptul de a refuza comenzi in valoare mai mica
                    de 200 RON plasate prin intermediul site-ului in judetul
                    Suceava, localitatea Falticeni si in imprejurimi.
                </li>
                <li>
                    O comanda plasat pe site nu reprezinta o obligatie legala
                    din partea noastra, pana nu este confirmata.
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
            <h1 class="font-bold text-lg">6. Livrare, Retur</h1>
            <ul>
                <li>
                    Livrarea comenzii se face in 1-2 zile de la confirmarea ei
                    pentru comenzile plasate de luni pana pineri in intervalul
                    orar 10:30 - 12:30. Acest estimat de livrare poate varia in
                    cazul in care firma de curierat intampina dificultati.
                </li>
                <li>
                    Ne luam angajamentul de a livra comanda intr-un maxim de 30
                    de zile de la confirmarea comenzii. In caz contrar veti
                    primi banii inapoi (doar daca plata a fost efectuata prin
                    mediul online folosind cardul sau OP in functie de caz).
                </li>
                <li>
                    Politica de retur poate fi gasita pe pagina "Politica Retur" <a
                        class="text-lg text-vspot-link"
                        href="/return-policy">aici</a
                    >
                </li>
            </ul>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">7. Prelucrarea datelor</h1>
            <span class="block">
                Politica GDPR pentru prelucrarea datelor cu caracter personal
                poate fi gasita pe pagina "Politica de Confidentialitate" <a
                    class="text-lg text-vspot-link"
                    href="/privacy-policy">aici</a
                >
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                8. Incalcarea acestor termeni, Inchiderea contului de catre noi
            </h1>
            <span class="block">
                Ne rezervam dreptul de a ne alege clientii. Ca si rezultat, va
                putem inchide contul si/sau refuza prestarea de servicii in
                cazul in care termenii servicului au fost incalcati de catre
                utilizator sau utilizatorul exploateaza in orice masura
                serviciile si/sau produsele oferite prin intermediul site-ului.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">9. Litigii</h1>
            <span class="block">
                In caz de litigiu, daca inregistrarea unei reclamatii pe site-ul
                nostru folosind una dintre metodele de contact gasite
                <a class="text-vspot-link" href="/contact">aici</a> nu are
                efect, aveti optiunea de a apela la Solutionarea Alternativa A
                Litigiilor sau Solutionarea Online A Litigiilor. Ambele pot fi
                gasite la finalul paginii sub rubrica "{$l("footer.legal")}".
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">10. Raspundere limitata</h1>
            <span class="block">
                Nu purtam raspundere in cazul in care serviciile puse la
                dispozitie de noi catre clienti nu sunt accesibile din motive
                tehnice (mentenanta, eroare umana (dobitocul de la IT a detonat
                reteaua si/sau serverul), neprevazute, etc.).
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">11. Contact</h1>
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

<style>
    h1 {
        @apply text-2xl;
    }
    span,
    b,
    li {
        @apply text-lg;
    }
</style>
