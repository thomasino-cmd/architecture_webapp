import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The Reviews section acts as the finishing touches. As the page scrolls,
 * the section pins and horizontal scrolling occurs. Each slide contains
 * a testimonial or project highlight. Additional decorative elements (lamps,
 * textures) fade in to enhance the sense of refinement.
 */
const reviews = [
  {
    quote:
      'Il team di Arch Studio ha trasformato la nostra casa in un capolavoro moderno. Professionalità e creatività senza paragoni.',
    author: 'Sara & Paolo',
  },
  {
    quote:
      'Sono rimasto impressionato dalla cura per i dettagli e dalla capacità di rispettare i tempi e il budget.',
    author: 'Andrea F.',
  },
  {
    quote:
      'Ogni progetto con Arch Studio è un viaggio: ascoltano, propongono soluzioni innovative e realizzano oltre le aspettative.',
    author: 'Lorenza M.',
  },
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const slider = sliderRef.current;
    const slidesCount = reviews.length;
    const scrollLength = (slidesCount - 1) * window.innerWidth;
    const ctx = gsap.context(() => {
      gsap.to(slider, {
        x: () => -scrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-secondary flex items-center overflow-hidden"
    >
      {/* Decorative overlay for refinement (e.g., texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'url(/images/texture.png)', backgroundSize: 'cover' }} />
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap h-full"
        style={{ width: `${reviews.length * 100}vw` }}
      >
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 flex items-center justify-center p-10"
          >
            <div className="max-w-xl bg-primary p-8 rounded-lg shadow-xl">
              <p className="text-lg italic mb-4 text-text">“{rev.quote}”</p>
              <p className="text-right font-title text-quaternary">— {rev.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}