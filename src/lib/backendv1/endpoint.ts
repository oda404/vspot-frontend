
import { PUBLIC_VSPOT_BACKEND_GLOBAL_URL, PUBLIC_VSPOT_BACKEND_LOCAL_URL } from '$env/static/public';
import { browser } from '$app/environment';

export function backendv1_endpoint() {
    const BACKEND_URL = browser ? PUBLIC_VSPOT_BACKEND_GLOBAL_URL : PUBLIC_VSPOT_BACKEND_LOCAL_URL;
    return `${BACKEND_URL}/v1`;
}
