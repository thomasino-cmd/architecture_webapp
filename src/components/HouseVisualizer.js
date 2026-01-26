import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HouseVisualizer() {
  const containerRef = useRef(null);

  // ANIMAZIONE RICHIESTA: Structure -> Complete
  const imgStart = '/images/house-foundation.png'; // Inizio (Struttura/Disegno)
  const imgEnd = '/images/house-complete.png';    // Fine (Casa Completa)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Impostiamo lo stato iniziale
      gsap.set("#house-foundation", { opacity: 1, zIndex: 1 });
      gsap.set("#house-complete", { opacity: 0, zIndex: 2 }); // Appare sopra

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // La casa completa appare gradualmente man mano che si scrolla
      tl.to("#house-complete", {
        opacity: 1,
        ease: "none",
        duration: 1
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-transparent">
      {/* IMMAGINE 1: FONDAMENTA (Base fissa sotto - 100% opacity) */}
      <img
        id="house-foundation"
        src={imgEnd}
        alt="Casa Fondamenta"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* IMMAGINE 2: COMPLETA (Sopra - Fade Out) */}
      <img
        id="house-complete"
        src={imgStart}
        alt="Casa Completa"
        className="absolute inset-0 w-full h-full object-cover object-center will-change-opacity"
      />
    </div>
  );
}