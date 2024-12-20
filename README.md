# Storagik

Tiny package to interact with the browser's storage using React.

## installation

```bash
npm install storagik
```

## Usage

Storagik exposes `useLocalStorage` and `useSessionStorage` hooks to interact with the browser's storage.

The API of both hooks is similar to React's `useState` hook - They give you a tuple of a value and a setter function,
and have an additional parameter to set the key for the storage:

```tsx
import { useLocalStorage } from 'storagik';

function Counter() {
  const [count, setCount] = useLocalStorage('count', 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

Similar to `useState`, you can pass a function to the setter to update the value based on the previous value:

```tsx
import { useSessionStorage } from 'storagik';

function Counter() {
  const [count, setCount] = useSessionStorage('count', 0);

  return <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>;
}
```
