import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

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

export async function backendv1_post_user_register(user_info: V1ClientUserRegisterInfo, turnstile_token: string): Promise<ServerResponse<string>> {

    const res = await fetch(`${backendv1_endpoint()}/user/register`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ turnstile_token, user_info })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_get_user_display_info(fetch: any): Promise<ServerResponse<V1ServerUserDisplayInfo>> {

    const res = await fetch(`${backendv1_endpoint()}/user/get`, {
        method: "GET",
        headers: {
            ...BACKENDV1_BASE_GET_HEADERS
        },
        credentials: 'include',
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_user_login(user_info: V1ClientUserLoginInfo, turnstile_token: string): Promise<ServerResponse<string>> {

    const res = await fetch(`${backendv1_endpoint()}/user/login`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ turnstile_token, user_info })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_user_logout(): Promise<void> {
    await fetch(`${backendv1_endpoint()}/user/logout`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
    });
}

export async function backendv1_post_user_update_info(user_info: V1ClientUserUpdateInfo): Promise<ServerResponse> {
    const res = await fetch(`${backendv1_endpoint()}/user/update-info`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_info })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_user_update_password(password_info: V1ClientUserUpdatePasswordInfo): Promise<ServerResponse> {
    const res = await fetch(`${backendv1_endpoint()}/user/update-password`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ password_info })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_user_delete(password: string): Promise<ServerResponse> {
    const res = await fetch(`${backendv1_endpoint()}/user/delete`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ password })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_user_confirm_email(token: string, fetch: any): Promise<ServerResponse> {
    const res = await fetch(`${backendv1_endpoint()}/user/confirm-email`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ token })
    });

    return { status: res.status, body: await res.json() };
}

export async function backendv1_post_user_send_confirm_email(fetch: any): Promise<ServerResponse> {
    const res = await fetch(`${backendv1_endpoint()}/user/send-confirm-email`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
    });

    return { status: res.status, body: await res.json() };
}
