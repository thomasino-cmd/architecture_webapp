import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './common/Magnetic';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent px-4"
    >
      {/* Box adattato per mobile: più opaco e con margini sicuri */}
      <div className="hero-content z-10 text-center p-6 md:p-12 bg-white/80 md:bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 w-full max-w-3xl">
        <h1 className="text-4xl md:text-7xl font-title mb-4 md:mb-6 tracking-wide uppercase text-quaternary drop-shadow-sm leading-tight">
          ARCH STUDIO
        </h1>
        <div className="w-16 h-1 bg-quaternary mx-auto mb-6 rounded-full opacity-80"></div>
        <p className="text-base md:text-2xl font-body text-text font-medium leading-relaxed">
          Dalla visione alla realtà. <br className="hidden md:block" />
          Progettiamo il futuro con passione e precisione.
        </p>

        <Magnetic>
          <Link
            href="/portfolio"
            className="mt-8 inline-block bg-quaternary text-white px-8 py-3 rounded-none uppercase tracking-widest text-sm font-bold hover:bg-black transition-colors duration-300 border border-transparent hover:border-white/20 shadow-lg"
          >
            Vedi i Nostri Lavori
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}