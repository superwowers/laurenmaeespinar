import React from 'react';
import { roles } from '../data/portfolioData';

export default function Roles() {
  return (
    <section id="skills">
      <div className="eyebrow">
        <span>what I do</span>
      </div>
      <h2>Where I fit on a team</h2>
      <div className="roles">
        {roles.map((r) => (
          <div className="card role" key={r.name}>
            <h4>{r.name}</h4>
            <p>{r.what}</p>
            <small>{r.where}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
