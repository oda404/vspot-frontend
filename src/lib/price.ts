import Decimal from "decimal.js";

export function price_discount(total: number, discount_perc: number) {
    return new Decimal(total).dividedBy(100).mul(discount_perc).toNumber();
}

export function price_discounted_perc(total: number, discount_perc: number) {
    return new Decimal(total).minus(price_discount(total, discount_perc)).toNumber();
}

export function price_discounted_val(total: number, discount: number) {
    return new Decimal(total).minus(discount).toNumber();
}

export function price_format(price: number) {
    const price_str = price.toString();

    let dotidx = price_str.indexOf('.');
    if (dotidx === -1)
        dotidx = price_str.length;

    const len_before_dot = price_str.substring(0, dotidx).length;

    return price.toPrecision(len_before_dot + 2);
}
