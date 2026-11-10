import React from 'react';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education">
      <div className="eyebrow">
        <span>education</span>
      </div>
      <h2>School and events</h2>
      <div className="roles">
        {education.map((e) => (
          <div className="card role" key={e.name}>
            <h4>{e.name}</h4>
            <p>{e.what}</p>
            <small>{e.where}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
