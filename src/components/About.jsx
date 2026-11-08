import React, { useState } from 'react';
import { gallery } from '../data/portfolioData';

export default function About() {
  const [active, setActive] = useState(0);
  const current = gallery[active];

  return (
    <section id="about">
      <div className="eyebrow">
        <span>about me</span>
      </div>
      <h2>A little more about me.</h2>
      <p className="lead">
        Outside of development, I collect Hirono figures, cook, take photographs and spend time with dogs.
      </p>
      <div className="gal">
        {gallery.map((g, i) => (
          <div
            key={g.title}
            className={`gi${i === active ? ' on' : ''}${g.w ? ' wide' : ''}`}
            style={{ flex: g.w || 1 }}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <div className="gbox">
              <div className="gp" style={{ '--h': `${g.h}px`, '--ry': `${g.ry}deg` }}>
                <img src={g.src} alt={g.title} style={{ objectPosition: g.pos }} loading="lazy" />
              </div>
            </div>
            <div className="gl">{g.title}</div>
          </div>
        ))}
      </div>
      <div className="galcap">
        <b>{current.title}</b> · {current.caption}
      </div>
    </section>
  );
}
