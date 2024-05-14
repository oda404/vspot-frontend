<script lang="ts">
    export let data;

    $: user = data.user!;
</script>

<div>
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        Email trimis
    </h1>
    <span class="text-lg block">
        Am trimis on email cu instructini pentru a-ti activa contul pe adresa <b
            >{user.email}</b
        >
    </span>
    <span>
        Daca nu vedeti niciun email pe pagina principala, verificati si in
        folder-ul de spam.
    </span>
</div>
