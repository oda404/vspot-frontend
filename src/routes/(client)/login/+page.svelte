<script lang="ts">
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import Spinner from "$lib/Spinner.svelte";
    import {
        backendv1_post_user_login,
        type V1ClientUserLoginInfo,
    } from "$lib/backendv1/user";
    import { goto, invalidate } from "$app/navigation";
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";
    import Turnstile from "$lib/turnstile/Turnstile.svelte";
    import { PUBLIC_VSPOT_TURNSTILE_SITE_KEY } from "$env/static/public";
    import CheckBox from "$lib/input/CheckBox.svelte";
    import { USER_EMAIL_REGEX } from "$lib/user/validation";

    let email = new InputFieldContext();
    email.validate = (value: string) => {
        if (!value.match(USER_EMAIL_REGEX)) return $l("error.invalid.email");
    };

    let password = new InputFieldContext();
    password.validate = (value: string) => {
        if (value.length === 0) return $l("error.empty.password");
        if (value.length < 8) return $l("error.2short.password");
        if (value.length > 256) return $l("error.2long.password");
    };

    let remember_me: boolean = false;

    let login_in_progress = false;
    let login_error_msg = "";

    let turnstile_response: string | undefined;
    let turnstile_error = false;
    let turnstile_mounted = false;

    const validate_and_login = async () => {
        let has_error = false;

        has_error = email.do_validate() !== undefined || has_error;
        email = email;

        has_error = password.do_validate() !== undefined || has_error;
        password = password;

        if (has_error) return;

        login_in_progress = true;
        email.error = undefined;
        password.error = undefined;

        const user_info: V1ClientUserLoginInfo = {
            email: email.value,
            password: password.value,
            remember_me: remember_me,
        };

        try {
            let res = await backendv1_post_user_login(
                user_info,
                turnstile_response!,
            );

            login_in_progress = false;

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
                    email.error = "";
                    password.error = "";
                    login_error_msg = res.body.msg;
                    break;
            }
        } catch (e) {
            login_in_progress = false;
            turnstile_response = undefined;
            turnstile_mounted = false;
            console.error(`Failed to register user. ${e}`);
            backend_shatpants_store.set(true);
        }
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.login"))}</title>
</svelte:head>

<div class="space-y-4">
    <span class="text-7xl lg:text-9xl font-[Blowhole] font-semibold opacity-80">
        {$l("action.login")}
    </span>
    <div class="space-y-8 w-full lg:w-[45%]">
        <form class="space-y-4">
            <InputField
                type="email"
                id="email"
                label={$l("user.email")}
                bind:data={email}
            />
            <InputField
                id="password"
                type="password"
                label={$l("user.password")}
                bind:data={password}
            />
            {#if login_error_msg}
                <span class="text-vspot-text-error block !mt-2"
                    >{$l(login_error_msg)}</span
                >
            {/if}
            <div class="flex justify-between items-center">
                <a
                    href="/forgor-password"
                    class="block text-sm text-vspot-link"
                >
                    {$l("user.forgorpassword")}
                </a>
                <button
                    class="flex items-center space-x-2"
                    type="button"
                    on:click={() => (remember_me = !remember_me)}
                >
                    <CheckBox selected={remember_me} />
                    <span>
                        {$l("action.remember_me")}
                    </span>
                </button>
            </div>
            <div class="flex justify-between items-center">
                <a class="mt-auto" href="/signup">{$l("user.createaccount")}</a>
                <button
                    class="bg-vspot-green flex justify-center items-center min-w-32 min-h-10 p-2 px-4 rounded-tl-lg rounded-br-lg text-vspot-primary-bg"
                    disabled={login_in_progress}
                    type="submit"
                    on:submit={() => {
                        return false;
                    }}
                    on:click={() => {
                        if (turnstile_response) validate_and_login();
                        else turnstile_mounted = true;
                    }}
                >
                    {#if login_in_progress}
                        <Spinner fg="#000000" />
                    {:else}
                        {$l("action.login")}
                    {/if}
                </button>
            </div>
        </form>
        {#if turnstile_mounted}
            <Turnstile
                siteKey={PUBLIC_VSPOT_TURNSTILE_SITE_KEY}
                on:turnstile-error={() => {
                    turnstile_error = true;
                }}
                on:turnstile-callback={({ detail: { token } }) => {
                    turnstile_error = false;
                    turnstile_response = token;
                    validate_and_login();
                }}
            />
        {/if}
        {#if turnstile_error}
            <span class="text-vspot-text-error text-lg mt-2">
                {$l("error.turnstile_failed")}
            </span>
        {/if}
    </div>
</div>
