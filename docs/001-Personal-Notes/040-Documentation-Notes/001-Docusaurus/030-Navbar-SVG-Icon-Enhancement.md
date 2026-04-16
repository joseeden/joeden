---
title: "Navbar SVG Icons on Web Links"
sidebar_position: 30
description: "Add SVG arrow icons to external navbar links for improved UX"
tags: 
- Docusaurus
- Navbar
- SVG
- React
- UX Enhancement
---

## Overview

This KB documents how to add SVG arrow icons to specific navbar links in a Docusaurus site. This minor update provides visual indication that certain navbar items link to external sites.

Key features:

- ✅ Dynamically adds SVG icons to specified links
- ✅ Works on desktop navbar and mobile sidebar
- ✅ Smooth hover animation
- ✅ Uses `currentColor` for automatic color inheritance
- ✅ `MutationObserver` handles Docusaurus re-renders

The SVG icons in the screenshot below indicate that the "Merria Digital" and "Velarae" links in the navbar point to external websites.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-16112554.png)

</div>


## Implementation

### File Structure

Added a custom `Navbar` component with the following structure:

```
src/
  theme/
    Navbar/
      index.tsx
      navbar.css
```

### Code and Styling 

File modified: 

- `src/theme/Navbar/index.tsx`
- `src/theme/Navbar/navbar.css`
- `docusaurus.config.js` (to include the new Navbar component)

I started with creating a wrapper around Docusaurus's default Navbar component which dynamically adds SVG icons to specified external links:

<details>
  <summary> `src/theme/Navbar/index.tsx` </summary>
  
  ```tsx
  // 

  import React, { useEffect } from 'react';
  import NavbarOriginal from '@theme-original/Navbar';
  import './navbar.css';

  export default function Navbar(props: any): JSX.Element {
    useEffect(() => {
      const targetUrls = [
        'https://www.merriadigital.com',
        'https://www.velarae.co/'
      ];

      const addArrowIcon = (link: Element | null) => {
        if (link && !link.querySelector('.navbar-arrow-icon')) {
          const container = document.createElement('span');
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.gap = '4px';
          
          const text = link.textContent;
          link.textContent = '';
          
          const textSpan = document.createElement('span');
          textSpan.textContent = text;
          container.appendChild(textSpan);
          
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('class', 'navbar-arrow-icon');
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          svg.setAttribute('width', '16');
          svg.setAttribute('height', '16');
          svg.setAttribute('viewBox', '0 0 16 16');
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
          svg.setAttribute('stroke-width', '1.5');
          svg.setAttribute('stroke-linecap', 'round');
          svg.setAttribute('stroke-linejoin', 'round');
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', '4.5');
          line.setAttribute('y1', '11.5');
          line.setAttribute('x2', '11.5');
          line.setAttribute('y2', '4.5');
          
          const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          polyline.setAttribute('points', '4.5 4.5 11.5 4.5 11.5 11.5');
          
          svg.appendChild(line);
          svg.appendChild(polyline);
          container.appendChild(svg);
          
          link.appendChild(container);
        }
      };

      const processAllLinks = () => {
        targetUrls.forEach(url => {
          const links = document.querySelectorAll(`a[href="${url}"]`);
          links.forEach(link => addArrowIcon(link));
        });
      };

      processAllLinks();

      const observer = new MutationObserver(() => {
        processAllLinks();
      });

      observer.observe(document.body, { subtree: true, childList: true });

      return () => observer.disconnect();
    }, []);

    return <NavbarOriginal {...props} />;
  }
  ```

</details>

Next, the navbar component is added to the Docusaurus config to replace the default Navbar:

<details>
  <summary> `docusaurus.config.js` </summary>
 
```js
module.exports = {
  // ... other config options ...
  themeConfig: {
    // ... other theme config options ...
    navbar: {
      // ... existing navbar config ...
      hideOnScroll: true,
    },
  },
  themes: [
    // ... other themes ...
    '@docusaurus/theme-classic',
  ],
  plugins: [
    // ... other plugins ...
    function myPlugin() {
      return {
        name: 'custom-navbar',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@theme/Navbar': require.resolve('./src/theme/Navbar/index.tsx'),
              },
            },
          };
        },
      };
    },
  ],
};
```

</details>

For styling, I've added hover animation for the icons:

```css
.navbar-arrow-icon {
  transition: transform 0.2s ease;
}

a[href="https://www.merriadigital.com"]:hover .navbar-arrow-icon,
a[href="https://www.velarae.co/"]:hover .navbar-arrow-icon {
  transform: translate(2px, -2px);
}
```


## Customization

1. **Adding more links**

    To add more links in the future, simply include their URLs in the `targetUrls` array:

    ```tsx
    const targetUrls = [
      'https://www.merriadigital.com',
      'https://www.velarae.co/',
      'https://your-new-link.com'  // Add new URLs here
    ];
    ```

2. **Customizing the SVG Icon**

    The SVG line and polyline elements can also be replaced with the desired SVG markup to customize the icon design.

3. **Adjusting the Animation**

    The `transform` and `transition` properties in `navbar.css` can also be modified to change both the hover effect intensity and speed.

## Browser Compatibility

This implementation uses:

- `querySelectorAll` - Supported in all modern browsers
- `MutationObserver` - Supported in all modern browsers
- `createElementNS` - Supported in all modern browsers
- CSS `transform` - Supported in all modern browsers

Compatible with modern versions of Chrome, Firefox, Safari, and Edge.

Notes:

- The component uses a `MutationObserver` to handle both initial load and sidebar-open events on mobile
- Icons inherit styling from the parent link (including color, hover state, and other properties)
- The implementation works with Docusaurus's default theme system and is based on swizzling
