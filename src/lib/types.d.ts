
export type FilterTabOptionSelectable = {
    name: string;
    selected: boolean;
    matches: number;
};

export type FilterTabOption = {
    name: string;
    selectable: FilterTabOptionSelectable[];
};

export type CartProduct = {
    id: string;
    name: string;
    qty: number;
    price: number;
    price_decimals: number;
    currency: string;
    stock: number;
    preview_image_url: string;
}

export type SortOption = {
    value: string;
    label: string;
}

