import React, { useEffect, useRef, useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Roles from './components/Roles';
import GithubCalendar from './components/GithubCalendar';
import Education from './components/Education';
import About from './components/About';
import Contact from './components/Contact';
import { sections } from './data/portfolioData';

const readTheme = () => {
  try {
    return localStorage.getItem('pf-theme') === 'dark';
  } catch {
    return false;
  }
};

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const [active, setActive] = useState(sections[0].id);
  const contentRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('pf-theme', dark ? 'dark' : 'light');
    } catch {
      /* storage unavailable: theme simply isn't remembered */
    }
    document.body.style.background = dark ? '#0a0a0c' : '#dfe3e9';
  }, [dark]);

  // Scroll spy: works for the inner panel (desktop) and the window (mobile).
  const spy = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    const base = mobile ? 90 : content.getBoundingClientRect().top;
    let current = sections[0].id;
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top - base <= 120) current = id;
    });
    const atEnd = mobile
      ? window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      : content.scrollTop + content.clientHeight >= content.scrollHeight - 4;
    setActive(atEnd ? sections[sections.length - 1].id : current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    spy();
    return () => {
      window.removeEventListener('scroll', spy);
      window.removeEventListener('resize', spy);
    };
  }, [spy]);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={`pf${dark ? ' dark' : ''}`}>
      <div className="shell">
        <Sidebar active={active} dark={dark} onNavigate={go} onToggleTheme={() => setDark((d) => !d)} />
        <main className="content" ref={contentRef} onScroll={spy}>
          <Hero onNavigate={go} />
          <Projects />
          <Roles />
          <TechStack />
          <GithubCalendar />
          <Education />
          <About />
          <Contact />
          <footer>© Lauren Mae Espinar</footer>
        </main>
      </div>
    </div>
  );
}
