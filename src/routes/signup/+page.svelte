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
    import Turnstile from "$lib/turnstile/Turnstile.svelte";
    import { PUBLIC_VSPOT_TURNSTILE_SITE_KEY } from "$env/static/public";

    export let data;

    /* No business being here if already logged in */
    if (data.user) goto("/");

    let firstname_data = new InputFieldContext();
    firstname_data.validate = (value: string) => {
        if (value.length === 0) return $l("error.empty.firstname");
        if (value.length > 256) return $l("error.2long.firstname");
    };

    let lastname_data = new InputFieldContext();
    lastname_data.validate = (value: string) => {
        if (value.length === 0) return $l("error.empty.lastname");
        if (value.length > 256) return $l("error.2long.lastname");
    };

    let email = new InputFieldContext();
    email.validate = (value: string) => {
        if (value.length === 0) return $l("error.empty.email");
    };

    let password = new InputFieldContext();
    password.validate = (value: string) => {
        if (value.length === 0) return $l("error.empty.password");
        if (value.length < 8) return $l("error.2short.password");
        if (value.length > 256) return $l("error.2long.password");
    };

    let password_confirm = new InputFieldContext();
    password_confirm.validate = (value: string) => {
        if (value !== password.value) return $l("error.passwords_dont_match");
    };

    let consent_tos = false;
    let consent_error = false;
    $: if (consent_tos && consent_error) consent_error = false;

    let register_in_progress = false;
    let register_error_msg = "";

    let turnstile_response: string | undefined;
    let turnstile_error = false;
    let turnstile_mounted = false;

    const validate_and_register = async () => {
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

        try {
            const res = await backendv1_post_user_register(
                userinfo,
                turnstile_response!,
            );

            register_in_progress = false;

            if (res.status === 200) {
                const from = new URLSearchParams(window.location.search).get(
                    "from",
                );

                invalidate("user:session_cookie");

                if (from) goto(`/${from}`);
                else goto(`/`);
                return;
            }

            turnstile_response = undefined;
            turnstile_mounted = false;

            switch (res.body.field) {
                case "firstname":
                    firstname_data.error = $l(res.body.msg + ".firstname");
                    break;

                case "lastname":
                    lastname_data.error = $l(res.body.msg + ".lastname");
                    break;

                case "email":
                    email.error = $l(res.body.msg + ".email");
                    break;

                case "password":
                    password.error = $l(res.body.msg + ".password");
                    break;

                case "turnstile_token":
                    turnstile_error = true;
                    break;

                default:
                    register_error_msg = $l(res.body.msg);
                    break;
            }
        } catch (e) {
            register_in_progress = false;
            turnstile_response = undefined;
            turnstile_mounted = false;
            console.error(`Failed to register user. ${e}`);
            backend_shatpants_store.set(true);
        }
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.signup"))}</title>
</svelte:head>

<div class="space-y-4">
    <span class="text-7xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("action.signup")}
    </span>
    <form class="space-y-4 w-full lg:w-[45%]">
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
            class="bg-vspot-green flex justify-center px-4 p-2 rounded-tl-lg rounded-br-lg text-vspot-primary-bg w-full"
            on:submit={() => {
                return false;
            }}
            on:click={() => {
                if (turnstile_response) validate_and_register();
                else turnstile_mounted = true;
            }}
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
    {#if turnstile_mounted}
        <Turnstile
            siteKey={PUBLIC_VSPOT_TURNSTILE_SITE_KEY}
            on:turnstile-error={() => {
                turnstile_error = true;
            }}
            on:turnstile-callback={({ detail: { token } }) => {
                turnstile_error = false;
                turnstile_response = token;
                validate_and_register();
            }}
        />
    {/if}
    {#if turnstile_error}
        <span class="text-vspot-text-error text-lg mt-2">
            {$l("error.turnstile_failed")}
        </span>
    {/if}
</div>
