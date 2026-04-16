import React, { useEffect } from 'react';
import NavbarOriginal from '@theme-original/Navbar';
import './navbar.css';

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
  useEffect(() => {
    // Add arrow icons to specific navbar links
    const merriaDigitalLink = document.querySelector('a[href="https://www.merriadigital.com"]');
    const velaraeLink = document.querySelector('a[href="https://www.velarae.co/"]');

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

    // Run immediately and set up observer for potential re-renders
    addArrowIcon(merriaDigitalLink);
    addArrowIcon(velaraeLink);

    // Watch for changes in case navbar re-renders
    const observer = new MutationObserver(() => {
      addArrowIcon(document.querySelector('a[href="https://www.merriadigital.com"]'));
      addArrowIcon(document.querySelector('a[href="https://www.velarae.co/"]'));
    });

    observer.observe(document.body, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, []);

  return <NavbarOriginal {...props} />;
}
