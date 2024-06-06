import { backendv1_base_fetch } from "./base_fetch";
import { backendv1_endpoint } from "./endpoint";
import type { ServerResponse } from "./response";
import { BACKENDV1_BASE_GET_HEADERS, BACKENDV1_BASE_POST_HEADERS } from "./headers";

export type V1ServerCouponInfo = {
    code: string;
    discount_perc: number;
};

export type V1ClientCouponRegisterInfo = {
    code: string;
    discount_perc: number;
    active: boolean;
};

export async function backendv1_coupon_get_info(
    code: string
): Promise<ServerResponse<V1ServerCouponInfo>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/coupon/info?code=${code}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_GET_HEADERS
            }
        }
    );
}

export async function backendv1_coupon_register(
    coupon_register_info: V1ClientCouponRegisterInfo
): Promise<ServerResponse<V1ServerCouponInfo>> {
    return await backendv1_base_fetch(
        `${backendv1_endpoint()}/coupon/register`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                ...BACKENDV1_BASE_POST_HEADERS
            },
            body: JSON.stringify({ coupon_register_info })
        }
    );
}
