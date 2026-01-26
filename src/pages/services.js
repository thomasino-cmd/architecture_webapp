import Head from 'next/head';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

const servicesDetail = [
    {
        title: 'Progettazione Architettonica',
        description: 'Il cuore del nostro lavoro. Sviluppiamo progetti completi, dallo studio di fattibilità alla direzione lavori. Utilizziamo tecnologie BIM avanzate per garantire precisione e controllo dei costi.',
        features: ['Studi di fattibilità', 'Progettazione preliminare, definitiva ed esecutiva', 'Direzione Lavori e Sicurezza', 'Rendering 3D Fotorealistici'],
        icon: '🏗️'
    },
    {
        title: 'Interior Design',
        description: 'Gli interni sono l’anima di un edificio. Curiamo ogni dettaglio, dalla scelta dei materiali all’illuminazione, creando ambienti che riflettono la personalità di chi li abita.',
        features: ['Space Planning', 'Design su misura (Arredi custom)', 'Progettazione illuminotecnica', 'Consulenza materiali e finiture'],
        icon: '🛋️'
    },
    {
        title: 'Ristrutturazioni e Restauro',
        description: 'Diamo nuova vita agli edifici esistenti. Che si tratti di un appartamento storico o di un loft industriale, rispettiamo il passato portandolo nel presente.',
        features: ['Riqualificazione energetica', 'Restauro conservativo', 'Pratiche edilizie e catastali', 'Gestione cantiere "Chiavi in mano"'],
        icon: '🔨'
    }
];

export default function ServicesPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(".service-card",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
    }, []);

    return (
        <>
            <Head>
                <title>Servizi | Arch Studio</title>
            </Head>

            <section ref={containerRef} className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-title text-quaternary mb-16 text-center">
                    Cosa Facciamo
                </h1>

                <div className="grid gap-16">
                    {servicesDetail.map((s, i) => (
                        <div key={s.title} className="service-card flex flex-col md:flex-row gap-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-6xl">{s.icon}</div>
                            <div>
                                <h2 className="text-3xl font-title text-quaternary mb-4">{s.title}</h2>
                                <p className="text-lg text-gray-700 mb-6 font-body leading-relaxed">{s.description}</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {s.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                            <span className="w-1.5 h-1.5 bg-quaternary rounded-full" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
