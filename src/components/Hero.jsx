import React from 'react';
import { personalInfo, LINKS } from '../data/portfolioData';

export default function Hero({ onNavigate }) {
  const [role, ...rest] = personalInfo.headline;
  return (
    <section id="home" className="hero2">
      <div className="avatar">
        <img src={`${import.meta.env.BASE_URL}images/me-shades.jpg`} alt={personalInfo.name} />
      </div>
      <span className="status">
        <i></i>
        {personalInfo.status}
      </span>
      <h1 className="name">{personalInfo.name}</h1>
      <div className="catch">
        <span className="pr">$</span> {role}
        {rest.map((part) => (
          <React.Fragment key={part}>
            <span className="sl">/</span>
            {part}
          </React.Fragment>
        ))}
      </div>
      <div className="tagrow">
        {personalInfo.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <p className="copy">{personalInfo.intro}</p>
      <div className="btns">
        <button type="button" className="btn" onClick={() => onNavigate('projects')}>
          See my projects
        </button>
        <button type="button" className="btn g" onClick={() => onNavigate('skills')}>
          My tech stack
        </button>
        <a className="btn g" href={LINKS.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn g" href={LINKS.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
      <div className="facts">
        {personalInfo.facts.map((f) => (
          <div className="card" key={f.label}>
            <small>{f.label}</small>
            <h4>{f.value}</h4>
            <p>{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
