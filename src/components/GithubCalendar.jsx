import React, { useEffect, useState } from 'react';
import { LINKS, GITHUB_USER } from '../data/portfolioData';

const SIZE = 11;
const GAP = 3;
const STEP = SIZE + GAP;
const LEFT = 30;
const TOP = 18;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GithubCalendar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((json) => !cancelled && setData(json))
      .catch(() => {
        /* offline or API down: the section stays hidden */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data || !data.contributions?.length) return null;

  const days = data.contributions;
  const offset = new Date(days[0].date + 'T00:00:00').getDay();
  const cols = Math.ceil((days.length + offset) / 7);

  // label the first column of each month
  const labels = [];
  let lastMonth = -1;
  days.forEach((d, i) => {
    const m = Number(d.date.slice(5, 7)) - 1;
    const c = Math.floor((i + offset) / 7);
    if (m !== lastMonth && (labels.length === 0 || c - labels[labels.length - 1].c >= 3)) {
      labels.push({ c, text: MONTHS[m] });
    }
    lastMonth = m;
  });

  return (
    <section id="github">
      <div className="eyebrow">
        <span>github</span>
        <a href={LINKS.github} target="_blank" rel="noreferrer">
          @{GITHUB_USER} ↗
        </a>
      </div>
      <div className="gcal">
        <svg
          viewBox={`0 0 ${LEFT + cols * STEP} ${TOP + 7 * STEP}`}
          role="img"
          aria-label="GitHub contributions in the last year"
        >
          {labels.map(({ c, text }) => (
            <text key={c} x={LEFT + c * STEP} y={10} className="gl">
              {text}
            </text>
          ))}
          {[['Mon', 1], ['Wed', 3], ['Fri', 5]].map(([t, row]) => (
            <text key={t} x={0} y={TOP + row * STEP + SIZE - 1} className="gl">
              {t}
            </text>
          ))}
          {days.map((d, i) => {
            const slot = i + offset;
            return (
              <rect
                key={d.date}
                className={`lv lv${d.level}`}
                x={LEFT + Math.floor(slot / 7) * STEP}
                y={TOP + (slot % 7) * STEP}
                width={SIZE}
                height={SIZE}
                rx="2.5"
              >
                <title>{`${d.count} contributions on ${d.date}`}</title>
              </rect>
            );
          })}
        </svg>
      </div>
      <div className="gfoot">
        <span>{data.total?.lastYear?.toLocaleString()} contributions in the last year</span>
        <span className="glegend">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <i key={l} className={`lv lv${l}`}></i>
          ))}
          More
        </span>
      </div>
    </section>
  );
}
