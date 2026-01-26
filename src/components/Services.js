import { useRef } from 'react';
import Link from 'next/link';
import Magnetic from './common/Magnetic';

const serviceItems = [
  {
    title: 'Architecture',
    subtitle: 'Progettazione',
    description: 'Dallo schizzo preliminare al cantiere. Visione olistica e precisione tecnica.',
    image: '/images/house-complete.png', // Placeholder
    colSpan: 'md:col-span-8',
    rowSpan: 'md:row-span-2',
    align: 'items-start',
  },
  {
    title: 'Interior',
    subtitle: 'Design',
    description: 'Spazi che emozionano. Materiali, luce e arredo su misura.',
    image: '/images/house-structure.png', // Placeholder
    colSpan: 'md:col-span-4',
    rowSpan: 'md:row-span-2',
    align: 'items-center',
  },
  {
    title: 'Restauro',
    subtitle: 'Ristrutturazioni',
    description: 'Nuova vita al passato. Recupero conservativo e riqualificazione.',
    image: '/images/house-foundation.png', // Placeholder
    colSpan: 'md:col-span-12',
    rowSpan: 'md:row-span-1',
    align: 'items-end',
  },
];

export default function Services() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="min-h-screen py-20 px-6 flex flex-col justify-center max-w-7xl mx-auto">
      <div className="mb-16 flex justify-center">
        <div className="eraser-mask">
          <h2 className="text-6xl md:text-9xl font-title text-text eraser-text-shadow">
            SERVICES
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
        {serviceItems.map((item, index) => (
          <div
            key={item.title}
            className={`relative group rounded-3xl overflow-hidden border border-white/20 ${item.colSpan} ${item.rowSpan}`}
          >
            <Magnetic className="w-full h-full">
              <Link href="/services" className="block w-full h-full relative p-8 md:p-12 flex flex-col justify-between z-20">
                {/* CONTENT - Hidden initially, Slides up on hover */}
                <div className={`w-full h-full flex flex-col ${item.align} relative z-20`}>

                  {/* TITLE - ALWAYS VISIBLE but moves */}
                  <div className="transition-all duration-500 group-hover:-translate-y-4">
                    <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase mb-2 block drop-shadow-md">{item.subtitle}</span>
                    <h3 className="text-5xl md:text-7xl font-title text-white uppercase leading-none drop-shadow-2xl transition-all duration-500">
                      {item.title}
                    </h3>
                  </div>

                  {/* DETAILS - X-RAY REVEAL (Slide Up) */}
                  <div className="mt-auto transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 max-w-md">
                    <p className="text-white/90 font-body text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold">
                      <span className="w-8 h-[1px] bg-white text-quaternary"></span>
                      Scopri Dettagli
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