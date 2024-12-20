import { useEffect, useReducer } from 'react';

export function useLocalStorage<T>(key: string, initialState: T) {
	const [, reRender] = useReducer((p) => !p, false);

	useEffect(() => subscribe(key, reRender), [key]);

	const value = getItem<T>(key) ?? initialState;

	const setValue = (value: T) => {
		setItem(key, value);
	};

	return [value, setValue] as const;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const getItem = <T>(key: string): T | null => {
	const value = localStorage.getItem(key);

	return value ? (JSON.parse(value) as T) : null;
};

const setItem = (key: string, value: unknown) => {
	const stringifiedValue = JSON.stringify(value);

	localStorage.setItem(key, stringifiedValue);

	// The browser doesn't dispatch the `storage` event for the current tab,
	// so we need to dispatch it manually.
	window.dispatchEvent(
		new StorageEvent('storage', {
			key: key,
			storageArea: localStorage,
		}),
	);
};

const subscribe = (key: string, subscriber: () => void) => {
	const abortController = new AbortController();

	window.addEventListener(
		'storage',
		(e) => {
			if (e.key !== key || e.storageArea !== localStorage) {
				return;
			}

			subscriber();
		},
		{ signal: abortController.signal },
	);

	return () => {
		abortController.abort();
	};
};
