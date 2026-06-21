---
name: modern-best-practice-react-components
description: Use this skill when creating, reviewing, or refactoring React components. Applies modern React, TypeScript, accessibility, composition, state management, and performance best practices.
---

# Modern React Component Best Practices

## Purpose

This skill provides guidance for building maintainable, scalable, and modern React components.

Apply these guidelines when:

- Creating new React components
- Refactoring existing components
- Reviewing pull requests
- Migrating legacy React code
- Building Next.js applications
- Improving component performance or maintainability

## General Principles

- Prefer functional components.
- Prefer named `function` components for exported components.
- Use arrow functions for callbacks, closures, inline render props, and small local helpers when they improve readability.
- Use TypeScript for type safety.
- Keep components focused on a single responsibility.
- Favor composition over prop-heavy component APIs.
- Avoid premature optimization.
- Prioritize readability and maintainability.
- Prefer explicitness over cleverness.
- Follow the local codebase conventions before introducing a new style.

## Component Structure

Prefer:

```tsx
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ children, variant = "primary" }: ButtonProps) {
  return <button data-variant={variant}>{children}</button>;
}
```

Avoid:

- Large monolithic components
- Deeply nested JSX
- Deep prop drilling
- Excessive conditional rendering in a single component
- Business logic mixed with presentation logic
- Excessive boolean props when a clearer composition or variant API would work

Group related logic together. A good default order is props/types, derived values, event handlers, helper functions, then JSX. Keep complex helpers outside the component when they do not need component state.

## State Management

Prefer:

1. Local component state when possible
2. Context for shared UI state
3. Dedicated state management only when justified

Guidelines:

- Keep state as close as possible to where it is used.
- Derive values instead of storing duplicated state.
- Avoid unnecessary `useState` and `useReducer` usage.
- Store the smallest useful state, such as an ID instead of a whole selected object when the object can be derived.
- Do not mirror props in state unless there is a clear reason.
- Prefer controlled components when parent state needs to own the value.
- Avoid unnecessary `useEffect` usage.
- Read [You Might Not Need an Effect](../references/you-don't-need-useeffects.md) when deciding whether an effect is necessary.

## Effects

Before using `useEffect`, ask:

- Can this be calculated during render?
- Can this be derived from props or state?
- Can it be handled by an event handler?
- Can this be handled by a framework feature, router, or data library?

Use effects primarily for:

- Subscriptions
- Timers
- Browser APIs
- External widgets or non-React libraries
- Analytics tied to a component or page becoming visible
- Client-side data fetching when no better abstraction is available

Avoid using effects for:

- Simple state synchronization
- Data transformations
- User-event logic such as form submission, navigation, or notifications

When client data fetching is needed, prefer framework-level data loading, Server Components, or a data library such as TanStack Query when the project already uses one.

When an effect is necessary, keep it narrow, include cleanup for async work/subscriptions/timers, and avoid combining unrelated concerns in one effect.

## Event Handling

Prefer named handlers for meaningful logic:

```tsx
function handleClick() {
  // ...
}

<button onClick={handleClick} />;
```

Avoid putting complex inline callbacks directly in JSX.

Use clear handler names such as `handleSubmit`, `handleChange`, and `handleClose`. Keep handlers small and move complex logic into helper functions. Put interaction-driven side effects in the handler that caused them.

## Data Fetching

For Next.js applications:

- Prefer Server Components when appropriate.
- Fetch data on the server whenever possible.
- Minimize client-side fetching.
- Handle loading and error states explicitly.
- Use TanStack Query or another project-approved data library for client cache, refetching, and request state when needed.
- Avoid hand-rolled loading/cache/retry logic if the framework or a data library already provides it.

## Performance

Only optimize when needed.

Common optimizations:

- React Compiler or framework optimizations
- Component splitting
- Code splitting
- `React.memo`
- `useMemo`
- `useCallback`

Do not add memoization without a measurable or clearly justified benefit. Keep list keys stable and meaningful.

## Accessibility

All components should:

- Use semantic HTML
- Support keyboard navigation
- Include accessible labels
- Maintain sufficient color contrast
- Provide proper focus states
- Prefer native elements and browser behavior before custom ARIA-heavy widgets.

## Styling

Prefer:

- Consistent design system components
- Utility-first CSS (e.g. Tailwind)
- Reusable UI primitives

Avoid:

- Inline styles for complex UIs
- Duplicated styling patterns
- Large unstructured CSS files

## Review Checklist

Before completing a component:

- Is the component focused on one responsibility?
- Is the API simple and intuitive?
- Is TypeScript used correctly?
- Is accessibility considered?
- Is state management appropriate?
- Can derived state be calculated instead of stored?
- Are effects limited to real side effects?
- Are event handlers named and small?
- Are props clear without an explosion of boolean flags?
- Is unnecessary complexity avoided?
- Is the component easy to test and maintain?
