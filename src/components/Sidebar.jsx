import React from 'react';
import { sections } from '../data/portfolioData';

const icons = {
  home: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  projects: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
    </>
  ),
  skills: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 8l9 6 9-6" />
    </>
  ),
};

export default function Sidebar({ active, dark, onNavigate, onToggleTheme, soundOn, onToggleSound }) {
  return (
    <aside className="side">
      <div className="logo">
        <i>
          <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="" />
        </i>
      </div>
      {sections.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`nav${active === id ? ' on' : ''}`}
          onClick={() => onNavigate(id)}
          aria-current={active === id ? 'true' : undefined}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons[id]}
          </svg>
          {label}
        </button>
      ))}
      <div className="ctrlgroup">
        <button
          type="button"
          className="tswitch"
          role="switch"
          aria-checked={dark}
          aria-label="Dark mode"
          onClick={onToggleTheme}
        >
          <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
          <span className="knob"></span>
        </button>
        <button
          type="button"
          className="soundbtn"
          aria-label={soundOn ? 'Mute click sound' : 'Unmute click sound'}
          aria-pressed={soundOn}
          onClick={onToggleSound}
        >
          {soundOn ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path d="M16.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 6a9 9 0 0 1 0 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path d="M16 9l5 6M21 9l-5 6" />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
}
