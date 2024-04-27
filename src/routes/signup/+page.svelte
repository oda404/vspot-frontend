<script lang="ts">
    import { goto, invalidate } from "$app/navigation";
    import {
        backendv1_post_user_register,
        type V1ClientUserRegisterInfo,
    } from "$lib/backendv1/user";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";
    import Spinner from "$lib/Spinner.svelte";
    import { pagetitle_make } from "$lib/title.js";

    export let data;
    if (data.user) goto("/");

    let firstname_data = new InputFieldContext();
    firstname_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numele!";
        if (value.length > 256) return "Numele este prea lung";
    };

    let lastname_data = new InputFieldContext();
    lastname_data.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat numele";
        if (value.length > 256) return "Numele este prea lung";
    };

    let email = new InputFieldContext();
    email.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat adresa de email";
        // if (!value.match()) return "Email invalid";
    };

    let password = new InputFieldContext();
    password.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat parola!";
        if (value.length < 8) return "Parola este prea scurta";
        if (value.length > 256) return "Parola este prea lunga";
    };

    let password_confirm = new InputFieldContext();
    password_confirm.validate = (value: string) => {
        if (value !== password.value) return "Parolele introduse difera";
    };

    let consent_tos = false;
    let consent_error = false;
    $: if (consent_tos && consent_error) consent_error = false;

    let register_in_progress = false;
    let register_error_msg = "";

    const validate_and_register = () => {
        let has_error = false;

        has_error = firstname_data.do_validate() !== undefined || has_error;
        firstname_data = firstname_data;

        has_error = lastname_data.do_validate() !== undefined || has_error;
        lastname_data = lastname_data;

        has_error = email.do_validate() !== undefined || has_error;
        email = email;

        has_error = password.do_validate() !== undefined || has_error;
        password = password;

        has_error = password_confirm.do_validate() !== undefined || has_error;
        password_confirm = password_confirm;

        if (!consent_tos) {
            has_error = true;
            consent_error = true;
        }

        if (has_error) return;

        register_in_progress = true;

        let userinfo: V1ClientUserRegisterInfo = {
            firstname: firstname_data.value,
            lastname: lastname_data.value,
            email: email.value,
            password: password.value,
        };

        backendv1_post_user_register(userinfo)
            .then((res) => {
                register_in_progress = false;
                if (res.status !== 200) {
                    switch (res.body.field) {
                        case "email":
                            email.error = $l(res.body.msg);
                            break;

                        default:
                            register_error_msg = $l(res.body.msg);
                            break;
                    }
                    return;
                }

                const from_path = new URLSearchParams(
                    window.location.search,
                ).get("from");

                invalidate("user:session_cookie");
                if (from_path) goto(`/${from_path}`);
                else goto(`/`);
            })
            .catch((error) => {
                register_in_progress = false;
                console.error(`Failed to register user. ${error}`);
                backend_shatpants_store.set(true);
            });
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.signup"))}</title>
</svelte:head>

<div class="space-y-8">
    <span class="text-6xl lg:text-8xl font-semibold opacity-80">
        {$l("action.signup")}
    </span>
    <form class="space-y-4 w-full lg:w-[50%]">
        <div class="flex space-x-4">
            <InputField
                id="lastname"
                label={$l("user.lastname")}
                bind:data={lastname_data}
            />
            <InputField
                id="firstname"
                label={$l("user.firstname")}
                bind:data={firstname_data}
            />
        </div>
        <InputField
            id="email"
            type="email"
            label={$l("user.email")}
            bind:data={email}
        />
        <div class="flex space-x-4">
            <InputField
                id="password"
                label={$l("user.password")}
                type="password"
                bind:data={password}
            />
            <InputField
                id="password_confirm"
                label={$l("user.password_confirm")}
                type="password"
                bind:data={password_confirm}
            />
        </div>
        <div class="!mt-2" />
        <small class="text-vspot-text-hovered"
            >{$l("user.password_requirements")}</small
        >
        <label class="text-sm flex items-center">
            <input type="checkbox" class="mr-2" bind:checked={consent_tos} />
            {$l("signup.tos_consent")}
        </label>
        {#if consent_error}
            <div class="text-sm text-vspot-text-error !mt-1">
                {$l("signup.tos_consent_missing")}
            </div>
        {/if}
        <button
            class="bg-vspot-green px-4 p-2 rounded-lg text-vspot-primary-bg w-full"
            on:click={() => validate_and_register()}
            type="submit"
            disabled={register_in_progress}
        >
            {#if register_in_progress}
                <Spinner fg="#000000" />
            {:else}
                {$l("action.signup")}
            {/if}
        </button>
        {#if register_error_msg}
            <div>{register_error_msg}</div>
        {/if}
    </form>
    <a href="/login" class="block !mt-4">{$l("signup.goto_login")}</a>
</div>
