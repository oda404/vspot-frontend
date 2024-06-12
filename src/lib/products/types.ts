
export type ProductFilter = {
    name: string;
    options: {
        name: string;
        selected: boolean;
    }[];
};

export type ProductSortOption = {
    value: string;
    label: string;
};

export type ProductHorizontalData = {
    internal_id: string;
    name: string;
    image_url: string;
    price: number;
    price_decimals: number;
    discount: number;
    currency: string;
};
