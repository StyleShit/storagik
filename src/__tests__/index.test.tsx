import * as React from 'react';
import { act } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
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

	it('should return the initial value when the stored value is invalid', () => {
		// Arrange.
		storage.setItem('test', '{ broken-json }');

		// Act.
		const { result } = renderHook(() =>
			useStorage('test', 'initial-value'),
		);

		// Assert.
		expect(result.current[0]).toBe('initial-value');
	});

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
		// Arrange.
		const Component = () => {
			const [count, setCount] = useStorage('count', 0);

			return (
				<button
					onClick={() => {
						setCount((prev) => prev + 1);
						setCount((prev) => prev + 1);
						setCount((prev) => prev + 1);
					}}
				>
					{count}
				</button>
			);
		};

		render(<Component />);

		const button = screen.getByRole('button');

		// Assert.
		expect(button).toHaveTextContent('0');

		// Act.
		act(() => {
			button.click();
		});

		// Assert.
		expect(button).toHaveTextContent('3');
	});
});
