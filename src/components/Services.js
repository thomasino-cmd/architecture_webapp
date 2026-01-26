import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './common/Magnetic';

/**
 * The Services section represents the structural phase.
 * Background is transparent to reveal the construction site structure.
 */
const services = [
  {
    title: 'Progettazione',
    description: 'Dal concept iniziale al progetto esecutivo, trasformiamo le idee in realtà.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-quaternary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.75l8.25 16.5m6.75-16.5L7.5 20.25" />
      </svg>
    ),
  },
  {
    title: 'Interior Design',
    description: 'Progettiamo interni armoniosi e funzionali, cuciti su misura per ogni cliente.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-quaternary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M4.5 4.5v11.25a3 3 0 003 3H16.5a3 3 0 003-3V4.5M9 8.25h.008v.008H9v-.008zm3 0h.008v.008H12v-.008zM9 11.25h.008v.008H9v-.008zm3 0h.008v.008H12v-.008zM9 14.25h.008v.008H9v-.008zm3 0h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Ristrutturazioni',
    description: 'Rinnoviamo e rigeneriamo spazi esistenti, preservando storia e carattere.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-quaternary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.155-.439 1.594 0L21.75 12M4.5 9.75V19.5a.75.75 0 00.75.75H9a.75.75 0 00.75-.75V15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5a.75.75 0 00.75.75h3.75a.75.75 0 00.75-.75V9.75M8.25 20.25h7.5" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        const fromX = index % 2 === 0 ? -200 : 200;
        gsap.fromTo(
          card,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center bg-transparent py-20" // Modificato: bg-transparent
    >
      <h2 className="text-4xl md:text-5xl font-title uppercase mb-12 text-primary drop-shadow-md border-text-stroke">
        I nostri servizi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 max-w-6xl">
        {services.map((service, i) => (
          <Magnetic key={service.title}>
            <div
              ref={(el) => (cardRefs.current[i] = el)}
              // Modificato: bg-white/90 e backdrop-blur-sm
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col items-start text-left border border-secondary/20"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-title text-quaternary mb-2">{service.title}</h3>
              <p className="text-sm text-text">
                {service.description}
              </p>
            </div>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}