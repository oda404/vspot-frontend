export function is_string_len_valid(str: string, max: number, min: number = 1) {
    /* Sanity check */
    if (typeof str === "undefined")
        return false;

    if (str.length > max)
        return false;

    if (str.length < min)
        return false;

    return true;
}
