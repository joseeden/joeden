---
title: Designing the Project Page
description: "Designing and implementing the projects page with tags, filtering, and responsive layout"
tags:
- Docusaurus
sidebar_position: 25
---

## Overview

This page documents the complete design and implementation process for my site's projects page, including adding tags to project cards, implementing a 2-column layout with categories filter sidebar, and comprehensive styling for both light and dark modes. 

**Note**: It actually took me multiple iterations to achieve the functional design.

## Background

The projects page initially displayed project cards in a simple grid layout.

The goal was to enhance it with:

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

This enables categorization of projects with visible tags.

See [Project Card Tags.](/docs/001-Personal-Notes/040-Documentation-Notes/001-Docusaurus/024-Project-Card-Tags.md)

<div class='img-center'>

![](/img/docs/Screenshot2026-04-11034443.png)

</div>

### 2. Style Project Tags

This focuses on customizing the appearance of tags.

- Added `.tags` and `.tag` CSS classes
- Set tag background and text colors
- Added right margin for better spacing between them
- Added top and bottom margin for better separation from other content
- Implemented dark mode variants

See [Project Card Tags: Add Tag Styling](/docs/001-Personal-Notes/040-Documentation-Notes/001-Docusaurus/024-Project-Card-Tags.md#4-add-tag-styling-optional)

Dark mode:

<div class='img-center'>

![](/img/docs/Screenshot2026-04-11034639.png)

</div>


### 3. Restructure Page Layout

After setting how each project card will look, the next step was to design the overall page layout. 

I tried several variations, before settling on a 2-column grid with the categories sidebar on the left and the project cards on the right.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-11034338.png)

</div>

Initial customizations done:

- Wrapped page content so that it follows same max width as header
- Added padding to the page container for better spacing
- Added a header box above the page container for the "Projects" title

Files modified:

- `src/pages/projects.tsx`
- `src/components/projects/Project.module.scss`

**UPDATE:** The more complex stuff like the toggable categories and responsive design came in step 6 and step 9.


### 4. Update the Card Layout

This step focuses on testing side-by-side card layout 

- Converted cards to grid layout with image and content side-by-side
- Updated card dimensions and spacing
- Added responsive fallback for mobile

Files modified:

- `src/components/projects/Project.tsx`
- `src/components/projects/Project.module.scss`

**UPDATE:** After testing the side-by-side layout, I decided to revert back to the original vertical card layout where the image is stacked above the body and footer.


### 5. Refine Card Styling

This step focuses more on styling the project cards to match the overall design aesthetic of the site.

Initially, I had added borders to the cards and buttons, but after testing it, I decided to remove them for a cleaner look.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-11041157.png)

</div>

No borders looks better (only done on light mode):

<div class='img-center'>

![](/img/docs/Screenshot2026-04-11041227.png)

</div>

**UPDATE:** I've also set the project cards to have a "hover effect" and a "box-shadow effect on hover", which adds a subtle shadow to the card when hovered over. This gives it a slight "lift" and makes it more interactive.

<div class='img-center'>

![](/gif/docs/11042026-docusaurus-category-4.gif)

</div>

I experimented with adding the box-shadow effect on dark mode as well, but I don't think it adds much, plus the project cards have borders when dark mode, so I decided to keep the box-shadow effect only for light mode.



Files modified:

- `src/components/projects/Project.tsx`
- `src/components/projects/Project.module.scss`

### 6. Add Categories Filtering

This is actually the most complex step, as it involved updating the JSX structure to allow selecting categories and implementing the filtering logic to show/hide project cards based on selected categories.

<div class='img-center'>

![](/gif/docs/11042026-docusaurus-category-3.gif)

</div>

Files modified:

- `src/pages/projects.tsx`
- `src/components/projects/Project.module.scss`

### 9. Hide Column 1 on Small Screens

This step focuses on prioritizing project card readability on smaller mobile screens.

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

This step focuses on connecting the category checkboxes to the displayed project cards.

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


