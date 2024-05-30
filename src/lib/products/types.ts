
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