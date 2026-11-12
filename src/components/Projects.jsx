import React, { useState } from 'react';
import { projectSlides, howItWorks } from '../data/portfolioData';

const position = (index, active, total) => {
  const offset = (index - active + total) % total;
  if (offset === 0) return '0';
  if (offset === 1) return '1';
  if (offset === total - 1) return '-1';
  return 'h';
};

export default function Projects() {
  const [active, setActive] = useState(0);
  const total = projectSlides.length;
  const step = (d) => setActive((a) => (a + d + total) % total);
  const slide = projectSlides[active];
  const howSteps = howItWorks.find((h) => h.id === slide.how)?.steps;

  return (
    <section id="projects">
      <div className="eyebrow">
        <span>projects</span>
      </div>
      <div className="l3d">
        {projectSlides.map((s, i) => (
          <div
            key={s.title}
            className="lap"
            data-pos={position(i, active, total)}
            onClick={() => setActive(i)}
            role="button"
            tabIndex={0}
            aria-label={`Show ${s.title}`}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(i)}
          >
            <div className="lscr">
              <img src={s.image} alt={s.alt} loading="lazy" />
            </div>
          </div>
        ))}
      </div>

      <div className="ctrl">
        <button type="button" onClick={() => step(-1)} aria-label="Previous project">
          ←
        </button>
        <div className="dots">
          {projectSlides.map((s, i) => (
            <i key={s.title} className={i === active ? 'on' : ''}></i>
          ))}
        </div>
        <button type="button" onClick={() => step(1)} aria-label="Next project">
          →
        </button>
      </div>

      <div className="card cap2" key={slide.title}>
        <div className="badges">
          {slide.badges.map((b, i) => (
            <span key={b} className={`bd${i === 0 ? ' k' : ''}`}>
              {i === 0 ? '● ' : ''}
              {b}
            </span>
          ))}
        </div>
        <h3>{slide.title}</h3>
        <p>{slide.description}</p>
        <details className="more">
          <summary>My role and stack</summary>
          <div className="myrole">
            <b>My role</b>
            {slide.role}
          </div>
          <div className="stk">
            {slide.stack.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                {value}
              </div>
            ))}
          </div>
        </details>
        {howSteps && (
          <details className="more">
            <summary>How it works</summary>
            <div className="steps">
              {howSteps.map(([title, text]) => (
                <div className="step" key={title}>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </details>
        )}
        <div className="acts">
          {slide.links.map((l, i) => (
            <a key={l.href} className={`btn${i ? ' g' : ''}`} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
