import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The Hero section represents the foundations of the architectural journey.
 * It starts with a clean slate (white background) and gradually reveals
 * blueprint lines as the user scrolls. Finally, the studio name and a
 * short slogan fade in, stamped onto the project like a signature.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=70%',
          scrub: true,
          pin: false,
        },
      });
      // Animate each blueprint line drawing from right to left
      tl.fromTo(
        linesRef.current,
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, stagger: 0.3, ease: 'none' }
      ).fromTo(
        '.hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        '-=1'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-primary"
    >
      {/* Blueprint lines drawn progressively */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {[
          // horizontal lines
          { x1: 50, y1: 100, x2: '90%', y2: 100 },
          { x1: 50, y1: 200, x2: '85%', y2: 200 },
          { x1: 50, y1: 300, x2: '88%', y2: 300 },
          // vertical lines
          { x1: 60, y1: 50, x2: 60, y2: '85%' },
          { x1: 200, y1: 50, x2: 200, y2: '80%' },
          { x1: 350, y1: 50, x2: 350, y2: '75%' },
        ].map((line, i) => (
          <line
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#D0CBC4"
            strokeWidth="1"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            className="blueprint-line"
          />
        ))}
      </svg>
      <div className="hero-content z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-title mb-4 tracking-wide uppercase text-quaternary">
          ARCH STUDIO
        </h1>
        <p className="text-lg md:text-xl font-body text-text">
          Progettiamo il futuro con passione e precisione
        </p>
      </div>
    </section>
  );
}
