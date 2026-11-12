import { createPortal } from 'react-dom';

export default function MobileSoundToggle({ soundOn, onToggle }) {
  return createPortal(
    <button
      type="button"
      className="soundbtn-float"
      aria-label={soundOn ? 'Mute click sound' : 'Unmute click sound'}
      aria-pressed={soundOn}
      onClick={onToggle}
    >
      {soundOn ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9v6h4l5 5V4L8 9H4z" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 6a9 9 0 0 1 0 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9v6h4l5 5V4L8 9H4z" />
          <path d="M16 9l5 6M21 9l-5 6" />
        </svg>
      )}
    </button>,
    document.body,
  );
}
