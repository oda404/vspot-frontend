import { backendv1_get_user_display_info } from '$lib/backendv1/user.js';
import type { UserDisplayInfo } from '$lib/user/user.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, depends, url }) {

    depends("user:session_cookie");

    const res = await backendv1_get_user_display_info(fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    const user_display_info: UserDisplayInfo | undefined = res.status === 200 ? res.body.data : undefined;

    return {
        user: user_display_info
    }
}