import React, { useEffect, useState } from 'react';
import signatureWhite from '@site/assets/site-design/signature/signature-white.png';
import EmailIcon from '@site/assets/site-design/footer/email.svg';
import GithubIcon from '@site/assets/site-design/footer/github.svg';
import XIcon from '@site/assets/site-design/footer/x.svg';
import LinkedInIcon from '@site/assets/site-design/footer/linkedin.svg';
import LocationIcon from '@site/assets/site-design/footer/location.svg';

const signatureSrc =
  typeof signatureWhite === 'string'
    ? signatureWhite
    : signatureWhite?.default?.src || signatureWhite?.default || signatureWhite?.src || '';

const sgtDateTimeFormatter = new Intl.DateTimeFormat('en-SG', {
  timeZone: 'Asia/Singapore',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function formatSgtDateTime(date) {
  const parts = sgtDateTimeFormatter.formatToParts(date).reduce((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});

  return `${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute}:${parts.second} SGT`;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </g>
            </svg>
            <time className="footer-status-time" dateTime={now.toISOString()}>
              {formatSgtDateTime(now)}
            </time>
          </div>
        </div>
      </div>
    </footer>
  );
}