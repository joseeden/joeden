---
title: "Server Actions and 'use server' Directive"
description: "Server Actions and using 'use server' directive for secure server-side logic execution."
tags: 
- Web Development
- Frontend Development
- Javascript
- NextJS
sidebar_position: 20
last_update:
  date: 2/9/2021
---

## Overview

In Next.js App Router, the `'use server'` directive marks a file or function as a **server action**, which ensures it runs only on the server. This allows secure execution of logic such as database operations and secret handling without exposing it to the client.

**Why `'use server'` must be the first line?**

- It signals Next.js to treat the file or function as a server action
- It must appear at the very top of the file or function body
- It must come before imports, comments, or any code
- It ensures proper server-only execution during build and runtime

**What happens if it is not the first line?**

- Next.js ignores the directive
- The code may run on the client instead of the server
- Server-only APIs such as database access may break
- Sensitive logic may be exposed unintentionally
- Runtime issues or silent failures may occur

## Default Behavior

By default, Next.js does not treat any file or function as a server action, which means they can run on both the client and server.

- Add `'use server'` directive to explicitly opt into server-only behavior
- It must be the very first line to ensure correct interpretation
- Next.js only applies server action behavior when directive is correctly placed

Correct usage:

```ts 
'use server'
import { db } from '@/db'

export async function createUser(data) {
  await db.user.create({ data })
}
```

Incorrect usage:

```ts 
// This is a comment
'use server'
import { db } from '@/db'

export async function createUser(data) {
  await db.user.create({ data })
}
```

Notes: 

- The incorrect version will not be treated as a server action
- It may behave like a normal module instead
