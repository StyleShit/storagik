import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, expectTypeOf, it } from 'vitest';
import { useLocalStorage, useSessionStorage } from '..';

describe.each([
	{
		storage: window.localStorage,
		useStorage: useLocalStorage,
		hookName: 'useLocalStorage',
	},

	{
		storage: window.sessionStorage,
		useStorage: useSessionStorage,
		hookName: 'useSessionStorage',
	},
])('Storagik - $hookName', ({ storage, useStorage }) => {
	afterEach(() => {
		storage.clear();
	});

	it('should return the user-defined initial value when there is no value in the storage', () => {
		// Act.
		const { result } = renderHook(() =>
			useStorage('test', 'initial-value'),
		);

		// Assert.
		expect(result.current[0]).toBe('initial-value');

		expectTypeOf(result.current[0]).toEqualTypeOf<string>();

		expectTypeOf(result.current[1]).toEqualTypeOf<
			(value: string | ((prev: string) => string)) => void
		>();
	});

	it('should return the value from the storage when it exists', () => {
		// Arrange.
		storage.setItem('test', JSON.stringify('stored-value'));

		// Act.
		const { result } = renderHook(() =>
			useStorage('test', 'initial-value'),
		);

		// Assert.
		expect(result.current[0]).toBe('stored-value');
	});

	it.todo('should return the initial value when the stored value is invalid');

	it('should update the value in the storage when the value is updated', () => {
		// Act.
		const { result } = renderHook(() =>
			useStorage('test', 'initial-value'),
		);

		act(() => {
			result.current[1]('updated-value');
		});

		// Assert.
		expect(result.current[0]).toBe('updated-value');

		expect(storage.getItem('test')).toBe(JSON.stringify('updated-value'));
	});

	it('should support updating the value with an updater function', () => {
		// Act.
		const { result } = renderHook(() =>
			useStorage('test', 'initial-value'),
		);

		act(() => {
			result.current[1]((prev) => prev + '-updated');
		});

		// Assert.
		expect(result.current[0]).toBe('initial-value-updated');

		expect(storage.getItem('test')).toBe(
			JSON.stringify('initial-value-updated'),
		);
	});
});
