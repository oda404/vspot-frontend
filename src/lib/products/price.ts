
export function product_price_get_percdiff(discounted: number, original: number) {
    let n = (-(discounted - original)) / (discounted / 100);
    if (n < 0)
        n *= -1;

    return Math.floor(n);
}
