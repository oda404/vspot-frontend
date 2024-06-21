import { backendv1_get_user_display_info } from '$lib/backendv1/user.js';
import type { UserDisplayInfo } from '$lib/user/user.js';
import { error, redirect } from '@sveltejs/kit';

const email_unverified_pages_exclude = ["/send-confirm-email", "/account", "/confirm-email", "/contact", "/tos", "/privacy-policy", "/cookie-policy", "/return-policy"]

export async function load({ fetch, depends, url, }) {

    depends("user:session_cookie");

    const res = await backendv1_get_user_display_info(fetch);
    if (res.status >= 500)
        error(res.status, { message: res.body.msg });

    const user_display_info: UserDisplayInfo | undefined = res.status === 200 ? res.body.data : undefined;
    if (!email_unverified_pages_exclude.find(exclude => url.pathname.startsWith(exclude)) && user_display_info && !user_display_info.email_verified)
        redirect(307, "/send-confirm-email")

    return {
        user: user_display_info
    }
}