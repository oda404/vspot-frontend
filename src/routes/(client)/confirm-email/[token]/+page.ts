
import { backendv1_post_user_confirm_email } from '$lib/backendv1/user.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, params, parent }) {

    const user = (await parent()).user;
    if (!user)
        redirect(307, "/login");

    if (user.email_verified)
        redirect(307, "/");

    let res = await backendv1_post_user_confirm_email(params.token, fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    return {
        body: res.body,
        status: res.status
    }
}
