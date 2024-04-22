import { writable } from "svelte/store";

export type ScrollLock = {
    reason: string;
};

export const scroll_lock_store = writable<ScrollLock[]>([]);

export function scroll_add_lock(reason: string) {
    scroll_lock_store.update(($scroll_lock_store) => {
        if ($scroll_lock_store.find(l => l.reason === reason))
            return $scroll_lock_store;

        $scroll_lock_store.push({ reason });
        return $scroll_lock_store;
    });
}

export function scroll_remove_lock(reason: string) {
    scroll_lock_store.update(($scroll_lock_store) => {

        let idx = $scroll_lock_store.findIndex(l => l.reason === reason);
        if (idx === -1)
            return $scroll_lock_store;

        $scroll_lock_store.splice(idx, 1);
        return $scroll_lock_store;
    })
}
