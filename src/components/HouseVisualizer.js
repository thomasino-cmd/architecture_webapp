import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HouseVisualizer() {
  const containerRef = useRef(null);
  
  // Lista ordinata delle 4 fasi
  const stages = [
    { id: 'img-hero', src: '/images/house-complete.png', alt: 'Casa Finita' },     // 0: Default visibile
    { id: 'img-team', src: '/images/house-interior.png', alt: 'Interni' },         // 1: Appare su Team
    { id: 'img-services', src: '/images/house-structure.png', alt: 'Struttura' },  // 2: Appare su Services
    { id: 'img-contact', src: '/images/house-foundation.png', alt: 'Fondamenta' }  // 3: Appare su Contact
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // Impostiamo lo stato iniziale: 
      // La prima immagine è visibile (opacity 1), tutte le altre nascoste (opacity 0)
      gsap.set("#img-hero", { opacity: 1, zIndex: 1 });
      gsap.set("#img-team", { opacity: 0, zIndex: 2 });
      gsap.set("#img-services", { opacity: 0, zIndex: 3 });
      gsap.set("#img-contact", { opacity: 0, zIndex: 4 });

      // ---------------------------------------------------------
      // TRANSIZIONE 1: Da "Finita" a "Interni" (Quando arriva TEAM)
      // ---------------------------------------------------------
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#team",        // L'elemento che fa scattare l'animazione
          start: "top bottom",     // Inizia quando il TOP di Team tocca il BOTTOM dello schermo
          end: "center center",    // Finisce quando Team è al centro
          scrub: true,             // L'animazione segue il dito (scroll)
        }
      });
      
      tl1.to("#img-hero", { opacity: 0, duration: 1 }, 0)      // La vecchia sparisce
         .to("#img-team", { opacity: 1, duration: 1 }, 0);     // La nuova appare (lo "0" alla fine le sincronizza)


      // ---------------------------------------------------------
      // TRANSIZIONE 2: Da "Interni" a "Struttura" (Quando arriva SERVICES)
      // ---------------------------------------------------------
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#services",
          start: "top bottom",
          end: "center center",
          scrub: true,
        }
      });

      tl2.to("#img-team", { opacity: 0, duration: 1 }, 0)
         .to("#img-services", { opacity: 1, duration: 1 }, 0);


      // ---------------------------------------------------------
      // TRANSIZIONE 3: Da "Struttura" a "Fondamenta" (Quando arriva CONTACT)
      // ---------------------------------------------------------
      // Qui anticipiamo il trigger ("start: top 80%") per essere sicuri che 
      // l'ultima immagine si veda anche se la pagina è corta.
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 85%",        // Appena entra il form contatti (un po' prima del fondo)
          end: "bottom bottom",    // Fino alla fine della pagina
          scrub: true,
        }
      });

      tl3.to("#img-services", { opacity: 0, duration: 1 }, 0)
         .to("#img-contact", { opacity: 1, duration: 1 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-white">
      {/* NOTA: Ho aggiunto 'bg-white' al contenitore sopra per evitare che 
         eventuali elementi dietro diano fastidio, ma le immagini si scambiano tra loro.
      */}

      {stages.map((stage) => (
        <img
          key={stage.id}
          id={stage.id}
          src={stage.src}
          alt={stage.alt}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform will-change-opacity"
        />
      ))}
      
      {/* Overlay bianco leggerissimo per pulire il contrasto col testo se serve */}
      <div className="absolute inset-0 bg-white/60 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}