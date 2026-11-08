import React, { useState } from 'react';
import { LINKS } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked: the address is visible on the page anyway */
    }
  };

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.email}`);
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="eyebrow">
        <span>contact</span>
      </div>
      <div className="cgrid">
        <div>
          <h2>Let's build something durable together.</h2>
          <p className="lead">
            Offering an internship or junior role, adding AI to your product, or collaborating on a project? Let's talk.
          </p>
          <div className="card row-card">
            <div>
              <small>Direct email</small>
              <div className="rv">{LINKS.email}</div>
            </div>
            <button type="button" className="btn g" onClick={copyEmail}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="card row-card" style={{ marginTop: 10 }}>
            <div>
              <small>LinkedIn</small>
              <div className="rv">lauren-mae-espinar</div>
            </div>
            <a className="btn g" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              Open ↗
            </a>
          </div>
          <div className="card row-card" style={{ marginTop: 10 }}>
            <div>
              <small>GitHub</small>
              <div className="rv">superwowers</div>
            </div>
            <a className="btn g" href={LINKS.github} target="_blank" rel="noreferrer">
              Open ↗
            </a>
          </div>
        </div>
        <form className="card" onSubmit={submit}>
          <input className="field" placeholder="Your name" value={form.name} onChange={update('name')} required />
          <input
            className="field"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={update('email')}
            required
          />
          <textarea
            className="field"
            style={{ height: 110, resize: 'vertical' }}
            placeholder="Message"
            value={form.message}
            onChange={update('message')}
            required
          />
          <button type="submit" className="btn">
            Send message ↗
          </button>
        </form>
      </div>
    </section>
  );
}
