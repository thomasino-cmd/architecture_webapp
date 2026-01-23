import { useEffect, useRef } from 'react';
import gsap from 'gsap'; // Import corretto senza parentesi graffe!
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The Hero section represents the "Dream" (Finished House).
 * We removed the blueprint lines. Now it's transparent to show the HouseVisualizer background.
 */
export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Semplice animazione di entrata per il testo
      gsap.fromTo(
        '.hero-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent" // Sfondo trasparente
    >
      {/* Contenitore testo con effetto vetro satinato per leggibilità */}
      <div className="hero-content z-10 text-center p-8 md:p-12 bg-white/60 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 mx-4">
        <h1 className="text-5xl md:text-8xl font-title mb-6 tracking-wide uppercase text-quaternary drop-shadow-sm">
          ARCH STUDIO
        </h1>
        <p className="text-lg md:text-2xl font-body text-text font-medium max-w-2xl mx-auto">
          Dalla visione alla realtà. <br/> Progettiamo il futuro con passione e precisione.
        </p>
      </div>
    </section>
  );
}