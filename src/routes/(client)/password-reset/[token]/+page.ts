import { backendv1_user_password_reset_token_is_valid } from '$lib/backendv1/user.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {

    if ((await parent()).user)
        redirect(307, "/");

    const token = params.token;

    const res = await backendv1_user_password_reset_token_is_valid(token);
    if (res.status >= 300)
        error(res.status, res.body.msg);

    return {
        token,
        valid: res.body.data!
    }
}
