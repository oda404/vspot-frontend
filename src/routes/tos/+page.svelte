<script>
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
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
    <div class="my-4" />

    <section class="space-y-2">
        <h1 class="font-bold text-lg">Termenii utilizati</h1>
        <span class="block">
            „www.vspot.ro este denumit ca si „site-ul”, „shop”, “furnizor” sau
            „vânzător” și include produsele si serviciile oferite de Societatea
            Terrible Fortune S.R.L. Prin termenul „Utilizator” sau „Vizitator”
            înțelegem toate personale fizice și/sau juridice care accesează
            site-ul vapetronic.ro, indiferent de motiv. Prin termenul de
            „Membru” „Client” înțelegem toate persoanele fizice sau juridice
            care s-au înregistrat pe baza adresei de e-mail și a datelor oferite
            la înregistrare: Nume, Prenume, Denumire, date de identificare, etc.
        </span>
    </section>
</section>
