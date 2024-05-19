<script lang="ts">
    import { goto, invalidate } from "$app/navigation";
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";
    import { backendv1_post_user_delete } from "$lib/backendv1/user";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import { orderinfo_clear } from "$lib/orderinfo/orderinfo";
    import type { UserDisplayInfo } from "./user";

    let delete_in_progress = false;
    let delete_error_msg = "";

    let password_input = new InputFieldContext();
    password_input.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat parola!";
        if (value.length < 8) return "Parola este prea scurta";
        if (value.length > 256) return "Parola este prea lunga";
    };

    const validate_and_delete = () => {
        let has_error = false;

        has_error = password_input.do_validate() !== undefined || has_error;
        password_input = password_input;

        if (has_error) return;

        delete_in_progress = true;

        backendv1_post_user_delete(password_input.value)
            .then((res) => {
                delete_in_progress = false;

                if (res.status !== 200) {
                    switch (res.body.field) {
                        case "password":
                            password_input.error = $l(res.body.msg);
                            break;

                            delete_error_msg = res.body.msg;
                            break;
                    }
                    return;
                }

                orderinfo_clear();
                invalidate("user:session_cookie");
                goto(`/`);
            })
            .catch((error) => {
                delete_in_progress = false;
                console.error(`Failed to register user. ${error}`);
                backend_shatpants_store.set(true);
            });
    };
</script>

<div class="space-y-4">
    <span class="text-xl text-vspot-purple block">
        {$l("user.delete_title")}
    </span>
    <span>
        {$l("user.delete_data_notice")}
    </span>
    <form class="w-[300px] space-y-2">
        <InputField
            id="password"
            label={$l("user.password")}
            data={password_input}
            type="password"
        />
        <button
            disabled={delete_in_progress}
            type="submit"
            class="px-4 p-2 rounded-lg bg-vspot-text-error w-full"
            on:submit={() => {
                return false;
            }}
            on:click={() => validate_and_delete()}
        >
            {$l("user.delete")}
        </button>
        {#if delete_error_msg}
            <span class="text-vspot-text-error">{delete_error_msg}</span>
        {/if}
    </form>
</div>
