<script lang="ts">
    import { l } from "$lib/langs";
    import UserAccountNavButton from "$lib/user/UserAccountNavButton.svelte";
    import UserAccountInfoMenu from "$lib/user/UserAccountInfoMenu.svelte";
    import UserAccountOrdersMenu from "$lib/user/UserAccountOrdersMenu.svelte";
    import UserAccountDeleteMenu from "$lib/user/UserAccountDeleteMenu.svelte";
    import { pagetitle_make } from "$lib/title.js";

    export let data;

    export const USER_INFO_MENU = "user_info";
    export const USER_ORDERS_MENU = "user_orders";
    export const USER_DELETE_MENU = "user_delete";

    const user = data.user!;
    $: current_menu = data.tab ? data.tab : USER_INFO_MENU;

    const orders = data.orders;

    let page_title: string;
    $: {
        switch (current_menu) {
            case USER_INFO_MENU:
            case USER_DELETE_MENU:
                page_title = pagetitle_make($l("page.account"));
                break;

            case USER_ORDERS_MENU:
                page_title = pagetitle_make($l("page.my_orders"));
                break;
        }
    }
</script>

<svelte:head>
    <title>{page_title}</title>
</svelte:head>

<section>
    <h1 class="text-6xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("description.welcomeback", { name: user.firstname })}
    </h1>

    <div class="flex space-x-16">
        <div class="w-fit">
            <UserAccountNavButton
                active={current_menu === USER_INFO_MENU}
                text={$l("description.user_info")}
                on_click={() => {
                    if (current_menu !== USER_INFO_MENU)
                        current_menu = USER_INFO_MENU;
                }}
            />
            <UserAccountNavButton
                active={current_menu === USER_ORDERS_MENU}
                text={$l("description.user_orders")}
                on_click={() => {
                    if (current_menu !== USER_ORDERS_MENU)
                        current_menu = USER_ORDERS_MENU;
                }}
            />
            <UserAccountNavButton
                active={current_menu === USER_DELETE_MENU}
                text={$l("description.user_delete")}
                on_click={() => {
                    if (current_menu !== USER_DELETE_MENU)
                        current_menu = USER_DELETE_MENU;
                }}
            />
        </div>
        {#if current_menu === USER_INFO_MENU}
            <UserAccountInfoMenu {user} />
        {:else if current_menu === USER_ORDERS_MENU}
            <UserAccountOrdersMenu {orders} />
        {:else if current_menu === USER_DELETE_MENU}
            <UserAccountDeleteMenu {user} />
        {/if}
    </div>
</section>
