<script lang="ts">
    import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { l } from "$lib/langs";
    import { onDestroy, onMount } from "svelte";
    import { scroll_add_lock, scroll_remove_lock } from "$lib/scroll";
    import { user_logout, type UserDisplayInfo } from "./user";
    import { beforeNavigate } from "$app/navigation";
    import { orderinfo_clear } from "$lib/orderinfo/orderinfo";

    export let user: UserDisplayInfo;
    export let on_close_cb: () => void;

    onMount(() => {
        scroll_add_lock("cart_preview");
    });
    onDestroy(() => {
        scroll_remove_lock("cart_preview");
    });

    beforeNavigate(() => {
        on_close_cb();
    });
</script>

<button
    class="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[100] cursor-default"
    on:click={() => {
        on_close_cb();
    }}
/>
<div
    class:w-full={user.role === "admin"}
    class:right-[-14px]={user.role !== "admin"}
    class="absolute bg-vspot-primary-bg divide-vspot-secondary-bg top-12 p-4 rounded-lg drop-shadow z-[100] border-vspot-green"
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
    <a class="block px-0 py-2" href="/account?tab=user_info"
        >{$l("page.account")}</a
    >
    <a class="block px-0 py-2" href="/account?tab=user_orders"
        >{$l("page.my_orders")}</a
    >
    {#if user.role === "admin"}
        <a class="block px-0 py-2 animate-devcolors" href="/portal">Portal</a>
        <a class="block px-0 py-2 animate-devcolors" href="/invoices">Facturi</a
        >
    {/if}
    <button
        class="w-full text-left block px-0 py-2 !border-vspot-primary-bg hover:!border-vspot-green text-vspot-purple"
        on:click={async () => {
            await user_logout();
            orderinfo_clear();
            window.location.reload();
        }}
    >
        {$l("action.logout")}
    </button>
</div>
