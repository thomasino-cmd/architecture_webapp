import { useRef } from 'react';
import Link from 'next/link';
import Magnetic from './common/Magnetic';

const serviceItems = [
  {
    title: 'Urbanistica',
    subtitle: 'Pianificazione',
    description: 'Pianificazione strategica e sviluppo territoriale sostenibile.',
    image: '/images/services/urbanistica.png',
    link: '/services?id=urbanistica'
  },
  {
    title: 'Edilizia',
    subtitle: 'Costruzione',
    description: 'Progettazione tecnica e direzione lavori per nuove costruzioni.',
    image: '/images/services/edilizia.png',
    link: '/services?id=edilizia'
  },
  {
    title: 'Interior',
    subtitle: 'Design',
    description: 'Spazi che emozionano. Materiali, luce e arredo su misura.',
    image: '/images/services/interior-design.png',
    link: '/services?id=interior'
  },
  {
    title: 'Catasto',
    subtitle: 'Pratiche',
    description: 'Gestione completa delle pratiche catastali e rilievi.',
    image: '/images/services/catasto.png',
    link: '/services?id=catasto'
  },
  {
    title: 'Rendering',
    subtitle: 'Visualizzazione',
    description: 'Visualizzazioni fotorealistiche per anticipare il futuro.',
    image: '/images/services/rendering.png',
    link: '/services?id=rendering'
  },
  {
    title: 'Valutazioni',
    subtitle: 'Stime',
    description: 'Valutazioni immobiliari professionali e perizie tecniche.',
    image: '/images/services/valutazioni.png',
    link: '/services?id=valutazioni'
  },
];

export default function Services() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="min-h-screen py-20 px-6 flex flex-col justify-center max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-6xl md:text-9xl font-title text-white opacity-90 drop-shadow-2xl">
          SERVICES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        {serviceItems.map((item, index) => (
          <div
            key={item.title}
            className="relative group rounded-3xl overflow-hidden border border-white/20"
          >
            <Magnetic className="w-full h-full relative z-30">
              <Link href={item.link} className="block w-full h-full relative p-8 md:p-10 flex flex-col justify-between z-20">
                {/* CONTENT - Hidden initially, Slides up on hover */}
                <div className="w-full h-full flex flex-col items-center relative z-20 text-center">

                  {/* TITLE - ALWAYS VISIBLE but moves */}
                  <div className="transition-all duration-500 group-hover:-translate-y-4 mt-auto mb-auto">
                    <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase mb-2 block drop-shadow-md">{item.subtitle}</span>
                    <h3 className="text-4xl md:text-5xl font-title text-white uppercase leading-none drop-shadow-2xl transition-all duration-500">
                      {item.title}
                    </h3>
                  </div>

                  {/* DETAILS - X-RAY REVEAL (Slide Up) */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gray-900/40 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl pointer-events-none">
                    <div className="flex items-center justify-center gap-3 text-white uppercase tracking-widest text-[10px] font-bold whitespace-nowrap">
                      <span className="w-4 h-[1px] bg-white text-quaternary"></span>
                      Scopri
                    </div>
                  </div>
                </div>
              </Link>
            </Magnetic>

            {/* BACKGROUND IMAGE - X-RAY EFFECT */}
            {/* State A: Grayscale + Blur */}
            {/* State B: Color + Sharp */}
            <div className="absolute inset-0 z-0 transition-all duration-700 ease-in-out group-hover:scale-105">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter grayscale-[20%] blur-[3px] brightness-90 group-hover:grayscale-0 group-hover:blur-0 group-hover:brightness-100 transition-all duration-700"
              />
            </div>

            {/* Overlay for inactive state readability */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] group-hover:backdrop-blur-none group-hover:bg-black/10 transition-all duration-500 z-10 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}