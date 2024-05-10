<script lang="ts">
    import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { l } from "$lib/langs";
    import { onDestroy, onMount } from "svelte";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";
    import { user_logout, type UserDisplayInfo } from "./user";

    export let user: UserDisplayInfo;
    export let on_close_cb: () => void;

    onMount(() => {
        scroll_add_lock("cart_preview");
    });
    onDestroy(() => {
        scroll_remove_lock("cart_preview");
    });
</script>

<button
    class="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[100] cursor-default"
    on:click={() => {
        on_close_cb();
    }}
/>
<div
    class="absolute bg-vspot-primary-bg right-[-14px] space-y-2 divide-y divide-vspot-secondary-bg top-12 p-4 rounded-lg drop-shadow z-[100] border-vspot-green"
>
    <div class="flex items-center space-x-24 justify-between pb-2">
        <span class="whitespace-nowrap text-md">
            {$l("description.welcomeback", { name: user.firstname })}
        </span>
        <button
            on:click={() => {
                on_close_cb();
            }}
            aria-label="Close"
        >
            <Fa size="sm" icon={faX} />
        </button>
    </div>
    <a class="pt-2 block" href="/account">Contul meu</a>
    <a class="pt-2 block" href="/orders">Comenzile mele</a>
    <button
        class="pt-2 block text-vspot-purple"
        on:click={async () => {
            await user_logout();
            window.location.reload();
        }}
    >
        Dezautentificare
    </button>
</div>
