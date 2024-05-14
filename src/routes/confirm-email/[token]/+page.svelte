<script lang="ts">
    export let data;
</script>

{#if data.status >= 400}
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        Eroare
    </h1>
    <div class="text-lg">
        Link-ul de confirmare a expirat sau este invalid.
        <a href="/send-confirm-email" class="text-vspot-link"
            >Trimite email-ul de confirmare din nou</a
        >.
    </div>
{:else}
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        Cont confirmat!
    </h1>
    <span class="text-lg block mb-2">
        Iti multumim ca ai confirmat contul
    </span>
    <a
        href="/"
        class="px-4 p-2 rounded-lg bg-vspot-green text-vspot-primary-bg"
    >
        Inapoi la pagina principala
    </a>
{/if}
