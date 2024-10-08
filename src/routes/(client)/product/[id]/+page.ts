import { backendv1_get_product_fullinfo_with_recommendations } from "$lib/backendv1/product.js";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await backendv1_get_product_fullinfo_with_recommendations(
    params.id,
    fetch,
  );

  if (res.status >= 400) {
    if (res.body.field === "product_id" && res.body.msg === "error.invalid")
      error(404);

    error(res.status, { message: res.body.msg });
  }

  return {
    product: res.body.data!.product,
    recommended: res.body.data?.recommended,
  };
};
