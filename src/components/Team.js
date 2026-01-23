import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The Team section introduces the architects behind the studio. Cards rise
 * like columns from the blueprint, each revealing a portrait and a short
 * bio. Colors gradually warm up to signify the transition from the cold
 * blueprint to the structural frame.
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
      className="min-h-screen flex flex-col items-center bg-secondary py-20"
    >
      <h2 className="text-4xl md:text-5xl font-title uppercase mb-12 text-quaternary">
        Il nostro team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 max-w-6xl">
        {teamMembers.map((member, i) => (
          <div
            key={member.name}
            ref={(el) => (cardRefs.current[i] = el)}
            className="relative bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-tertiary">
              <img
                src={member.img}
                alt={`Foto di ${member.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-title text-quaternary mb-1">{member.name}</h3>
            <p className="italic text-sm text-tertiary mb-2">{member.role}</p>
            <p className="text-sm text-text max-w-xs">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
