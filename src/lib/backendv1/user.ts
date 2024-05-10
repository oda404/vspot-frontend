import { backendv1_endpoint } from "./endpoint";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";
import type { ServerResponse } from "./response";

export type V1ClientUserRegisterInfo = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export type V1ServerUserDisplayInfo = {
    firstname: string;
    lastname: string;
    email: string;
    email_verified: boolean;
};

export async function backendv1_post_user_register(userinfo: V1ClientUserRegisterInfo): Promise<ServerResponse<string>> {

    const res = await fetch(`${backendv1_endpoint()}/user/register`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_info: userinfo })
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

export async function backendv1_post_user_login(email: string, password: string, remember_me: boolean): Promise<ServerResponse<string>> {

    const res = await fetch(`${backendv1_endpoint()}/user/login`, {
        method: "POST",
        headers: {
            ...BACKENDV1_BASE_POST_HEADERS
        },
        credentials: 'include',
        body: JSON.stringify({ user_info: { email, password, remember_me } })
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
