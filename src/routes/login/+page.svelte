<script lang="ts">
    import { InputFieldContext } from "$lib/input/InputField";
    import InputField from "$lib/input/InputField.svelte";
    import { l } from "$lib/langs";
    import { pagetitle_make } from "$lib/title";
    import Spinner from "$lib/Spinner.svelte";
    import { backendv1_post_user_login } from "$lib/backendv1/user";
    import { goto, invalidate } from "$app/navigation";
    import { backend_shatpants_store } from "$lib/backend_shatpants/backend_shatpants";

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

    let remember_me: boolean = false;

    let login_in_progress = false;
    let login_error_msg = "";

    const validate_and_login = () => {
        let has_error = false;

        has_error = email.do_validate() !== undefined || has_error;
        email = email;

        has_error = password.do_validate() !== undefined || has_error;
        password = password;

        if (has_error) return;

        login_in_progress = true;

        backendv1_post_user_login(email.value, password.value, remember_me)
            .then((res) => {
                login_in_progress = false;
                if (res.status !== 200) {
                    switch (res.body.field) {
                        case "email":
                            email.error = $l(res.body.msg);
                            break;

                        case "password":
                            password.error = $l(res.body.msg);
                            break;

                        default:
                            login_error_msg = res.body.msg;
                            email.error = "";
                            password.error = "";
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
                login_in_progress = false;
                console.error(`Failed to register user. ${error}`);
                backend_shatpants_store.set(true);
            });
    };
</script>

<svelte:head>
    <title>{pagetitle_make($l("page.login"))}</title>
</svelte:head>

<div class="space-y-8">
    <span class="text-6xl lg:text-8xl font-semibold opacity-80">
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
            <div class="flex justify-between">
                <a href="/forgor-password" class="block">
                    {$l("user.forgorpassword")}
                </a>
                <label>
                    <input type="checkbox" bind:value={remember_me} />
                    {$l("action.remember_me")}
                </label>
            </div>
            {#if login_error_msg}
                <span class="text-vspot-text-error block !mt-2"
                    >{$l(login_error_msg)}</span
                >
            {/if}
            <div class="flex justify-between">
                <a class="mt-auto" href="/signup">{$l("user.createaccount")}</a>
                <button
                    class="bg-vspot-green p-2 px-4 rounded-lg text-vspot-primary-bg"
                    disabled={login_in_progress}
                    type="submit"
                    on:click={() => {
                        validate_and_login();
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
    </div>
</div>
