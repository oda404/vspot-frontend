
export function price_make(whole: number, decimals: number = 0) {
    if (decimals)
        return whole.toString() + "." + decimals.toString();

    return whole.toString() + ".00";
}
