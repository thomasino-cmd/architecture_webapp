import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HouseVisualizer() {
  const containerRef = useRef(null);
  
  // USIAMO SOLO 2 IMMAGINI COME RICHIESTO
  const imgStart = '/images/house-complete.png';    // Inizio (Casa Finita)
  const imgEnd = '/images/house-foundation.png';    // Fine (Cantiere/Fondamenta)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Impostiamo lo stato iniziale
      gsap.set("#house-start", { opacity: 1, zIndex: 1 });
      gsap.set("#house-end", { opacity: 0, zIndex: 2 }); // È sopra, ma invisibile

      // CREIAMO UNA TIMELINE UNICA BASATA SULLO SCROLL TOTALE DELLA PAGINA
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",         // Usa tutta l'altezza della pagina come riferimento
          start: "top top",        // Inizia a contare da inizio pagina
          end: "bottom bottom",    // Finisce a fine pagina
          scrub: 1,                // Scrub morbido (1 secondo di ritardo per fluidità)
        }
      });

      // LOGICA "A METÀ PAGINA":
      // Non facciamo nulla per il primo 30% dello scroll (resta la casa finita).
      // Tra il 30% e l'80% dello scroll, facciamo il cambio graduale.
      
      tl.to("#house-end", { 
        opacity: 1, 
        ease: "none",
        duration: 1 
      }, 0.3); // <--- 0.3 significa "inizia al 30% della pagina"

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-white">
      {/* IMMAGINE 1: CASA FINITA (Fissa sotto) */}
      <img
        id="house-start"
        src={imgStart}
        alt="Casa Finita"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* IMMAGINE 2: FONDAMENTA (Appare sopra) */}
      <img
        id="house-end"
        src={imgEnd}
        alt="Cantiere"
        className="absolute inset-0 w-full h-full object-cover object-center will-change-opacity"
      />
      
      {/* Overlay bianco per migliorare lettura su mobile */}
      <div className="absolute inset-0 bg-white/40 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}