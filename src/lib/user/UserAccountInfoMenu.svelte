<script lang="ts">
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";
    import {
        backendv1_post_user_update_info,
        backendv1_post_user_update_password,
        type V1ClientUserUpdateInfo,
        type V1ClientUserUpdatePasswordInfo,
    } from "$lib/backendv1/user";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import type { UserDisplayInfo } from "./user";

    export let user: UserDisplayInfo;

    let firstname_input = new InputFieldContext(user.firstname);
    firstname_input.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numele!";
        if (value.length > 256) return "Numele este prea lung";
    };

    let lastname_input = new InputFieldContext(user.lastname);
    lastname_input.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numele";
        if (value.length > 256) return "Numele este prea lung";
    };

    let email_input = new InputFieldContext(user.email);
    email_input.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat adresa de email";
        // if (!value.match()) return "Email invalid";
    };

    let password_old_input = new InputFieldContext();
    password_old_input.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat parola";
        if (value.length < 8) return "Parola este prea scurta";
    };

    let password_new_input = new InputFieldContext();
    password_new_input.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat parola";
        if (value.length < 8) return "Parola este prea scurta";
    };

    let password_new_confirm_input = new InputFieldContext();
    password_new_confirm_input.validate = (value: string) => {
        if (value !== password_new_input.value)
            return $l("error.passwords_dont_match");
    };

    let update_in_progress = false;
    let update_error_msg = "";
    $: contact_info_changed =
        firstname_input.value !== user.firstname ||
        lastname_input.value !== user.lastname ||
        email_input.value !== user.email;

    let password_update_in_progress = false;
    let password_update_error_msg = "";
    $: password_changed =
        password_old_input.value ||
        password_new_input.value ||
        password_new_confirm_input.value;

    const validate_and_update_contact_info = () => {
        let has_error = false;

        has_error = firstname_input.do_validate() !== undefined || has_error;
        firstname_input = firstname_input;

        has_error = lastname_input.do_validate() !== undefined || has_error;
        lastname_input = lastname_input;

        has_error = email_input.do_validate() !== undefined || has_error;
        email_input = email_input;

        if (has_error) return;

        const user_info: V1ClientUserUpdateInfo = {
            firstname: firstname_input.value,
            lastname: lastname_input.value,
            email: email_input.value,
        };

        update_in_progress = true;
        backendv1_post_user_update_info(user_info)
            .then((res) => {
                update_in_progress = false;
                if (res.status !== 200) {
                    switch (res.body.field) {
                        case "email":
                            email_input.error = $l(res.body.msg);
                            break;

                        default:
                            update_error_msg = $l(res.body.msg);
                            break;
                    }
                    return;
                }

                window.location.reload();
            })
            .catch((error) => {
                update_in_progress = false;
                console.error(`Failed to register user. ${error}`);
                backend_shatpants_store.set(true);
            });
    };

    const validate_and_update_password = () => {
        let has_error = false;

        has_error = password_old_input.do_validate() !== undefined || has_error;
        password_old_input = password_old_input;

        has_error = password_new_input.do_validate() !== undefined || has_error;
        password_new_input = password_new_input;

        has_error =
            password_new_confirm_input.do_validate() !== undefined || has_error;
        password_new_confirm_input = password_new_confirm_input;

        if (has_error) return;

        const password_info: V1ClientUserUpdatePasswordInfo = {
            password_old: password_old_input.value,
            password_new: password_new_input.value,
        };

        password_update_in_progress = true;
        backendv1_post_user_update_password(password_info)
            .then((res) => {
                password_update_in_progress = false;
                if (res.status !== 200) {
                    switch (res.body.field) {
                        case "password_old":
                            password_old_input.error = $l(
                                res.body.msg + ".password",
                            );
                            break;

                        case "password_new":
                            password_new_input.error = $l(res.body.msg);
                            break;

                        default:
                            password_update_error_msg = $l(res.body.msg);
                            break;
                    }
                    return;
                }

                window.location.reload();
            })
            .catch((error) => {
                password_update_in_progress = false;
                console.error(`Failed to register user. ${error}`);
                backend_shatpants_store.set(true);
            });
    };
</script>

<div class="space-y-8 divide-y divide-vspot-secondary-bg">
    <div>
        <span class="text-lg"> {$l("user.account_details")} </span>
        <div class="space-y-4 mt-2 w-[300px]">
            <InputField
                id="firstname"
                label={$l("user.firstname")}
                bind:data={firstname_input}
            />
            <InputField
                id="lastname"
                label={$l("user.lastname")}
                bind:data={lastname_input}
            />
            <InputField
                id="email"
                label={$l("user.email")}
                bind:data={email_input}
            />
            {#if update_error_msg}
                {update_error_msg}
            {/if}
            {#if contact_info_changed}
                <button
                    on:click={() => validate_and_update_contact_info()}
                    class="p-4 py-2 rounded-lg bg-vspot-green text-vspot-primary-bg w-full !mt-2"
                >
                    {$l("action.update")}
                </button>
            {/if}
        </div>
    </div>
    <div class="pt-4">
        <span class="text-lg"> {$l("user.password")} </span>
        <form class="space-y-4 mt-2">
            <div>
                <div class="">
                    <InputField
                        id="password_old"
                        type="password"
                        label={$l("user.password_old")}
                        bind:data={password_old_input}
                    />
                </div>
                <a
                    class="mt-2 text-sm text-vspot-text-hovered block whitespace-nowrap"
                    href="/password-forgor">{$l("user.forgorpassword")}</a
                >
            </div>
            <div class="space-y-4">
                <InputField
                    id="password_new"
                    type="password"
                    label={$l("user.password_new")}
                    bind:data={password_new_input}
                />
                <InputField
                    id="password_new_confirm"
                    type="password"
                    label={$l("user.password_new_confirm")}
                    bind:data={password_new_confirm_input}
                />
                {#if password_update_error_msg}
                    {password_update_error_msg}
                {/if}
                {#if password_changed}
                    <button
                        on:click={() => validate_and_update_password()}
                        type="submit"
                        class="p-4 py-2 rounded-lg bg-vspot-green text-vspot-primary-bg w-full !mt-2"
                    >
                        {$l("action.update")}
                    </button>
                {/if}
            </div>
        </form>
    </div>
</div>
