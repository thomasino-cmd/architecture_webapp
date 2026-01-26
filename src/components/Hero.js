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
      const tl = gsap.timeline();


      tl.fromTo(
        '.hero-title',
        { opacity: 0, scale: 0.9 },
        { opacity: 0.9, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      );

      // Parallax Effect
      gsap.to('.hero-title', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent px-4"
    >
      <div className="hero-content z-10 text-center w-full relative flex justify-center items-center">
        <div className="eraser-mask">
          <h1 className="hero-title text-6xl md:text-[10rem] font-title mb-0 tracking-tighter uppercase text-tertiary leading-none eraser-text-shadow">
            ARCH STUDIO
          </h1>
        </div>
      </div>
    </section>
  );
}