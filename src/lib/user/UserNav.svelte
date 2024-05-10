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
            class="flex flex-col"
        >
            <Fa icon={faUser} size="lg" />
            <span class="text-sm">{user.firstname}</span>
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
    <NavItem icon={faUser} icon_size="lg" url="/login" />
{/if}
