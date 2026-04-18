---
title: "Adding the Homepage Let's Talk Section"
sidebar_position: 35
description: "Implementation notes for the homepage contact section"
tags:
  - Docusaurus
---

## Overview

This KB documents the implementation of the homepage **LET'S TALK** section, including structure, styling, form submission behavior, and dark mode support.

The section was added to keep contact interactions simple and lightweight, without creating a custom backend service.

Files involved:

- `src/components/homepage/LetsTalk.tsx`
- `src/components/homepage/LetsTalk.module.scss`
- `src/pages/index.tsx`


## Implementation

### 1. Create the LET'S TALK component

A dedicated component was created in:

- `src/components/homepage/LetsTalk.tsx`

The component includes:

- Section heading (`LET'S TALK`)
- Intro copy
- Contact form fields (`name`, `email`, `message`)
- Submit button with loading state
- Inline success/error feedback

It uses React state for submit status:

- `isSubmitting` to prevent duplicate submissions and show `Sending...`
- `status` for `idle | success | error`


### 2. Configure email delivery endpoint

The form submits to FormSubmit using an AJAX endpoint:

```tsx
const FORM_ENDPOINT = "https://formsubmit.co/ajax/josemanuelitoeden@gmail.com";
```

Submission is handled with `fetch` and `FormData`.

Hidden fields are included:

- `_subject` to set the email subject
- `_captcha` set to `false` for a smoother flow
- `_honey` honeypot field to reduce bot submissions


### 3. Add section styles and width constraints

Styles are defined in:

- `src/components/homepage/LetsTalk.module.scss`

Layout choices:

- `max-width: 728px` to match the homepage section width requirement
- Horizontal padding aligned with existing sections
- Input, textarea, and button styles consistent with the current visual system

Responsive behavior for mobile:

- Name/email inputs stack vertically on smaller screens
- Submit button expands to full width on mobile


### 4. Support light and dark themes

Dark mode styles are implemented using:

```scss
[data-theme="dark"] {
  ...
}
```

Dark mode coverage includes:

- Section background
- Title and intro text colors
- Label text colors
- Input/textarea background, border, and placeholder colors
- Focus ring contrast
- Submit button hover/active states
- Success and error message colors


### 5. Add section to homepage order

The section is rendered after `SKILLS` in:

- `src/pages/index.tsx`

The page sequence is:

- `Hero`
- `Experiences`
- `Skills`
- `LetsTalk`


## Additional Notes

1. First-time `FormSubmit` setup may require email verification before messages are delivered.
2. If delivery is not working, check spam/junk folders for the verification email.
3. If needed, this implementation can be switched to `Formspree` by replacing only `FORM_ENDPOINT` and keeping the component structure unchanged.

Maintenance:

- To update intro text, edit `LetsTalk.tsx` only.
- To tune spacing, inputs, or button design, edit `LetsTalk.module.scss`.
- To move section order, adjust component placement in `index.tsx`.
