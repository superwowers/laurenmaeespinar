import React, { useState } from 'react';
import { techStack } from '../data/portfolioData';

const SEGMENTS = techStack.length;
const STEP = 360 / SEGMENTS;

const point = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [160 + r * Math.cos(a), 160 + r * Math.sin(a)];
};

const arc = (a0, a1, ro, ri) => {
  const [x1, y1] = point(ro, a0);
  const [x2, y2] = point(ro, a1);
  const [x3, y3] = point(ri, a1);
  const [x4, y4] = point(ri, a0);
  return `M${x1},${y1} A${ro} ${ro} 0 0 1 ${x2},${y2} L${x3},${y3} A${ri} ${ri} 0 0 0 ${x4},${y4} Z`;
};

export default function TechStack() {
  const [active, setActive] = useState(0);
  const current = techStack[active];

  return (
    <section id="skills">
      <div className="eyebrow">
        <span>tech stack</span>
      </div>
      <h2>What I build with</h2>
      <p className="lead">Click a segment to see the technologies in each group.</p>
      <div className="ringwrap">
        <div>
          <div className="techring">
            <svg viewBox="0 0 320 320" role="group" aria-label="Tech stack groups">
              {techStack.map((t, i) => {
                const a0 = i * STEP + 3;
                const a1 = (i + 1) * STEP - 3;
                const [lx, ly] = point(133, (a0 + a1) / 2);
                return (
                  <React.Fragment key={t.name}>
                    <path
                      d={arc(a0, a1, 158, 108)}
                      className={`seg${i === active ? ' on' : ''}`}
                      onClick={() => setActive(i)}
                    >
                      <title>{t.name}</title>
                    </path>
                    <text x={lx} y={ly} className={`segn${i === active ? ' on' : ''}`}>
                      {i + 1}
                    </text>
                  </React.Fragment>
                );
              })}
            </svg>
            <div className="hub">
              <small>
                {active + 1} of {SEGMENTS}
              </small>
              <b>{current.name}</b>
            </div>
          </div>
          <div className="legend">
            {techStack.map((t, i) => (
              <button key={t.name} type="button" className={i === active ? 'on' : ''} onClick={() => setActive(i)}>
                {i + 1} · {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="card tdet">
          <h3>{current.name}</h3>
          <div className="used">{current.note}</div>
          {current.items.map(([name, kind]) => (
            <div className="it" key={name}>
              <b>{name}</b>
              <span>{kind}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
