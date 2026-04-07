---
title: Designing the Project Page
description: "Designing and implementing the projects page with tags, filtering, and responsive layout"
tags:
- Docusaurus
sidebar_position: 25
---

## Overview

This page documents the complete design and implementation process for the Docusaurus projects page, including adding tags to project cards, implementing a 2-column layout with categories filter sidebar, and comprehensive styling for both light and dark modes. 

Note: The process involved multiple iterations to achieve the functional design.

## Background

The projects page initially displayed project cards in a simple grid layout. The goal was to enhance it with:

- **Tags**: Categorize projects by technology and type
- **Filtering**: Add a sidebar for category-based filtering
- **Layout**: Implement a 2-column responsive design
- **Styling**: Clean, borderless design with consistent theming

The category filter is intentionally available only on laptop and larger screen sizes. 

<div class='img-center'>

![](/img/docs/Screenshot2026-04-07225342.png)

</div>

On small mobile screens, the categories are hidden from display so the project cards can use the full width and remain readable.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-07225643.png)

</div>

## Implementation Steps

### 1. Add Tags to Project Cards

Enable categorization of projects with visible tags.

- Updated `ProjectData` interface to include optional `tags` array
- Modified `Project` component to render tags below project description
- Added initial tag data to projects in `projects.tsx`

Files modified:

- `src/components/projects/Project.tsx`
- `src/pages/projects.tsx`

### 2. Style Project Tags

Create visually appealing tag styling.

- Added `.tags` and `.tag` CSS classes
- Set tag background to blue (`#3578e5`) with white text
- Added margins for spacing between tags and from content
- Implemented dark mode variants

Files modified:

- `src/components/projects/Project.module.scss`

### 3. Adjust Page and Tag Spacing

Improve visual hierarchy and spacing.

- Added 5rem top margin to `.projectsPage`
- Increased bottom margin on `.projectsTitle` to 5rem
- Added 8px right margin to tags for horizontal spacing

Files modified:

- `src/components/projects/Project.module.scss`

### 4. Restructure Page Layout

Implement 2-column grid layout with categories sidebar.

- Wrapped page content in `.pageContainer` with `max-width: 1536px`
- Created 2-column CSS grid (1fr 3fr)
- Moved header and cards list to right column
- Added placeholder left column for future sidebar

Files modified:

- `src/pages/projects.tsx`
- `src/components/projects/Project.module.scss`

### 5. Experiment with Card Layout

Test side-by-side card layout (later reverted).

- Converted cards to grid layout with image and content side-by-side
- Updated card dimensions and spacing
- Added responsive fallback for mobile

Files modified:

- `src/components/projects/Project.tsx`
- `src/components/projects/Project.module.scss`

### 6. Revert to Original Card Layout

Return to vertical card layout for better content flow.

- Reverted cards to stacked image/body/footer layout
- Restored flex-wrap grid for cards
- Maintained 2-column page structure

Files modified:

- `src/components/projects/Project.tsx`
- `src/components/projects/Project.module.scss`

### 7. Refine Card Styling

Achieve clean, borderless design.

- Changed card background to white
- Removed card borders
- Removed button borders in footer
- Updated tag colors to subtle gray (`#eeeef1` background, `#696f83` text)
- Set "See Project" link color to `#696f83`
- Added button icon back with matching color

Files modified:

- `src/components/projects/Project.tsx`
- `src/components/projects/Project.module.scss`

### 8. Add Categories Filter Sidebar

Implement toggleable category filters in left column.

- Added "CATEGORIES" header with padding/margins
- Styled checkboxes and labels with consistent spacing
- Added dark mode support

Also created toggleable list with checkboxes for:

- DevOps
- Security
- Web Development
- Data Analysis
- Data Engineering
- Machine Learning
- Others

Files modified:

- `src/pages/projects.tsx`
- `src/components/projects/Project.module.scss`

### 9. Hide Column 1 on Small Screens

Prioritize project card readability on smaller mobile screens.

- Hid column 1 entirely on small screen sizes
- Kept the `Projects` header visible with a smaller font size
- Allowed only column 2 to remain visible on mobile
- Expanded project cards to use the full available width
- Limited the category filter experience to laptop and larger screen sizes

Reason:

- On narrow screens, showing both the categories sidebar and the project cards reduced the usable width too much
- Hiding the filter sidebar ensures project cards remain complete and readable

Files modified:

- `src/pages/projects.tsx`
- `src/components/projects/Project.module.scss`

### 10. Add Category Filtering Logic

Connect the category checkboxes to the displayed project cards.

- Added a categories configuration array in `projects.tsx`
- Added React state to track selected categories
- Wired each checkbox to controlled state using `checked` and `onChange`
- Implemented multi-select filtering so multiple categories can be active at the same time
- Kept all projects visible when no category is selected
- Filtered cards by matching selected category labels against each project's `tags`

Filtering behavior:

- If no category is selected, all project cards are displayed
- If one category is selected, only cards with a matching tag are displayed
- If multiple categories are selected, a card is displayed when it matches at least one selected category

Example:

- Selecting `DevOps` shows only cards tagged with `DevOps`
- Selecting `DevOps` and `Security` shows cards tagged with either `DevOps` or `Security`

Files modified:

- `src/pages/projects.tsx`

## Technical Details

### Component Structure

```
projects.tsx
├── pageContainer (max-width: 1536px)
    ├── leftColumn
    │   ├── categoriesHeader ("CATEGORIES")
    │   └── categoriesList (checkboxes, hidden on small screens)
    └── rightColumn
        └── cardsList (flex-wrap grid of Project components)

Above pageContainer
└── headerBox ("Projects" title)

Project.tsx
├── cardContainer
    └── card
        ├── image
        ├── card__body
        │   ├── title
        │   ├── description
        │   └── tags (optional)
        └── card__footer
            └── link with icon ("See Project")

Filtering logic in projects.tsx
├── categories array
├── selectedCategories state
├── handleCategoryToggle()
└── filteredProjects derived list
```

### CSS Architecture

- **Layout**: CSS Grid for page, Flexbox for cards and sidebar
- **Responsive**: Mobile-first with breakpoints at 960px and 600px
- **Theming**: Light/dark mode support with CSS custom properties
- **Spacing**: Consistent margins and padding using rem units
- **Colors**: Gray color palette for subtle, professional appearance

### Filtering Logic

- **State Management**: `useState` stores the currently selected category labels
- **Controlled Inputs**: Each checkbox reflects state through the `checked` prop
- **Toggle Handling**: Selecting a category adds it to the active list; selecting it again removes it
- **Matching Rule**: Filtering uses project tags and displays a card when any selected category matches one of its tags
- **Fallback Rule**: When the selected category list is empty, the full project list is rendered

### Key CSS Classes

| Class             | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| `.pageContainer`  | Main 2-column grid container                            |
| `.leftColumn`     | Sidebar container                                       |
| `.rightColumn`    | Content area                                            |
| `.cardsList`      | Flex-wrap grid for project cards                        |
| `.card`           | Individual project card (borderless, white background)  |
| `.tags`           | Container for tag elements                              |
| `.tag`            | Individual tag styling (gray background)                |             
| `.categoriesList` | Sidebar filter list                                     |
| `.categoryItem`   | Individual filter item with checkbox and label          |

## Challenges and Solutions

| Challenge               | Problem                                         | Solution                                                            |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| Import path issues      | Docusaurus v3 API changes caused build failures | Updated imports and component structure for compatibility           |
| Layout responsiveness   | 2-column layout needed mobile fallback          | Added media queries to collapse to a single column on small screens |
| Tag positioning         | Tags needed proper spacing from content         | Added margins and flexbox for consistent alignment                  |
| Dark mode consistency   | All new elements needed dark theme variants     | Extended dark mode CSS with matching color variables                |
| Mobile card readability | Sidebar reduced card width on phones            | Hid column 1 at small widths so project cards could render fully    |

## Future Enhancements

- **Tag Management**: Dynamic tag generation from project data
- **Animation**: Add smooth transitions for filter interactions
- **Search**: Add text search alongside category filters
- **Empty State**: Add a message for filter combinations with no matching projects


