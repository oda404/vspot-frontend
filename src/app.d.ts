// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type FilterTabOptionSelectable = {
		name: string;
		selected: boolean;
		matches: number;
	};

	type FilterTabOption = {
		name: string;
		selectable: FilterTabOptionSelectable[];
	};

	type CartProduct = {
		id: string;
		sync_name: string;
		qty: string;
		sync_price_per_one: number;
		sync_price_per_one_decimals: number;
		currency: string;
	}

	type SortOption = {
		value: string;
		label: string;
	}
}

