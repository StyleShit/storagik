import { useLocalStorage } from '../../src';

export function Counter({ title }: { title: string }) {
	const [count, setCount] = useLocalStorage('count', 0);

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
					setCount((prev) => prev - 1);
				}}
			>
				Decrement
			</button>
		</div>
	);
}
