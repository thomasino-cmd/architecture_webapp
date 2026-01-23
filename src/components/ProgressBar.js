import { useEffect, useRef } from 'react';

/**
 * ProgressBar renders a thin vertical bar fixed to the right of the screen
 * that fills up proportionally to the page scroll position. The visual
 * metaphor resembles a construction ruler marking the progress of the build.
 */
export default function ProgressBar() {
  const progressRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const viewportHeight = window.innerHeight;
      const totalScrollable = scrollHeight - viewportHeight;
      const progress = totalScrollable > 0 ? scrollTop / totalScrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.height = `${progress * 100}%`;
      }
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed right-2 top-0 h-full w-1 bg-secondary opacity-50 z-40">
      <div ref={progressRef} className="w-full bg-quaternary transition-all duration-75" style={{ height: '0%' }} />
    </div>
  );
}
