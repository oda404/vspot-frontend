
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, parent, url }) {

    if ((await parent()).user)
        redirect(307, "/");
}

