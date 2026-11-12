import { useEffect, useRef } from 'react';

const CLICKABLE = 'button, a, summary, [role="button"], input[type="button"], input[type="submit"]';

export default function ClickSound({ enabled = true }) {
  const ctxRef = useRef(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    const getCtx = () => {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
      return ctxRef.current;
    };

    const playClick = () => {
      const ctx = getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const duration = 0.035;

      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) ** 3;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2800;
      filter.Q.value = 1.1;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    };

    const onClick = (e) => {
      if (enabledRef.current && e.target.closest(CLICKABLE)) playClick();
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
