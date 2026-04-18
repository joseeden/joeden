import React from 'react';
import signatureWhite from '@site/assets/site-design/signature-white.png';

const signatureSrc =
  typeof signatureWhite === 'string'
    ? signatureWhite
    : signatureWhite?.default?.src || signatureWhite?.default || signatureWhite?.src || '';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-signature-wrapper">
            <img
              src={signatureSrc}
              alt="Eden Jose signature"
              className="footer-signature"
              loading="lazy"
            />
          </div>

          <div className="footer-socials">
            <a href="mailto:josemanuelitoeden@gmail.com" className="social-icon" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 6h18v12H3V6z" stroke="currentColor" strokeWidth="1.8" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </a>

            <a href="https://github.com/joseeden" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a href="https://x.com/joseeden" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.043 9.193L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.603-9.831L0 1.153h7.594l5.243 6.932 6.064-6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
              </svg>
            </a>

            <a href="https://linkedin.com/in/joseeden" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <p className="footer-copyright">© Eden Jose {currentYear}</p>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>SINGAPORE, GMT+8</span>
          </div>

          <div className="footer-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.051 2.721c.507-.058 1.165.355 1.469.922l4.048 7.552c.302.566.138 1.066-.368 1.124l-5.078.577c-.507.058-.93.553-.95 1.108l-.198 5.078c-.02.555-.453.989-.969.97l-.626-.02c-.516-.02-.93-.486-.924-1.04l.198-5.078c.02-.555.424-1.05.905-1.108l5.078-.577c.507-.058.67-.558.368-1.124L5.75 3.643c-.303-.567-.14-1.067.366-1.124zM17.786 7.26c.53-.06 1.017.329 1.09.867l1.03 7.25c.073.538-.293 1.03-.823 1.09l-7.25 1.03c-.53.06-1.017-.329-1.09-.867l-.09-.632c-.073-.538.293-1.03.823-1.09l6.303-.896-.896-6.303c-.073-.538.293-1.03.823-1.09z" />
            </svg>
            <a href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">Built with Docusaurus</a>
          </div>
        </div>
      </div>
    </footer>
  );
}