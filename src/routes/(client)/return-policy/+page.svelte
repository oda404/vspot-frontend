<script>
    import { CONTACT_EMAIL, CONTACT_PHONE } from "$lib/contact/info";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.return_policy"))}</title>
</svelte:head>

<section>
    <h1 class="!text-5xl font-semibold flex items-center">
        {$l("page.return_policy")}
    </h1>
    <div class="space-y-8">
        <span> Ultima actualizare: 19/08/2024 </span>
        <section class="space-y-2">
            <h1 id="refuse_shipping" class="font-bold text-lg">
                Refuz primire comanda
            </h1>
            <span>
                Clientul are dreptul de a refuza primirea comenzii in oricare
                etapa a procesului de livrare fara nici un cost aditional. Daca
                clientul a refuzat livrarea, valoare comenzii va fi restituita
                in contul din care s-a facut plata (in cazul in care plata s-a
                facut cu cardul online), intr-un termen de maxim 7 zile de la
                reintoarcerea comenzii inapoi la noi.
            </span>
        </section>
        <section class="space-y-2">
            <h1 id="waiver" class="font-bold text-lg">
                Renuntare la cumparare
            </h1>
            <span>
                Conform legislatiei in vigoare, clientul are dreptul de a
                returna un produs timp de 14 zile calendaristice de la primirea
                lui fara a preciza niciun motiv pentru retur. In cazul in care
                clientul doreste sa returneze un produs, suma platita ii va fi
                restituita intr-un maxim de 14 zile de la notificarea despre
                decizia luata.
            </span>
            <span>
                Pentru a initia un retur vedeti sectiunea <a
                    class="text-vspot-link text-lg"
                    href="/return-policy#starting_a_refund"
                    >Initierea unui retur</a
                >.
            </span>
        </section>
        <section>
            <h1 class="font-bold text-lg">Retur</h1>
            <span class="block">
                Procesul de retur exista pentru a-i oferi clientului o
                modalitate de a testa un produs in acelasi mod in care ar face-o
                intr-un magazin fizic.
            </span>
            <span class="block font-bold">
                Ca un produs sa fie eligibil pentru procesul de retur trebuie sa
                indeplineasca urmatoarele conditii:
            </span>
            <ul>
                <li>
                    Sa nu fi trecut mai mult de 30 de zile calendaristice din
                    momentul in care produsul a ajuns la client.
                </li>
                <li>
                    Sa nu fie un produs personalizat facut la cererea
                    clientului.
                </li>
                <li>Sa nu fie de natura consumptibila.</li>
                <li>
                    Sa nu fie un produs achizitionat dintr-un magazin fizic.
                </li>
                <li>
                    Sa contina toate accesoriile aferente (incluzand ambalajul
                    original)
                </li>
                <li>
                    Daca produsul a fost desigilat, trebuie sa fie in aceeasi
                    stare fizica/functionala ca atunci cand a fost scos din
                    ambalaj.
                </li>
                <li>
                    Daca produsul a fost desigilat, un motiv pentru retur este
                    necesar.
                </li>
            </ul>
            <span>
                Pentru a initia un retur vedeti sectiunea <a
                    class="text-vspot-link text-lg"
                    href="/return-policy#starting_a_refund"
                    >Initierea unui retur</a
                >.
            </span>
        </section>
        <section>
            <h1 id="starting_a_refund" class="font-bold text-lg">
                Initierea unui retur
            </h1>
            <span>
                Pentru a initia un retur trebuie sa ne contactati folosind una
                din urmatoarele modalitati:
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
            </span>
            <span class="block">
                Va trebui precizat un numar de comanda, produsul/produsele pe
                care doriti sa le returnati, contul bancar in care doriti sa va
                fie restituita suma platita, adresa de unde trebuie preluate
                produsele pentru retur, si dupa caz motivul returului.
            </span>
            <span class="block">
                Dupa confirmarea procesului de retur, Terrible Fortune SRL va
                trimite un curier catre adresa specificata pentru preluarea
                produselor in maxim 2 zile lucratoare de la confirmarea
                procesului de retur, in intervalul de timp stabilit.
            </span>
            <span class="block">
                Clientul are responsabilitatea de a impacheta produsele in mod
                corespunzator daca acestea au fost despachetate.
            </span>
            <span class="block">
                Terrible Fortune SRL are obligatia de a restitui suma comenzii
                intr-un maxim de 14 zile de la primirea produselor returnate.
            </span>
            <span class="block">
                Restituirea sumei se va face DOAR in contul bancar indicat de
                catre client (nu prin colet returnat cu ramburs). Se va restitui
                doar contravaloare produselor, nu si costul transportului pentru
                retur achitat de client. Clientul trebuie sa sustina costurile
                transportului pentru retur doar daca returul NU se incadreaza in <a
                    class="text-vspot-link text-lg"
                    href="/return-policy#shipping_refuse"
                    >Refuz primire comanda</a
                >
                sau
                <a class="text-vspot-link text-lg" href="/return-policy#waiver"
                    >Renuntare la cumparare</a
                >.
            </span>
        </section>
        <span class="block"
            >Cand plasati o comanda, acceptati implicit acesti termeni privind
            returul produselor achizitionate.</span
        >
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
