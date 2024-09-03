<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_VSPOT_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { backendv1_user_password_reset } from "$lib/backendv1/user.js";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import PasswordRequirements from "$lib/input/PasswordRequirements.svelte";
    import { l } from "$lib/langs";
    import LinkButton from "$lib/LinkButton.svelte";
    import Spinner from "$lib/Spinner.svelte";
    import { pagetitle_make } from "$lib/title.js";
    import Turnstile from "$lib/turnstile/Turnstile.svelte";

    export let data;

    let password_ctx = new InputFieldContext();
    password_ctx.validate = (value: string) => {
        if (value.length === 0) return "Ai uitat parola";
        if (value.length < 8) return "Parola este prea scurta";
    };

    let password_confirm_ctx = new InputFieldContext();
    password_confirm_ctx.validate = (value: string) => {
        if (value !== password_ctx.value)
            return $l("error.passwords_dont_match");
    };

    let submit_in_progress = false;
    let password_update_error_msg = "";

    let turnstile_response: string | undefined;
    let turnstile_error = false;
    let turnstile_mounted = false;

    const validate_and_reset_password = async () => {
        let error = false;

        error = typeof password_ctx.do_validate() !== "undefined";
        password_ctx = password_ctx;

        error = typeof password_confirm_ctx.do_validate() !== "undefined";
        password_confirm_ctx = password_confirm_ctx;

        if (error) return;

        submit_in_progress = true;

        const res = await backendv1_user_password_reset(
            data.token,
            password_ctx.value,
            turnstile_response!,
        );

        submit_in_progress = false;

        if (res.status === 200) return goto("/password-reset/success");

        turnstile_response = undefined;
        turnstile_mounted = false;
        switch (res.body.field) {
            case "turnstile_token":
                turnstile_error = true;
                break;

            case "password":
                password_ctx.error = $l(`${res.body.msg}.password`);
                break;

            case "token":
                window.location.reload();
                break;
        }
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.reset_password"))}</title>
</svelte:head>

{#if data.valid}
    <div class="space-y-0">
        <span class="text-5xl font-semibold">
            {$l("page.reset_password")}
        </span>
        <span class="text-lg font-semibold block text-vspot-text-hovered">
            {$l(`page.reset_password.description`)}
        </span>

        <form class="space-y-2 lg:w-[400px] !mt-4">
            <InputField
                id="password_new"
                type="password"
                label={$l("user.password_new")}
                bind:data={password_ctx}
            />
            <InputField
                id="password_new_confirm"
                type="password"
                label={$l("user.password_new_confirm")}
                bind:data={password_confirm_ctx}
            />
            {#if password_update_error_msg}
                <span>{password_update_error_msg}</span>
            {/if}
            <PasswordRequirements />
            <button
                class="bg-vspot-green w-full flex !mt-4 justify-center items-center min-w-32 min-h-10 p-2 px-4 rounded-sm text-vspot-primary-bg"
                disabled={submit_in_progress}
                type="submit"
                on:submit={() => {
                    return false;
                }}
                on:click={() => {
                    if (turnstile_response) validate_and_reset_password();
                    else turnstile_mounted = true;
                }}
            >
                {#if submit_in_progress}
                    <Spinner fg="#000000" />
                {:else}
                    {$l("action.reset_password")}
                {/if}
            </button>
        </form>
        <div class="!mt-4">
            {#if turnstile_mounted}
                <Turnstile
                    siteKey={PUBLIC_VSPOT_TURNSTILE_SITE_KEY}
                    on:turnstile-error={() => {
                        turnstile_error = true;
                    }}
                    on:turnstile-callback={({ detail: { token } }) => {
                        turnstile_error = false;
                        turnstile_response = token;
                        validate_and_reset_password();
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
{:else}
    <div class="space-y-0">
        <span class="text-5xl font-semibold">
            {$l("page.reset_password.expired")} :(
        </span>
        <span class="text-lg font-semibold block text-vspot-text-hovered">
            {$l(`page.reset_password.expired.description`)}
        </span>
        <div class="!mt-4">
            <LinkButton simple href="/password-forgor">
                <span>{$l("action.resend_password_reset")}</span>
            </LinkButton>
        </div>
    </div>
{/if}
