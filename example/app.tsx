import { useState } from 'react';
import { Counter } from './components/counter';

export function App() {
	const [key, setKey] = useState('count');

	return (
		<>
			<h1>Storagik</h1>

			<input
				type="text"
				placeholder="Key"
				value={key}
				onChange={(e) => {
					setKey(e.target.value);
				}}
			/>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '10px',
					marginTop: '10px',
				}}
			>
				<Counter title="Counter 1" storageKey={key} />
				<Counter title="Counter 2" storageKey={key} />
			</div>
		</>
	);
}
