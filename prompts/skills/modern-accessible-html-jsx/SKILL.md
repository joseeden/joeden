---
name: modern-accessible-html-jsx
description: Use this skill when writing, reviewing, or refactoring HTML or JSX. Focuses on semantic structure, keyboard access, forms, labels, images, landmarks, ARIA restraint, and accessible interaction patterns across projects.
---

# Modern Accessible HTML and JSX

Use semantic, standards-based HTML as the default foundation for UI. Accessibility should be built into the markup and interaction model from the start, not patched in at the end.

## Core Approach

- Choose the native element that matches the job before reaching for `div`, `span`, or ARIA.
- Prefer browser behavior over custom behavior when it already solves the problem.
- Keep markup understandable without CSS and JavaScript where practical.
- Treat accessibility as part of correctness, not as a separate enhancement.

## Semantics and Structure

- Use document landmarks intentionally: `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`.
- Keep one primary `main` region per page or app shell.
- Use headings to describe the content outline. Avoid skipping heading levels for visual size alone.
- Use lists for repeated groups and tables for tabular data.
- Use buttons for actions and links for navigation.
- Avoid replacing native interactive elements with clickable non-interactive elements.

## Keyboard and Focus

- Every interactive control must be reachable and usable with the keyboard.
- Preserve visible focus styles or replace them with an equally clear custom focus style.
- Ensure focus order follows the visual and logical reading order.
- Manage focus intentionally after opening or closing dialogs, menus, popovers, and route-like views.
- Do not create keyboard traps unless the pattern requires temporary focus containment, such as a modal dialog.

## Names, Labels, and Descriptions

- Every interactive element needs an accessible name from visible text, a label, or a clear ARIA attribute.
- Prefer visible labels for form controls.
- Associate labels and controls with `htmlFor`/`id` or by nesting where appropriate.
- Use helper text and error messages in ways assistive tech can discover.
- Icon-only buttons need a readable accessible name, usually with `aria-label`.

## Forms

- Use the most specific input type that fits: `email`, `url`, `tel`, `number`, `date`, `search`, and so on.
- Provide labels, validation messages, and required/optional context clearly.
- Use native validation where it fits, and add custom validation only when needed.
- Connect field errors with `aria-describedby` when the error is separate from the control.
- Do not rely on color alone to communicate errors or success.

## Images and Media

- Write useful `alt` text for informative images.
- Use `alt=""` for decorative images that add no content.
- Prefer `figure` and `figcaption` when an image needs a visible caption or explanation.
- Provide captions, transcripts, or alternatives for audio/video when relevant.
- Avoid hiding important text inside images.

## ARIA

- Use ARIA to clarify semantics only when native HTML cannot express the pattern.
- Do not use ARIA to disguise incorrect markup.
- Do not add roles or attributes that duplicate native semantics.
- When building custom widgets, implement the expected keyboard behavior and state attributes together.
- Keep ARIA state accurate, such as `aria-expanded`, `aria-selected`, `aria-current`, and `aria-disabled`.

## JSX Notes

- Use React attribute names correctly: `htmlFor`, `className`, `aria-*`, and `data-*`.
- Keep conditional rendering from removing labels, descriptions, or focus targets unexpectedly.
- Ensure generated IDs are stable enough for label and description relationships.
- When mapping lists, use stable keys that match the data identity.

## Review Checklist

Before finishing:

- Does the markup use the correct native elements?
- Can the UI be operated with keyboard only?
- Are focus states and focus movement clear?
- Do controls have accessible names?
- Are forms labeled and errors connected to fields?
- Are images described or marked decorative correctly?
- Is ARIA minimal, accurate, and paired with the required behavior?
- Does the content structure make sense to someone reading it linearly?
