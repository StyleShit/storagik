export function createStorageAdapter(storageArea: Storage) {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	const getItem = <T>(key: string): T | null => {
		const value = storageArea.getItem(key);

		if (value === null) {
			return null;
		}

		try {
			return JSON.parse(value) as T;
		} catch {
			return null;
		}
	};

	const setItem = (key: string, value: unknown) => {
		const stringifiedValue = JSON.stringify(value);

		storageArea.setItem(key, stringifiedValue);

		// The browser doesn't dispatch the `storage` event for the current tab,
		// so we need to dispatch it manually.
		//
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
		window.dispatchEvent(
			new StorageEvent('storage', {
				key,
				storageArea,
			}),
		);
	};

	const subscribe = (key: string, subscriber: () => void) => {
		const abortController = new AbortController();

		window.addEventListener(
			'storage',
			(e) => {
				if (e.key !== key || e.storageArea !== storageArea) {
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

	return {
		getItem,
		setItem,
		subscribe,
	};
}
