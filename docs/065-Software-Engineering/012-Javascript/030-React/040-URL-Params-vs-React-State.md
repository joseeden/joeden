---
title: "URL Params vs React State"
description: "URL Params vs React State"
tags: 
- Computer Science
- Application Development
- Software Development
- Web Development
- JavaScript
- React
- NextJS
sidebar_position: 40
# last_update:
#   date: 06/22/2026
---

## Overview

URL params and React state both store information about the current UI, but they are useful in different situations.

- Use URL params when the value should be visible in the address bar, shareable, or remembered after a refresh. 
- Use React state when the value is temporary and only matters while the component is open.

They can also be used together. A login page can use the URL to decide whether it is in login or signup mode, while React state stores the email, password, loading state, and error messages.

## URL Params 

URL params are values stored in the URL.

There are two common types:

| Type          | Example                  | Common use                                           |
| ------------- | ------------------------ | ---------------------------------------------------- |
| Route params  | `/notes/123`             | Identify a specific resource, such as a note ID.     |
| Search params | `/auth?mode=signup`      | Store page options, filters, tabs, and view modes.   |

In Next.js, route params usually come from folder names such as:

```text
app/notes/[id]/page.tsx
```

Search params come from the query string:

```text
/auth?mode=signup
```

## React State

React state stores values inside a component.

It is useful for values that change while the user interacts with the page.

```tsx
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState<string | null>(null);
const [pending, setPending] = useState(false);
```

This state does not need to be in the URL because it is private to the form and temporary.

## When to Use Each

| Use case                                      | Better choice       | Why                                                         |
| --------------------------------------------- | ------------------- | ----------------------------------------------------------- |
| Open a specific note page                     | Route params        | The note ID belongs in the URL.                             |
| Switch between login and signup modes         | Search params       | The mode can be linked, refreshed, and bookmarked.          |
| Store typed email and password values         | React state         | Form input is temporary and should not be in the URL.       |
| Show a loading state after clicking submit    | React state         | Loading only matters during the current interaction.        |
| Store a search filter for a list page         | Search params       | The filtered view can be shared or restored later.          |
| Open and close a temporary dropdown           | React state         | The dropdown state usually does not need a unique URL.      |
| Store the selected tab in a dashboard         | It depends          | Use params if the tab should be linkable. Use state if not. |

## Auth Page Example

A simple authentication page can use React state only:

```tsx
const [mode, setMode] = useState<"login" | "signup">("login");
```

This is fine when the mode only matters inside the current page session.

For a more URL-friendly version, use a search param:

```tsx
const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
```

Then the page can support direct links:

```text
/auth?mode=login
/auth?mode=signup
```

The form fields can still use React state:

```tsx
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [pending, setPending] = useState(false);
```

This means the URL controls the page mode, and React state controls the form interaction.

## Using Both Together

Using both is common.

For example:

| Value             | Store in          | Reason                                             |
| ----------------- | ----------------- | -------------------------------------------------- |
| `mode=signup`     | Search params     | Users can open the signup page directly.           |
| `email`           | React state       | The email is form input and should stay private.   |
| `password`        | React state       | The password must never be placed in the URL.      |
| `pending`         | React state       | Loading state only matters while submitting.       |
| `error`           | React state       | The error message is temporary UI feedback.        |

:::warning

Do not put passwords, tokens, private user data, or sensitive form values in URL params. URLs can appear in browser history, logs, screenshots, analytics, and shared links.

:::

## Practical Rule

Ask this question:

> Should this UI state survive refresh, browser navigation, or sharing the link?

If yes, use URL params.

If no, use React state.

If only part of the page needs to survive, use both. Put the shareable page state in the URL, and keep the temporary interaction state in React.
