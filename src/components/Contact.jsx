import React, { useState } from 'react';
import { LINKS } from '../data/portfolioData';

const svg = (children) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

const icons = {
  gmail: svg(
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 8l9 6 9-6" />
    </>
  ),
  linkedin: svg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.7 1-2 2-2s2 .8 2 2.5V16" />
    </>
  ),
  github: svg(
    <path d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.2c0-1 .1-1.4-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1-.3-3.400 1.300a11.700 11.700 0 0 0-6.200 0C6.600 3.800 5.600 4.100 5.600 4.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4.200 10.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21" />
  ),
  instagram: svg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.500 6.500v.01" />
    </>
  ),
  facebook: svg(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.500c0-.3.200-.5.500-.5z" />),
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked: the address is visible on the page anyway */
    }
  };

  const social = [
    { key: 'linkedin', label: 'LinkedIn', value: 'lauren-mae-espinar', href: LINKS.linkedin },
    { key: 'github', label: 'GitHub', value: 'superwowers', href: LINKS.github },
    { key: 'instagram', label: 'Instagram', value: '@_laurenmaww', href: LINKS.instagram },
    { key: 'facebook', label: 'Facebook', value: 'laurenmawii', href: LINKS.facebook },
  ];

  return (
    <section id="contact">
      <div className="eyebrow">
        <span>contact</span>
      </div>
      <h2>Let's build something durable together.</h2>
      <p className="lead">
        Offering an internship or junior role, adding AI to your product, or collaborating on a project? Get in touch
        through Gmail or any of the links below.
      </p>
      <div className="card row-card mail">
        <span className="cico">{icons.gmail}</span>
        <div className="grow">
          <small>Gmail</small>
          <div className="rv">{LINKS.email}</div>
        </div>
        <a
          className="btn"
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${LINKS.email}&su=${encodeURIComponent('Hello Lauren')}`}
          target="_blank"
          rel="noreferrer"
        >
          Send email ↗
        </a>
        <button type="button" className="btn g" onClick={copyEmail}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="socials">
        {social.map((s) => (
          <a key={s.key} className="card row-card social" href={s.href} target="_blank" rel="noreferrer">
            <span className="cico">{icons[s.key]}</span>
            <div className="grow">
              <small>{s.label}</small>
              <div className="rv">{s.value}</div>
            </div>
            <span className="go">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
