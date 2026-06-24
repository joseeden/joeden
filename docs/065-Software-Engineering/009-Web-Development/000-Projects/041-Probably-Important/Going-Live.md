---
title: "Going Live"
description: "Deployment notes for the Probably Important note-taking app"
tags:
- Web Development
- Next.js
- TypeScript
- Vercel
- Prisma
- Neon PostgreSQL
- better-auth
sidebar_position: 42
---


## Overview

The Probably Important app is a learning project focused on modern full-stack web development and AI-assisted software development with Claude Code. It is a note-taking application that supports rich text editing, public sharing, search, and user authentication.

The project has primarily been used for experimentation and has not been deployed to a production environment.

> Source code: https://github.com/joseeden/Probably-Important

The application currently includes:

- User authentication
- Rich text note editing
- Public note sharing
- Search functionality
- Route protection
- Unit testing with Vitest

This page documents the considerations, requirements, and deployment steps that would be needed to run the application in a production environment.


## Current Stack

| Tool            | Current Use                       |
| --------------- | --------------------------------- |
| Next.js         | App framework with App Router     |
| Bun             | Local package manager and runtime |
| TypeScript      | Type safety                       |
| Tailwind CSS    | Styling                           |
| better-auth     | Email and password authentication |
| Prisma          | Database access and migrations    |
| Neon PostgreSQL | Hosted PostgreSQL database        |
| TipTap          | Rich text editing                 |
| Vercel          | Likely deployment target          |


## Important Files

| File                                      | Purpose                                                  |
| ----------------------------------------- | -------------------------------------------------------- |
| `package.json`                            | Defines build, dev, test, and Prisma scripts.           |
| `.env.example`                            | Lists required environment variables.                    |
| `lib/auth.ts`                             | Configures better-auth.                                  |
| `lib/auth-client.ts`                      | Configures the client-side auth helper.                  |
| `lib/db.ts`                               | Creates Prisma with the Neon adapter.                    |
| `prisma/schema.prisma`                    | Defines auth tables and app-owned note tables.           |
| `prisma/migrations/`                      | Contains database migrations that must be deployed.      |
| `app/api/auth/[...all]/route.ts`          | Exposes the better-auth route handler.                   |
| `proxy.ts`                                | Performs the optimistic session-cookie auth redirect.    |
| `app/auth/page.tsx`                       | Contains the sign-in and sign-up UI.                     |

## Production Checklist

Before deploying to production:

- [ ] Email verification implemented.
- [ ] Password reset implemented.
- [ ] Rate limiting configured.
- [ ] Production environment variables configured.
- [ ] Database migrations applied.
- [ ] Linting passed.
- [ ] Tests passed.
- [ ] Production build completed successfully.
- [ ] Authentication flows validated.
- [ ] Authorization and note ownership validated.
- [ ] Public sharing validated.
- [ ] Secrets and environment files reviewed.


## Vercel Deployment 

1. Import the GitHub repository into Vercel.
2. Set the Vercel project root to `project-probably-important`.
3. Keep the framework preset as Next.js.
4. Use the project build command:

   ```bash
   bun run build
   ```

5. Add the required production environment variables in Vercel.
6. Point `DATABASE_URL` to the production Neon database.
7. Point `BETTER_AUTH_URL` to the production app URL.
8. Generate a strong `BETTER_AUTH_SECRET`.
9. Apply Prisma migrations to the production database.
10. Test sign-up, sign-in, create note, edit note, delete note, and public sharing.

## Environment Variables

```env
DATABASE_URL="postgresql://xxxxxxxxxxxxxxxxxsslmode=require"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
BETTER_AUTH_URL="https://your-production-domain.com"
```

**Note:** Locally, `BETTER_AUTH_URL` can stay as the local development URL. In production, it must match the deployed origin.

## Database Deployment

The app already uses Neon PostgreSQL and the Prisma Neon adapter.

For production, apply committed migrations with:

```bash
bunx prisma migrate deploy
```

Do not use `prisma migrate dev` for production. That command is for local development.

The safer production pattern is:

1. Commit schema changes and migration files.
2. Run tests locally.
3. Run `prisma migrate deploy` in CI/CD or a controlled deployment step.
4. Deploy the Next.js app after migrations are applied.

**Note:** Avoid keeping the production database URL in a local `.env` file unless there is a specific reason. Use Vercel environment variables and repository secrets.

## Current Auth State

The app currently enables email and password authentication in `lib/auth.ts`.

```ts
emailAndPassword: {
  enabled: true,
}
```

The `User` table already has:

```prisma
emailVerified Boolean @default(false)
```

However, the app does not currently send verification emails.

That means the app can accept a syntactically valid email address, but it does not prove that the user controls that address.

## Requirements for Production

### Email Validation 

The sign-up form currently uses:

```tsx
<input type='email' required />
```

This gives browser-level email format validation.

It does not provide production-grade email validation because:

- Users can bypass browser validation.
- The server does not have an explicit app-level auth input schema.
- The app does not verify email ownership.
- A user can sign up with someone else's email address.

Before public deployment, make sure to add email verification through better-auth.

The production version should include:

- A transactional email provider.
- A `sendVerificationEmail` implementation in `lib/auth.ts`.
- `requireEmailVerification: true` under `emailAndPassword`.
- A post-sign-up screen that tells users to check their email.
- A resend verification email action.
- Sign-in error handling for unverified accounts.

The better-auth shape is roughly:

```ts
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // Send `url` to user.email through the chosen email provider.
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
});
```

### Password Reset

Production password authentication should also include password reset.

Add:

- A forgot password form.
- A reset password form.
- A `sendResetPassword` implementation in better-auth.
- Email delivery through the same transactional email provider.

Without password reset, users can get permanently locked out.

### Rate Limiting

Add rate limiting before allowing public sign-ups.

Protect at least:

- Sign-up.
- Sign-in.
- Resend verification email.
- Password reset request.

This is important because auth routes are easy targets for spam and credential attacks.

Possible options:

| Option          | Notes                                          |
| --------------- | ---------------------------------------------- |
| Upstash Redis   | Common with Vercel, and has a free tier.       |
| Vercel Firewall | Useful for coarse protection and bot controls. |
| In-app limiter  | Possible, but harder on serverless hosting.    |

## Email Provider Options

> Pricing was checked on 2026-06-24. Re-check before implementation because free tiers can change.

| Provider   | Free Option                        | Notes                                             |
| ---------- | ---------------------------------- | ------------------------------------------------- |
| Resend     | 3,000 emails/month, 100 emails/day | API and SMTP support, with 1 free domain.         |
| Brevo      | Free forever plan                  | Check the current sending quota before choosing.  |
| MailerSend | 500 emails/month                   | Requires approval and card details.               |
| Postmark   | 100 emails/month                   | Strong reputation, but a small free tier.         |

For this project, Resend is a good choice for a free email provider.

- It has a useful free tier for a small note-taking app.
- It is focused on transactional app email.
- It has a simple API.
- It works well with Next.js projects.
- The free tier is enough for sign-up verification and password reset during early testing.

Use a real domain if possible, even for a small project. Transactional email works best when the sender domain has proper DNS records.

Expected DNS records:

- SPF
- DKIM
- DMARC

**Note:** If the project does not have a custom domain yet, choose an email provider that supports a test mode or sandbox sender while building. For production, use a verified domain.

Sources:

- [Resend Pricing](https://resend.com/pricing)
- [Brevo Pricing](https://www.brevo.com/pricing/)
- [MailerSend Pricing](https://www.mailersend.com/pricing)
- [Postmark Pricing](https://postmarkapp.com/pricing)
- [better-auth Email and Password](https://better-auth.com/docs/authentication/email-password)
- [Prisma Migrate Deploy](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate)


## Server-Side Validation To Add

The app already validates note input with Zod in `lib/validations.ts`.

Add similar schemas for auth input:

```ts
export const signUpSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(128),
});

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(128),
});
```

Client-side validation improves the experience. Server-side validation protects the app.

## Deployment Decision

For this project, Vercel and Neon PostgreSQL are the simplest deployment option because they align closely with the existing development stack and require minimal infrastructure management.

Before a public deployment, the following items should be completed:

- Email verification
- Password reset
- Rate limiting
- Production environment configuration
- Deployment validation and testing

Once those controls are in place, the application would be suitable for a small-scale public deployment.
