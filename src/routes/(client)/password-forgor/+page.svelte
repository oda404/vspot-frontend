<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_VSPOT_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { backendv1_user_password_reset_request } from "$lib/backendv1/user";
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import LinkButton from "$lib/LinkButton.svelte";
    import Spinner from "$lib/Spinner.svelte";
    import { pagetitle_make } from "$lib/title";
    import Turnstile from "$lib/turnstile/Turnstile.svelte";
    import { USER_EMAIL_REGEX } from "$lib/user/validation";

    let submit_in_progress = false;

    let turnstile_response: string | undefined;
    let turnstile_error = false;
    let turnstile_mounted = false;

    let email_ctx = new InputFieldContext();
    email_ctx.validate = (val) => {
        if (!val.match(USER_EMAIL_REGEX)) return $l("error.invalid.email");
    };

    const validate_and_start_reset_password = async () => {
        let error = false;

        error = typeof email_ctx.do_validate() !== "undefined";
        email_ctx = email_ctx;

        if (error) return;

        submit_in_progress = true;

        const res = await backendv1_user_password_reset_request(
            email_ctx.value,
            turnstile_response!,
        );

        submit_in_progress = false;

        if (res.status === 200) return goto("/password-forgor/success");

        turnstile_response = undefined;
        turnstile_mounted = false;
        switch (res.body.field) {
            case "turnstile_token":
                turnstile_error = true;
                break;

            case "email":
                email_ctx.error = $l(`${res.body.msg}.email`);
                break;
        }
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.forgot_password"))}</title>
</svelte:head>

<div class="space-y-2">
    <h1 class="text-4xl font-semibold">
        {$l("page.forgot_password")}
    </h1>
    <h2 class="text-base font-semibold block text-vspot-text-hovered">
        {$l(`page.forgot_password.description`)}
    </h2>
    <form class="!mt-4 space-y-2 lg:w-[400px]">
        <InputField id="email" label="Email" data={email_ctx} />
        <button
            class="bg-vspot-green w-full flex justify-center items-center min-w-32 min-h-10 p-2 px-4 rounded-sm text-vspot-primary-bg"
            disabled={submit_in_progress}
            type="submit"
            on:submit={() => {
                return false;
            }}
            on:click={() => {
                if (turnstile_response) validate_and_start_reset_password();
                else turnstile_mounted = true;
            }}
        >
            {#if submit_in_progress}
                <Spinner fg="#000000" />
            {:else}
                {$l("action.send_reset_password")}
            {/if}
        </button>
    </form>
    <div class="!mt-4">
        <LinkButton simple href="/login">
            <span>{$l("action.login")}</span>
        </LinkButton>
    </div>

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
                    validate_and_start_reset_password();
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
