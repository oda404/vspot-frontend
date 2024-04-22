import type { V1ServerProductDisplayData } from "$lib/backendv1/product";

export type ProductFilter = {
    title: string;
    options: {
        name: string;
        matches: number;
        selected: boolean;
    }[];
};

export type ProductSortOption = {
    value: string;
    label: string;
};

export type Product = V1ServerProductDisplayData;