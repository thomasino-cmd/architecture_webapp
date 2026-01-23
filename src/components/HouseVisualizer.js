import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HouseVisualizer() {
  const containerRef = useRef(null);
  // Definiamo le 4 fasi con le rispettive immagini
  const stages = [
    { id: 'hero', img: '/images/house-complete.png', alt: 'Casa Finita' },
    { id: 'team', img: '/images/house-interior.png', alt: 'Interni' },
    { id: 'services', img: '/images/house-structure.png', alt: 'Struttura' },
    { id: 'contact', img: '/images/house-foundation.png', alt: 'Fondamenta' },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Per ogni immagine (tranne la prima che è fissa di base), creiamo l'animazione
    // Le immagini sono sovrapposte (absolute). Facciamo fade-in di quella successiva sopra la precedente.
    
    // NOTA: Usiamo gli ID delle sezioni HTML (hero, team, services, contact) come trigger
    
    const ctx = gsap.context(() => {
      // 1. Da Casa Finita a Interni (Quando scorri su Team)
      gsap.to(".house-img-1", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#team", // Quando arriva la sezione Team
          start: "top bottom", // Appena entra dal basso
          end: "center center", // Fino al centro
          scrub: true,
        }
      });

      // 2. Da Interni a Struttura (Quando scorri su Services)
      gsap.to(".house-img-2", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#services",
          start: "top bottom",
          end: "center center",
          scrub: true,
        }
      });

      // 3. Da Struttura a Fondamenta (Quando scorri su Contact)
      gsap.to(".house-img-3", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "center center",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {/* Immagine Base (Casa Finita) - Sempre visibile sotto */}
      <img 
        src={stages[0].img} 
        alt={stages[0].alt} 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Le altre immagini sovrapposte con opacity 0 inizialmente */}
      {stages.slice(1).map((stage, i) => (
        <img
          key={stage.id}
          src={stage.img}
          alt={stage.alt}
          className={`house-img-${i+1} absolute inset-0 w-full h-full object-cover object-center opacity-0`}
        />
      ))}
      
      {/* Overlay bianco leggero per rendere il testo leggibile sopra i disegni */}
      <div className="absolute inset-0 bg-white/70"></div>
    </div>
  );
}