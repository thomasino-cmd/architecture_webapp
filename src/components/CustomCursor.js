import { useEffect, useRef } from 'react';

/**
 * CustomCursor renders a small cross‑hair that follows the mouse.
 * It hides the native cursor and provides subtle scaling when hovering
 * over interactive elements (links, buttons). The design is intentionally
 * minimalistic to evoke drafting tools used by architects.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move cursor with the mouse
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    // Grow cursor when hovering interactive elements
    const enlarge = () => cursor.classList.add('scale-150');
    const shrink = () => cursor.classList.remove('scale-150');

    document.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', enlarge);
      el.addEventListener('mouseleave', shrink);
    });
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button, input, textarea').forEach((el) => {
        el.removeEventListener('mouseenter', enlarge);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 w-4 h-4 flex items-center justify-center transition-transform duration-150 ease-out"
      style={{ mixBlendMode: 'difference' }}
    >
      {/* The cross hair is built with two lines */}
      <div className="absolute w-px h-4 bg-quaternary"></div>
      <div className="absolute h-px w-4 bg-quaternary"></div>
    </div>
  );
}