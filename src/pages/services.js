import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const servicesDetail = [
    {
        id: 'urbanistica',
        title: 'Urbanistica',
        subtitle: 'Pianificazione & Territorio',
        description: 'Pianificazione strategica e sviluppo territoriale sostenibile. Analisi normative e progettazione urbana integrata.',
        tasks: ['Piani Attuativi', 'Studi di Fattibilità', 'Permessi di Costruire', 'Convenzioni Urbanistiche', 'Analisi Vincolistica', 'Rigenerazione Urbana'],
        image: '/images/services/urbanistica.png'
    },
    {
        id: 'edilizia',
        title: 'Edilizia',
        subtitle: 'Costruzioni & Tecnica',
        description: 'Progettazione tecnica e direzione lavori per nuove costruzioni e riqualificazioni. Sicurezza e qualità costruttiva.',
        tasks: ['Progettazione Esecutiva', 'Direzione Lavori', 'Computi Metrici', 'Sicurezza Cantiere', 'Capitolati', 'Collaudi'],
        image: '/images/services/edilizia.png'
    },
    {
        id: 'element_interior', // changed id to avoid name collision conflicts if any, but 'interior' is fine. sticking to easy ids.
        title: 'Interior Design',
        subtitle: 'Spazi & Atmosfere',
        description: 'Design degli interni su misura. Creiamo ambienti unici che riflettono la personalità di chi li vive.',
        tasks: ['Space Planning', 'Materiali & Finiture', 'Lighting Design', 'Arredi Custom', 'Styling', 'Color Consultancy'],
        image: '/images/services/interior-design.png'
    },
    {
        id: 'catasto',
        title: 'Catasto',
        subtitle: 'Pratiche & Rilievi',
        description: 'Gestione completa delle pratiche catastali e rilievi topografici di precisione. Regolarizzazioni e aggiornamenti.',
        tasks: ['Accatastamenti', 'Variazioni', 'Visure & Planimetrie', 'Rilievi Topografici', 'Volture', 'Rettifiche'],
        image: '/images/services/catasto.png'
    },
    {
        id: 'rendering',
        title: 'Rendering',
        subtitle: 'Visualizzazione 3D',
        description: 'Visualizzazioni fotorealistiche per anticipare il futuro. Modellazione 3D avanzata e tour virtuali.',
        tasks: ['Rendering Esterni', 'Rendering Interni', 'Virtual Tour 360°', 'Fotoinserimenti', 'Animazioni 3D', 'Realtà Aumentata'],
        image: '/images/services/rendering.png'
    },
    {
        id: 'valutazioni',
        title: 'Valutazioni',
        subtitle: 'Perizie & Stime',
        description: 'Valutazioni immobiliari professionali e perizie tecniche. Analisi di mercato e due diligence.',
        tasks: ['Stime Immobiliari', 'Perizie Giurate', 'Due Diligence', 'Analisi Mercato', 'Studi di Redditività', 'Consulenze Tecniche'],
        image: '/images/services/valutazioni.png'
    }
];

export default function ServicesPage() {
    const router = useRouter();
    const [activeId, setActiveId] = useState('urbanistica');

    useEffect(() => {
        if (router.isReady && router.query.id) {
            const requestedId = router.query.id;
            // Check if the id exists in our list to avoid setting invalid states
            if (servicesDetail.some(s => s.id === requestedId || (requestedId === 'interior' && s.title === 'Interior Design'))) {
                // Handle simple mapping if needed, but direct mapping is best.
                // If I passed 'interior' for Interior Design, I should map it.
                if (requestedId === 'interior') setActiveId('element_interior');
                else setActiveId(requestedId);
            }
        }
    }, [router.isReady, router.query.id]);

    return (
        <>
            <Head>
                <title>Servizi | Arch Studio</title>
            </Head>

            <div className="min-h-screen bg-[#E5DCC5] relative overflow-hidden flex flex-col">
                {/* Header Navigation */}
                <div className="absolute top-8 left-8 z-50">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest text-quaternary hover:bg-quaternary hover:text-white transition-all shadow-md border border-quaternary/20">
                        ← Home
                    </Link>
                </div>

                {/* ACCORDION CONTAINER */}
                <div className="flex-1 flex flex-col md:flex-row h-screen">
                    {servicesDetail.map((service) => {
                        const isActive = activeId === service.id;
                        return (
                            <div
                                key={service.id}
                                onClick={() => setActiveId(service.id)}
                                className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/20
                                    ${isActive ? 'flex-[5] bg-white text-text' : 'flex-[1] bg-quaternary/90 hover:bg-quaternary text-white'}
                                `}
                            >
                                {/* BACKGROUND IMAGE (Visible on active or subtle on inactive) */}
                                <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-10' : 'opacity-0'}`}>
                                    <img src={service.image} className="w-full h-full object-cover grayscale" alt={service.title} />
                                </div>

                                {/* CONTENT WRAPPER */}
                                <div className="absolute inset-0 flex flex-col p-8 md:p-16 h-full justify-between">

                                    {/* CLOSED STATE LABEL (Rotated on desktop) */}
                                    <div className={`absolute left-0 top-0 p-8 origin-bottom-left transition-all duration-500
                                        ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                                    `}>
                                        <h2 className="text-4xl md:text-6xl font-title uppercase transform md:rotate-90 md:origin-left whitespace-nowrap md:translate-x-[40px] md:-translate-y-[40px]">
                                            {service.title}
                                        </h2>
                                        <div className="mt-4 md:rotate-90 md:origin-left md:translate-x-[40px] md:mt-0 text-sm tracking-widest uppercase opacity-80">
                                            0{servicesDetail.indexOf(service) + 1}
                                        </div>
                                    </div>

                                    {/* OPEN STATE CONTENT */}
                                    <div className={`flex flex-col h-full max-w-3xl transition-all duration-700 delay-200
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}
                                    `}>
                                        {/* Header */}
                                        <div className="mb-auto">
                                            <span className="text-quaternary uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
                                                0{servicesDetail.indexOf(service) + 1} — {service.subtitle}
                                            </span>
                                            <h2 className="text-6xl md:text-9xl font-title text-quaternary leading-none mb-8">
                                                {service.title}
                                            </h2>
                                            <p className="text-xl md:text-2xl text-gray-600 font-body max-w-2xl leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Tasks List / Workflow */}
                                        <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-quaternary mb-6 border-b border-gray-200 pb-2">
                                                Workflow & Activities
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {service.tasks.map(task => (
                                                    <div key={task} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700">
                                                        <div className="w-1.5 h-1.5 bg-quaternary rounded-full" />
                                                        <span className="font-medium text-sm">{task}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
