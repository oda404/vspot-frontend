<script>
    import { CONTACT_EMAIL } from "$lib/contact/info";
    import { l } from "$lib/langs";
</script>

<section>
    <h1
        class="!text-6xl lg:!text-9xl font-[Blowhole] font-semibold opacity-80 flex items-center"
    >
        {$l("page.return_policy")}
    </h1>
    <div class="space-y-4">
        <span class="block font-bold">
            Clientul are dreptul de a renunta la un produs cumparat fara a
            preciza un anume motiv in termen de 14 zile calendaristice de la
            primirea lui prin contactarea Terrible Fortune SRL la {CONTACT_EMAIL[0]},
            doar pentru produsele neconsumptibile si cele ce nu au fost
            desigilate. Clientului ii va fi restituita suma achitata cu titlul
            de total (nu si costul transportului pentru retur) in contul bancar
            indicat.
        </span>
        <div>
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
        </div>
        <span class="block">
            Terrible Fortune SRL are obligatia de a restitui suma comenzii
            intr-un maxim de 14 zile de la primirea a produselor returnate.
        </span>
        <span class="block">
            Restituirea sumei se va face DOAR in contul bancar indicat de catre
            client (nu prin colet returnat cu ramburs). Se va restitui doar
            contravaloare produselor (nu si costul transportului pentru retur).
        </span>
        <span class="block"
            >Cand plasati o comanda, acceptati implicit acesti termeni privind
            returul produselor achizitionate.</span
        >
        <span class="block">
            Pentru a initia un proces de retur va rugam sa ne contactati
            folosind una dintre metodele gasite <a
                class="text-vspot-link"
                href="/contact">aici</a
            >
        </span>
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
