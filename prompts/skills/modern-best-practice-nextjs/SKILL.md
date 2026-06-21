---
name: modern-best-practice-nextjs
description: Use this skill when building, reviewing, or refactoring Next.js applications. Focuses on App Router, Server Components, routing, data loading, caching, Server Actions, route states, metadata, deployment-aware code, and current Next.js best practices.
---

# Modern Next.js Best Practices

Use this skill for modern Next.js applications, especially projects using the App Router. Prefer the project’s existing conventions, and verify current documentation for version-sensitive behavior.

## Documentation Freshness

Next.js changes often. For APIs, caching behavior, runtime behavior, configuration, or version-specific migration questions, check current official documentation or the project’s configured documentation tools before making broad changes.

## Routing and Project Structure

- Use the `app/` router for new application routes unless the project is intentionally using `pages/`.
- Organize routes with layouts, nested segments, and route groups when they make navigation or ownership clearer.
- Keep shared UI in reusable components, but keep route-specific logic close to the route.
- Use `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and route handlers according to App Router conventions.
- Avoid adding a new folder pattern if the existing project already has a clear structure.

## Server and Client Components

- Treat Server Components as the default.
- Add `"use client"` only when a component needs client state, effects, browser APIs, event handlers, or client-only libraries.
- Keep client components as small leaves where practical.
- Pass serializable props from Server Components to Client Components.
- Do not import server-only code into client components.
- Move data access, secrets, and privileged logic to the server.

## Data Loading and Caching

- Prefer loading data on the server when possible.
- Avoid fetching application data from `useEffect` when a Server Component, route handler, framework cache, or data library is a better fit.
- Be explicit about caching, revalidation, and dynamic behavior when it matters.
- Use route segment config, fetch options, or framework APIs intentionally rather than relying on accidental defaults.
- Avoid hand-rolled cache, loading, and retry logic when the framework or a data library already solves the problem.

## Mutations and Server Actions

- Use Server Actions when they fit the interaction and the project supports them.
- Validate inputs on the server even if the client already validates them.
- Keep mutations close to the data rules they enforce.
- Revalidate or refresh affected data after a mutation when needed.
- For forms, consider React/Next patterns such as `useActionState` when they improve clarity.
- Do not put secrets or authorization decisions in client code.

## Route Handlers and APIs

- Use route handlers for HTTP endpoints, webhooks, auth callbacks, external integrations, or cases where a plain HTTP boundary is useful.
- Return appropriate status codes and structured errors.
- Validate request input at the boundary.
- Keep authentication and authorization checks server-side.
- Avoid duplicating business logic between route handlers and Server Actions; extract shared server utilities when needed.

## UI States and Streaming

- Provide `loading.tsx` for route-level pending states when navigation or data loading may wait.
- Provide `error.tsx` for recoverable route-level errors.
- Use `not-found.tsx` and `notFound()` for missing resources.
- Use `Suspense` around async UI when it improves perceived responsiveness or isolates loading states.
- Keep loading and error UI useful, not decorative filler.

## Metadata and SEO

- Use the Metadata API in pages and layouts.
- Prefer static metadata where possible.
- Use dynamic metadata only when it depends on route data.
- Keep titles, descriptions, canonical URLs, and social metadata accurate for the route.

## Performance

- Prefer server rendering and streaming where they reduce client JavaScript.
- Avoid marking large component trees as client components.
- Use `next/image`, `next/font`, and framework-supported optimization tools where appropriate.
- Split expensive or rarely used UI when it helps actual user experience.
- Measure before adding complex optimization patterns.

## Security and Environment

- Keep environment secrets server-only.
- Validate all user-controlled input on the server.
- Protect server actions, route handlers, and database access with authentication and authorization checks.
- Be careful with redirects, cookies, headers, and external URLs.
- Choose Node or Edge runtime intentionally based on dependencies and platform constraints.

## Review Checklist

Before finishing:

- Is the route structure aligned with the App Router and the existing project?
- Are Server Components used by default?
- Are client components limited to places that need client behavior?
- Is data loaded at the right layer?
- Are caching and revalidation choices intentional?
- Are mutations validated and authorized on the server?
- Are loading, error, and not-found states covered where useful?
- Is metadata handled with the Metadata API?
- Are secrets and privileged logic kept out of client code?
