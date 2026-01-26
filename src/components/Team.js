import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './common/Magnetic';

/**
 * The Team section introduces the architects behind the studio.
 * Background is now transparent to show the "Interior" house drawing.
 */
const teamMembers = [
  {
    name: 'Marco Rossi',
    role: 'Architetto Capo',
    img: '/images/team1.png',
    bio: 'Specializzato in progettazione sostenibile e innovazione.',
  },
  {
    name: 'Luca Bianchi',
    role: 'Interior Designer',
    img: '/images/team2.png',
    bio: 'Crea spazi interni che uniscono estetica e funzionalità.',
  },
  {
    name: 'Giulia Verdi',
    role: 'Project Manager',
    img: '/images/team3.png',
    bio: 'Coordina i progetti con precisione e cura per i dettagli.',
  },
];

export default function Team() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
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
      <div className="eraser-mask mb-8 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-title uppercase mb-4 text-quaternary eraser-text-shadow">
          Il nostro team
        </h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest px-4 py-1">
          Scopri le nostre storie
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 max-w-6xl">
        {teamMembers.map((member, i) => (
          <Magnetic key={member.name}>
            <Link href="/about" className="block w-full">
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col items-center text-center border border-white/40 hover:scale-105 transition-transform duration-500 group"
              >
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-tertiary shadow-inner">
                  <img
                    src={member.img}
                    alt={`Foto di ${member.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-title text-quaternary mb-1">{member.name}</h3>
                <p className="italic text-sm text-tertiary mb-2">{member.role}</p>
                {/* Bio removed from here, moved to About page for "gateway" feel */}
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-quaternary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Leggi Bio &rarr;
                </span>
              </div>
            </Link>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}