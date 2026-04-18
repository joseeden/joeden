import React from 'react';
import signatureWhite from '@site/assets/site-design/signature/signature-white.png';
import EmailIcon from '@site/assets/site-design/footer/email.svg';
import GithubIcon from '@site/assets/site-design/footer/github.svg';
import XIcon from '@site/assets/site-design/footer/x.svg';
import LinkedInIcon from '@site/assets/site-design/footer/linkedin.svg';
import LocationIcon from '@site/assets/site-design/footer/location.svg';
import DocusaurusIcon from '@site/assets/site-design/footer/docusaurus.svg';

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
              <EmailIcon width="20" height="20" aria-hidden="true" />
            </a>

            <a href="https://github.com/joseeden" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <GithubIcon width="20" height="20" aria-hidden="true" />
            </a>

            <a href="https://x.com/eden_noel08" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
              <XIcon width="20" height="20" aria-hidden="true" />
            </a>

            <a href="https://linkedin.com/in/joseeden" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <LinkedInIcon width="20" height="20" aria-hidden="true" />
            </a>
          </div>

          <p className="footer-copyright">© Eden Jose {currentYear}</p>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta-item">
            <LocationIcon width="12" height="12" aria-hidden="true" />
            <span>SINGAPORE, GMT+8</span>
          </div>

          <div className="footer-meta-item">
            <DocusaurusIcon width="12" height="12" aria-hidden="true" />
            <a href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">Built with Docusaurus</a>
          </div>
        </div>
      </div>
    </footer>
  );
}