import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
    if ((await parent()).user)
        return redirect(307, "/");
}
