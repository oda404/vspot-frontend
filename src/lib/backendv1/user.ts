import { backendv1_base_fetch } from "./base_fetch";
import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { ServerResponse } from "./response";
import { type FetchFunction } from "./safe_fetch";

export type V1ClientUserRegisterInfo = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export type V1ClientUserLoginInfo = {
    email: string;
    password: string;
    remember_me: boolean;
};

export type V1ServerUserDisplayInfo = {
    firstname: string;
    lastname: string;
    email: string;
    email_verified: boolean;
    role: string;
};

export type V1ClientUserUpdateInfo = {
    firstname: string;
    lastname: string;
    email: string;
};

export type V1ClientUserUpdatePasswordInfo = {
    password_old: string;
    password_new: string;
};

export async function backendv1_get_user_display_info(fetch: FetchFunction): Promise<ServerResponse<V1ServerUserDisplayInfo>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/user/get`,
        {
            method: "GET",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            },
            credentials: 'include'
        },
        fetch
    );
}

export async function backendv1_post_user_register(user_info: V1ClientUserRegisterInfo, turnstile_token: string): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/register`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ turnstile_token, user_register_info: user_info })
    });
}


export async function backendv1_post_user_login(user_info: V1ClientUserLoginInfo, turnstile_token: string): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/login`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ turnstile_token, user_login_info: user_info })
    });
}

export async function backendv1_post_user_logout(): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/logout`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
    });
}

export async function backendv1_post_user_update_info(user_info: V1ClientUserUpdateInfo): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/update-info`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_update_info: user_info })
    });
}

export async function backendv1_post_user_update_password(password_info: V1ClientUserUpdatePasswordInfo): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/update-password`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_update_password_info: password_info })
    });
}

export async function backendv1_post_user_confirm_email(token: string, fetch_func: FetchFunction): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/confirm-email`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_confirm_email_info: { token } })
    }, fetch_func);
}

export async function backendv1_post_user_send_confirm_email(fetch_func: FetchFunction): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/send-confirm-email`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
    }, fetch_func);
}

export async function backendv1_post_user_delete(password: string): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/delete`, {
        method: "DELETE",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_delete_info: { password } })
    });
}

export async function backendv1_user_password_reset_request(email: string, turnstile_token: string): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/password-forgot`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        body: JSON.stringify({
            data: {
                email
            },
            turnstile_token
        })
    });
}

export async function backendv1_user_password_reset(token: string, password: string, turnstile_token: string): Promise<ServerResponse> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/password-reset`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        body: JSON.stringify({
            data: {
                token,
                password
            },
            turnstile_token
        })
    });
}

export async function backendv1_user_password_reset_token_is_valid(token: string): Promise<ServerResponse<boolean>> {
    return await backendv1_base_fetch(`${backendv1_endpoint()}/user/password-reset-token-valid/${token}`, {
        method: "GET",
        headers: {
            ...BACKENDV1_BASE_GET_HEADERS
        },
    });
}
