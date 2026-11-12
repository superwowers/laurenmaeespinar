import React, { useEffect, useRef, useState } from 'react';

const COLS = 10;
const ROWS = 20;
const CELL = 28;

const PIECES = {
  I: { size: 4, color: '#378ADD', cells: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  O: { size: 2, color: '#EF9F27', cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  T: { size: 3, color: '#7F77DD', cells: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  S: { size: 3, color: '#1D9E75', cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  Z: { size: 3, color: '#E24B4A', cells: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  J: { size: 3, color: '#D4537E', cells: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  L: { size: 3, color: '#D85A30', cells: [[2, 0], [0, 1], [1, 1], [2, 1]] },
};

function TetrisGame({ onClose }) {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState(0);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const emptyBoard = () => Array.from({ length: ROWS }, () => new Array(COLS).fill(null));

    const fits = (cells, ox, oy) => {
      const { board } = stateRef.current;
      for (const [cx, cy] of cells) {
        const x = ox + cx;
        const y = oy + cy;
        if (x < 0 || x >= COLS || y >= ROWS) return false;
        if (y >= 0 && board[y][x]) return false;
      }
      return true;
    };

    const spawnPiece = () => {
      const keys = Object.keys(PIECES);
      const type = keys[Math.floor(Math.random() * keys.length)];
      const p = PIECES[type];
      const current = {
        cells: p.cells.map((c) => c.slice()),
        size: p.size,
        color: p.color,
        x: Math.floor((COLS - p.size) / 2),
        y: 0,
      };
      stateRef.current.current = current;
      if (!fits(current.cells, current.x, current.y)) stateRef.current.alive = false;
    };

    const clearLines = () => {
      const s = stateRef.current;
      for (let y = ROWS - 1; y >= 0; y--) {
        if (s.board[y].every(Boolean)) {
          s.board.splice(y, 1);
          s.board.unshift(new Array(COLS).fill(null));
          s.lines += 1;
          setLines(s.lines);
          y++;
        }
      }
    };

    const lockPiece = () => {
      const s = stateRef.current;
      s.current.cells.forEach(([cx, cy]) => {
        const x = s.current.x + cx;
        const y = s.current.y + cy;
        if (y >= 0) s.board[y][x] = s.current.color;
      });
      clearLines();
      spawnPiece();
    };

    const move = (dx, dy) => {
      const s = stateRef.current;
      if (!s.alive) return;
      const nx = s.current.x + dx;
      const ny = s.current.y + dy;
      if (fits(s.current.cells, nx, ny)) {
        s.current.x = nx;
        s.current.y = ny;
      } else if (dy > 0) {
        lockPiece();
      }
      draw();
    };

    const rotate = () => {
      const s = stateRef.current;
      if (!s.alive) return;
      const size = s.current.size;
      const rotated = s.current.cells.map(([x, y]) => [size - 1 - y, x]);
      if (fits(rotated, s.current.x, s.current.y)) s.current.cells = rotated;
      draw();
    };

    const hardDrop = () => {
      const s = stateRef.current;
      if (!s.alive) return;
      while (fits(s.current.cells, s.current.x, s.current.y + 1)) s.current.y += 1;
      lockPiece();
      draw();
    };

    const tick = () => {
      const s = stateRef.current;
      if (!s.alive) return;
      if (fits(s.current.cells, s.current.x, s.current.y + 1)) s.current.y += 1;
      else lockPiece();
      draw();
    };

    const cssVar = (name, fallback) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name);
      return v && v.trim() ? v.trim() : fallback;
    };

    const draw = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (s.board[y][x]) {
            ctx.fillStyle = s.board[y][x];
            ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
          }
        }
      }
      if (s.alive) {
        ctx.fillStyle = s.current.color;
        s.current.cells.forEach(([cx, cy]) => {
          ctx.fillRect((s.current.x + cx) * CELL, (s.current.y + cy) * CELL, CELL - 1, CELL - 1);
        });
      } else {
        ctx.fillStyle = cssVar('--ink', '#14161a');
        ctx.font = "12px 'JetBrains Mono', monospace";
        ctx.textAlign = 'center';
        ctx.fillText('game over — restart', canvas.width / 2, canvas.height / 2);
      }
    };

    const reset = () => {
      stateRef.current = { board: emptyBoard(), lines: 0, alive: true, current: null };
      setLines(0);
      spawnPiece();
      draw();
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') { move(-1, 0); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { move(1, 0); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { move(0, 1); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { rotate(); e.preventDefault(); }
      else if (e.key === ' ') { hardDrop(); e.preventDefault(); }
    };

    reset();
    window.addEventListener('keydown', onKeyDown);
    const loopId = setInterval(tick, 500);

    canvas.__reset = reset;

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearInterval(loopId);
    };
  }, []);

  return (
    <div className="tetris-modal" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="tetris-close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} />
      <div className="trow">
        <span>lines: {lines}</span>
        <button type="button" onClick={() => canvasRef.current.__reset()}>
          restart
        </button>
      </div>
      <p className="tetris-hint">← → move · ↑ rotate · ↓ drop · space hard drop · esc to leave</p>
    </div>
  );
}

export default function TetrisEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (open && e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="tetris-overlay" onClick={() => setOpen(false)}>
      <TetrisGame onClose={() => setOpen(false)} />
    </div>
  );
}
