import { useLocalStorage } from '../../src';

type CounterProps = {
	title: string;
	storageKey: string;
};

export function Counter({ title, storageKey }: CounterProps) {
	const [count, setCount] = useLocalStorage(storageKey, 0);

	return (
		<div style={{ backgroundColor: '#EEE', padding: '10px' }}>
			<h2>{title}</h2>
			<p>Count: {count}</p>
			<button
				onClick={() => {
					setCount((prev) => prev + 1);
				}}
			>
				Increment
			</button>

			<button
				onClick={() => {
					setCount((prev) => prev + 1);
					setCount((prev) => prev + 1);
					setCount((prev) => prev + 1);
				}}
			>
				Increment By 3
			</button>

			<button
				onClick={() => {
					setCount((prev) => prev - 1);
				}}
			>
				Decrement
			</button>
		</div>
	);
}
