import { Counter } from './components/counter';

export function App() {
	return (
		<>
			<h1>Storagik</h1>

			<div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
				<Counter title="Counter 1" />
				<Counter title="Counter 2" />
			</div>
		</>
	);
}
