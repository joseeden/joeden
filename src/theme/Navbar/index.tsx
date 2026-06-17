import React, { useEffect, useLayoutEffect } from 'react';
import NavbarOriginal from '@theme-original/Navbar';
import './navbar.css';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ArrowIcon = () => (
  <svg 
    className="navbar-arrow-icon"
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ marginLeft: '8px', verticalAlign: 'middle', display: 'inline' }}
  >
    <line x1="4.5" y1="11.5" x2="11.5" y2="4.5"></line>
    <polyline points="4.5 4.5 11.5 4.5 11.5 11.5"></polyline>
  </svg>
);

export default function Navbar(props: any): JSX.Element {
  useIsomorphicLayoutEffect(() => {
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
        
        // Move existing text to span
        const text = link.textContent;
        link.textContent = '';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        
        container.appendChild(textSpan);
        
        // Create and add SVG icon
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

    const restoreRightNavbarItems = () => {
      const navbarItems = document.querySelector('.navbar__items') as HTMLElement | null;
      const navbarItemsRight = document.querySelector('.navbar__items--right') as HTMLElement | null;

      if (navbarItems && navbarItemsRight) {
        const movedRightChildren = Array.from(navbarItems.children).filter(
          (child) => (child as HTMLElement).dataset.navbarMovedFromRight === 'true'
        );

        movedRightChildren.forEach((child) => {
          (child as HTMLElement).removeAttribute('data-navbar-moved-from-right');
          navbarItemsRight.appendChild(child);
        });

        navbarItemsRight.style.display = '';
      }
    };

    const reorganizeNavbarFor997px = () => {
      // Only reorganize for 997px and above
      if (window.innerWidth < 997) {
        restoreRightNavbarItems();
        return;
      }

      const navbarItems = document.querySelector('.navbar__items') as HTMLElement | null;
      const navbarItemsRight = document.querySelector('.navbar__items--right') as HTMLElement | null;

      if (navbarItems && navbarItemsRight) {
        // Move all children from navbar__items--right into navbar__items
        const rightChildren = Array.from(navbarItemsRight.children);
        rightChildren.forEach((child) => {
          (child as HTMLElement).dataset.navbarMovedFromRight = 'true';
          navbarItems.appendChild(child);
        });

        // Hide the now-empty navbar__items--right
        navbarItemsRight.style.display = 'none';
      }
    };

    const processAllLinks = () => {
      targetUrls.forEach(url => {
        const links = document.querySelectorAll(`a[href="${url}"]`);
        links.forEach(link => addArrowIcon(link));
      });
    };

    // Run immediately
    processAllLinks();
    reorganizeNavbarFor997px();

    // Watch for changes in case navbar or sidebar re-renders
    const observer = new MutationObserver(() => {
      processAllLinks();
      reorganizeNavbarFor997px();
    });

    observer.observe(document.body, { subtree: true, childList: true });

    // Handle window resize
    const handleResize = () => {
      reorganizeNavbarFor997px();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <NavbarOriginal {...props} />;
}
