import React, { useState } from 'react';
import { projectSlides } from '../data/portfolioData';

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
              <div>
                <img src={s.image} alt={s.alt} loading="lazy" />
              </div>
            </div>
            <div className="lbase"></div>
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

      <div className="card cap2">
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
