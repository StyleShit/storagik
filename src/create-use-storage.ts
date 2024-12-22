import { useEffect, useReducer } from 'react';
import { createStorageAdapter } from './create-storage-adapter';

type Updater<T> = (prev: T) => T;

export function createUseStorage(storageArea: Storage) {
	const { getItem, setItem, subscribe } = createStorageAdapter(storageArea);

	return <T>(key: string, initialState: T) => {
		const [, reRender] = useReducer((p) => !p, false);

		useEffect(() => subscribe(key, reRender), [key]);

		const value = getItem<T>(key) ?? initialState;

		const setValue = (valueOrUpdater: T | Updater<T>) => {
			let newValue = valueOrUpdater;

			if (typeof valueOrUpdater === 'function') {
				const prevValue = getItem<T>(key) ?? initialState;

				newValue = (valueOrUpdater as Updater<T>)(prevValue);
			}

			setItem(key, newValue);
		};

		return [value, setValue] as const;
	};
}
