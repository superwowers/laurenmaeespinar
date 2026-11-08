import React, { useState } from 'react';
import { howItWorks } from '../data/portfolioData';

export default function HowItWorks() {
  const [activeId, setActiveId] = useState(howItWorks[0].id);
  const view = howItWorks.find((v) => v.id === activeId);

  return (
    <section id="systems">
      <div className="eyebrow">
        <span>how they work</span>
      </div>
      <h2>How they work</h2>
      <p className="lead">
        A short walkthrough of the ACES LMS portals, how the two AI features work, and how FitWise measures a fit.
      </p>
      <div className="tabs" role="tablist">
        {howItWorks.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={v.id === activeId}
            className={`pill${v.id === activeId ? ' solid' : ''}`}
            onClick={() => setActiveId(v.id)}
          >
            {v.tab}
          </button>
        ))}
      </div>
      <div className="card">
        <div className="steps">
          {view.steps.map(([title, text]) => (
            <div className="step" key={title}>
              <b>{title}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <pre>{view.snippet}</pre>
        {view.image && (
          <figure className="shot">
            <img src={view.image.src} alt={view.image.caption} loading="lazy" />
            <figcaption>{view.image.caption}</figcaption>
          </figure>
        )}
      </div>
      {view.actions && (
        <div className="btns" style={{ marginTop: 14 }}>
          {view.actions.map((a) => (
            <a key={a.href} className="btn" href={a.href} target="_blank" rel="noreferrer">
              {a.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
