<script lang="ts">
    import Fa from "svelte-fa";
    import type { UserDisplayInfo } from "./user";
    import { faUser } from "@fortawesome/free-solid-svg-icons";
    import NavItem from "$lib/NavItem.svelte";
    import UserDropdown from "./UserDropdown.svelte";

    export let user: UserDisplayInfo | undefined;

    let user_tab_open = false;
</script>

{#if user}
    <div class="relative">
        <button
            on:click={() => {
                user_tab_open = !user_tab_open;
            }}
            aria-label="User"
            class="flex justify-center items-center space-x-2"
        >
            <Fa icon={faUser} size="lg" />
            <span class="hidden lg:block font-bold text-nowrap"
                >{user.firstname}</span
            >
        </button>
        {#if user_tab_open}
            <UserDropdown
                {user}
                on_close_cb={() => {
                    user_tab_open = false;
                }}
            />
        {/if}
    </div>
{:else}
    <a href="/login" aria-label="Cart" class="flex space-x-2">
        <Fa icon={faUser} size="lg" />
        <span class="lg:block hidden font-bold text-nowrap">Contul meu</span>
    </a>
{/if}
