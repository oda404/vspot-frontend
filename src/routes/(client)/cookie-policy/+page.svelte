<script>
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import Fa from "svelte-fa";
    import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.cookie_policy"))}</title>
</svelte:head>

<section>
    <h1
        class="!text-6xl lg:!text-9xl font-[Blowhole] font-semibold flex items-center"
    >
        {$l("page.cookie_policy")}
        <Fa class="ml-4" size="sm" icon={faCookieBite} />
    </h1>
    <div class="space-y-8">
        <span> Ultima actualizare: 29/05/2024 </span>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">Introducere</h1>
            <span class="block">
                Prezenta Politică privind fișierele cookies se aplică tuturor
                utilizatorilor paginii de internet <b class="text-lg"
                    >www.vspot.ro</b
                >.<br /> Informațiile prezentate în continuare au ca scop informarea
                utilizatorilor acestei pagini de internet cu privire la plasarea,
                utilizarea și administrarea cookie-urilor de către Terrible Fortune
                SRL în contextul navigării utilizatorilor pe această pagină de internet.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">Ce este un "cookie"?</h1>
            <span class="block">
                Folosim termenul „cookie”-uri pentru a ne referi la modulele
                cookie și la tehnologiile similare prin intermediul cărora pot
                fi colectate informații în mod automat. Un „Internet Cookie”
                (termen cunoscut și sub denumirea de „browser cookie” sau „HTTP
                cookie” ori „cookie”) reprezintă un fișier de mici dimensiuni,
                format din litere și numere, care va fi stocat pe computerul,
                terminalul mobil sau pe alte echipamente ale unui utilizator
                prin intermediul cărora se accesează internetul.
            </span>
            <span class="block">
                Cookie-urile sunt instalate prin solicitarea emisă de un
                web-server către un browser (de ex.: Internet Explorer, Firefox,
                Chrome) Cookie-urile odată instalate au o durată de existență
                determinată, rămânând „pasive”, în sensul că nu conțin programe
                software, viruși sau spyware și nu vor accesa informațiile de pe
                hard driverul utilizatorului pe al cărui echipament au fost
                instalate. Un cookie este format din două părți: numele
                cookie-ului; și conținutul sau valoarea cookie-ului. Din punct
                de vedere tehnic, doar web-serverul care a trimis cookie-ul îl
                poate accesa din nou în momentul în care un utilizator se
                întoarce pe pagina de internet asociată web-serverului
                respectiv.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                Pentru ce scopuri sunt utilizate cookie-urile prin intermediul
                acestei pagini de internet:
            </h1>
            <span class="block">
                Cookie-urile sunt utilizate pentru a furniza utilizatorilor
                acestei pagini de internet o experiență mai bună de navigare și
                servicii adaptate nevoilor și interesului fiecărui utilizator în
                parte și anume pentru:
                <ul class="list-disc mt-2">
                    <li class="list-item">
                        Imbunătățirea utilizării acestei pagini de internet,
                        inclusiv prin identificarea oricăror erori care apar în
                        timpul vizitării/utilizării acesteia de către
                        utilizatori
                    </li>
                    <li class="list-item">
                        Furnizarea de statistici anonime cu privire la modul în
                        care este utilizată această pagină de internet către
                        Terrible Fortune SRL, în calitate de deținător al
                        acestei pagini de internet
                    </li>
                    <li class="list-item">
                        Anticiparea unor eventuale bunuri care vor fi în viitor
                        puse la dispoziția utilizatorilor prin intermediul
                        acestei pagini de internet, în funcție de serviciile /
                        produsele accesate.
                    </li>
                </ul>
            </span>
            <span class="block">
                Pe baza feedback-ului transmis prin cookie-uri în legătură cu
                modul în care se utilizează această pagină de internet, Terrible
                Fortune SRL poate adopta măsuri pentru ca această pagină de
                internet să fie mai eficientă și mai accesibilă pentru
                utilizatori. Astfel, utilizarea cookie-urilor permite memorarea
                anumitor setări/preferințe stabilite de către utilizatorii
                acestei pagini de internet, precum:
                <ul class="list-disc mt-2">
                    <li class="list-item">
                        Limba în care este vizualizată o pagină de internet
                    </li>
                    <li class="list-item">
                        Facilitarea accesului în contul utilizatorilor
                    </li>
                    <li class="list-item">
                        Memorarea produselor din cosul de cumparaturi intre
                        vizitele pe site
                    </li>
                </ul>
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                Care este durata de viață a cookie-urilor?
            </h1>
            <span class="block">
                Durata de viață a cookie-urilor poate varia semnificativ,
                depinzând de scopul pentru care este plasat. Există următoarele
                categorii de cookie-uri care determină și durata de viață a
                acestora:
                <ul class="list-disc mt-2">
                    <li class="">
                        <b class="text-lg">Cookie-uri de sesiune</b> – Un „cookie
                        de sesiune” este un cookie care este șters automat când utilizatorul
                        își închide browserul.
                    </li>
                    <li class="">
                        <b class="text-lg">Cookie-uri persistente sau fixe</b> –
                        Un „cookie persistent” sau „fix” este un cookie care rămâne
                        stocat în terminalul utilizatorului până când atinge o anumită
                        dată de expirare (care poate fi în câteva minute, zile sau
                        câțiva ani în viitor) sau până la ștegerea acestuia de către
                        utilizator în orice moment prin intermediul setărilor browserului.
                    </li>
                </ul>
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                Ce sunt cookie-urile plasate de terți?
            </h1>
            <span class="block">
                Anumite secțiuni de conținut de pe pagina de internet pot fi
                furnizate prin intermediul unor terți, adică nu de către
                Terrible Fortune SRL, caz în care aceste cookie-uri sunt
                denumite cookie-uri plasate de terți („third party cookie-uri”).
            </span>
            <span class="block">
                Terții furnizori ai cookie-urilor trebuie să respecte, de
                asemenea, regulile în materie de protecție a datelor și Politica
                de Confidențialitate. Aceste cookie-uri pot proveni de la
                urmatorii terți:
                <ul class="list-disc mt-2">
                    <li class="">Cloudflare</li>
                </ul>
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                Ce cookie-uri sunt folosite prin intermediul acestei pagini de
                internet:
            </h1>
            <span>
                Prin utilizarea/vizitarea paginii de internet pot fi plasate
                următoarele cookie-uri:
                <div class=" mt-2">
                    <h1 class="text-vspot-purple font-bold !text-md">
                        Cookie-uri de performanță a paginii de internet
                    </h1>
                    <span>
                        Prin acest tip de cookie-uri sunt memorate preferințele
                        utilizatorului acestei pagini de internet, astfel încât
                        setarea din nou a preferințelor în cazul vizitării
                        ulterioare a paginii de internet nu mai este necesară.
                    </span>
                </div>
                <!-- <div class=" mt-2">
                    <h1 class="text-vspot-purple font-bold !text-md">
                        Cookie-uri de analiză a utilizatorilor
                    </h1>
                    <span>
                        Aceste cookie-uri ne informează dacă un anumit
                        utilizator al paginii de internet a mai vizitat/utilizat
                        această pagină de internet anterior. Aceste cookie-uri
                        sunt utilizate doar în scopuri statistice.
                    </span>
                </div> -->
                <div class=" mt-2">
                    <h1 class="text-vspot-purple font-bold !text-md">
                        Cookie-uri de înregistrare
                    </h1>
                    <span>
                        Atunci când vă înregistrați pe acest site, se generează
                        cookie-uri care memorează acest demers. Serverele
                        utilizează aceste cookie-uri pentru a ne arăta contul cu
                        care sunteți înregistrat. De asemenea, utilizarea
                        acestor cookie-uri permite să asociem orice comentariu
                        postat pe pagina de internet cu username-ul contului
                        folosit. În cazul în care nu a fost selectată opțiunea
                        „păstrează-mă înregistrat”, aceste cookie-uri se vor
                        șterge automat la momentul terminării sesiunii de
                        navigare.
                    </span>
                </div>
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                Ce tip de informații sunt stocate și accesate prin intermediul
                cookie-urilor?
            </h1>
            <span class="block">
                Cookie-urile păstrează informații într-un fișier text de mici
                dimensiuni care permit recunoașterea browserului. Această pagină
                de internet recunoaște browserul până când cookie-urile expiră
                sau sunt șterse.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">
                Particularizarea setările browserului în ceea ce privește
                cookie-urile
            </h1>
            <span class="block">
                În cazul în care utilizarea cookie-urilor nu este deranjantă iar
                calculatorul sau echipamentul tehnic utilizat pentru navigarea
                pe această pagină de internet este folosit doar de către
                dumneavoastră, pot fi setate termene lungi de expirare pentru
                stocrarea istoricului de navigare. În cazul în care calculatorul
                sau echipamentul tehnic utilizat pentru navigarea pe această
                pagină de internet este folosit de mai multe persoane, poate fi
                luată în considerare setarea pentru ștergerea datelor
                individuale de navigare de fiecare dată când browserul este
                închis.
            </span>
        </section>

        <section class="space-y-2">
            <h1 class="font-bold text-lg">Cum pot fi oprite cookie-urile?</h1>
            <span class="block">
                <b class="text-lg">
                    Dezactivarea și refuzul de a primi cookie-uri pot face
                    această pagină de internet dificil de vizitat, atrăgând după
                    sine limitări ale posibilităților de utilizare ale acesteia.
                </b>
                <br />
            </span>
            <span class="block">
                Utilizatorii își pot configura browserul să respingă fișierele
                cookie sau să fie acceptate cookie-uri de la o pagină de
                internet anume. Toate browserele moderne oferă posibilitatea de
                a schimba setările cookie-urilor. Aceste setări pot fi accesate,
                ca regulă, în secțiunea „opțiuni” sau în meniul de „preferințe”
                al browserului tău. Totuși, refuzarea sau dezactivarea
                cookie-urilor nu înseamnă că nu veți mai primi publicitate
                online – ci doar ca aceasta nu va fi adaptată preferințelor și
                interesele dumneavoastră, evidențiate prin comportamentul de
                navigare. Pentru a înțelege aceste setări, următoarele linkuri
                pot fi folositoare:
                <ul class="list-disc mt-2">
                    <li class="">
                        <a
                            class="text-vspot-link"
                            target="_blank"
                            href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
                            >Cookie settings in Internet Explorer</a
                        >
                    </li>
                    <li class="">
                        <a
                            class="text-vspot-link"
                            target="_blank"
                            href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                            >Cookie settings in Firefox</a
                        >
                    </li>
                    <li class="">
                        <a
                            class="text-vspot-link"
                            target="_blank"
                            href="https://support.google.com/chrome/answer/95647"
                            >Cookie settings in Chrome</a
                        >
                    </li>
                    <li class="">
                        <a
                            class="text-vspot-link"
                            target="_blank"
                            href="https://www.apple.com/legal/privacy/en-ww/cookies/"
                            >Cookie settings in Safari</a
                        >
                    </li>
                </ul>
            </span>
        </section>
        <section>
            <span>
                Pentru orice întrebări suplimentare cu privire la modul în sunt
                utilizate cookie-urile prin intermediul acestei pagini de
                internet, vă rugăm să ne contactati folosind una dintre metodele
                gasite <a class="text-lg text-vspot-link" href="/contact"
                    >aici</a
                >.
            </span>
        </section>
    </div>
</section>

<style lang="postcss">
    h1 {
        @apply text-2xl;
    }
    span,
    li {
        @apply text-lg;
    }
</style>
