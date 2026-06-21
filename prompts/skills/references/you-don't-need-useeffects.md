# You Might Not Need an Effect

Use this reference when a component reaches for `useEffect`. The goal is not to ban effects, but to keep them for work that genuinely needs to coordinate React with something outside React.

## Main Question

Ask why the code needs to run:

- If it is needed to display the current UI, calculate it during render.
- If it happens because the user did something, run it in that event handler.
- If it keeps React in sync with a browser API, subscription, timer, network request, or third-party widget, an effect may be appropriate.

## Common Cases That Do Not Need Effects

### Derived Values

Do not store values that can be calculated from existing props or state.

```tsx
function NamePreview({ firstName, lastName }: Props) {
  const displayName = `${firstName} ${lastName}`;

  return <p>{displayName}</p>;
}
```

This avoids extra state, extra renders, and possible stale values.

### Data Transformations

Filtering, sorting, grouping, and formatting for display usually belong in render logic or helper functions.

```tsx
const visibleItems = items.filter((item) => item.status === status);
```

Use `useMemo` only when the calculation is expensive enough to matter.

### Event-Based Work

Submitting a form, showing a toast, navigating, or sending an interaction request should usually happen inside the handler that caused it.

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  submitForm({ email, password });
}
```

Avoid setting temporary state just so an effect can notice that state and perform the real action later.

### Resetting State

If a prop change means a section of UI should start fresh, use a key at the boundary where state should reset.

```tsx
export function ProfilePage({ userId }: { userId: string }) {
  return <Profile key={userId} userId={userId} />;
}
```

If only part of the state depends on changing data, try storing the smallest stable value and deriving the rest.

```tsx
const selectedItem = items.find((item) => item.id === selectedId) ?? null;
```

### Syncing Parent and Child State

When parent and child need the same value, lift the state up and pass it down. Avoid child effects that call parent setters after render just to keep both sides synchronized.

## Cases Where Effects Are Reasonable

Effects are useful when a component must connect to an external system:

- Browser APIs or DOM APIs
- Event listeners and subscriptions
- Timers and intervals
- Third-party widgets that React does not control
- Analytics tied to a screen being shown
- Client-side fetching when server loading or a data library is not available

For external stores, consider `useSyncExternalStore` instead of manually wiring subscription state with an effect.

## Client Fetching

Fetching in an effect can be valid, but it needs stale-response handling. Without cleanup, an older request can finish after a newer request and overwrite the newer result.

```tsx
useEffect(() => {
  let cancelled = false;

  fetchResults(query).then((results) => {
    if (!cancelled) {
      setResults(results);
    }
  });

  return () => {
    cancelled = true;
  };
}, [query]);
```

Prefer framework data loading, Server Components, or a client data library such as TanStack Query when the project supports it. These handle caching, loading states, refetching, and race conditions more consistently than hand-written effects.

## Effect Review Checklist

Before keeping an effect, verify:

- It synchronizes with a real external system.
- It is not only deriving render data.
- It is not only responding to a user event.
- It cannot be replaced by a key, lifted state, or controlled component.
- Async work, subscriptions, and timers have cleanup.
- The effect is small enough to understand at a glance.
