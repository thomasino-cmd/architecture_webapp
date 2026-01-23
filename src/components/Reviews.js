import { useEffect, useRef } from 'react';
import gsap from 'gsap';    
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Reviews section. Now transparent with frosted glass cards.
 */
const reviews = [
  {
    quote: 'Il team di Arch Studio ha trasformato la nostra casa in un capolavoro moderno. Professionalità e creatività senza paragoni.',
    author: 'Sara & Paolo',
  },
  {
    quote: 'Sono rimasto impressionato dalla cura per i dettagli e dalla capacità di rispettare i tempi e il budget.',
    author: 'Andrea F.',
  },
  {
    quote: 'Ogni progetto con Arch Studio è un viaggio: ascoltano, propongono soluzioni innovative e realizzano oltre le aspettative.',
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
    // Calcolo della larghezza totale per lo scroll orizzontale
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
      className="relative min-h-screen bg-transparent flex items-center overflow-hidden" // Sfondo trasparente
    >
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap h-full"
        style={{ width: `${reviews.length * 100}vw` }}
      >
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 flex items-center justify-center p-4 md:p-10"
          >
            {/* Card recensione stile vetro */}
            <div className="max-w-2xl bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 whitespace-normal text-center">
              <p className="text-xl md:text-2xl italic mb-6 text-text font-title">“{rev.quote}”</p>
              <p className="text-right font-bold text-quaternary text-lg">— {rev.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}