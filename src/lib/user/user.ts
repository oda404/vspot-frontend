import { backendv1_post_user_logout, type V1ServerUserDisplayInfo } from "$lib/backendv1/user";

export type UserDisplayInfo = V1ServerUserDisplayInfo;

export async function user_logout() {
    return await backendv1_post_user_logout();
}
