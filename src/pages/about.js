import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export default function About() {
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }, []);

    return (
        <>
            <Head>
                <title>La Nostra Storia | Arch Studio</title>
            </Head>

            <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto text-[#111]">

                {/* Navigation */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm uppercase tracking-widest text-gray-600 hover:bg-quaternary hover:text-white transition-all shadow-sm">
                        ← Torna alla Home
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-16 mb-24">
                    {/* Story Text */}
                    <div ref={contentRef} className="md:w-1/2">
                        <h1 className="text-6xl md:text-8xl font-title text-quaternary mb-8 leading-none">
                            La Nostra <br /> Storia
                        </h1>
                        <div className="text-lg md:text-xl font-body leading-relaxed space-y-6 text-gray-800">
                            <p>
                                Fondato nel 2010, Arch Studio nasce dalla visione condivisa di creare spazi che non siano solo funzionali, ma che raccontino una storia.
                            </p>
                            <p>
                                Crediamo che l&apos;architettura sia un linguaggio emozionale. Ogni linea, ogni materiale, ogni luce è scelta per evocare una sensazione.
                            </p>
                        </div>
                    </div>

                    {/* Image/Visual */}
                    <div className="md:w-1/2 h-96 bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-title uppercase tracking-widest">
                            [Foto Studio Storica]
                        </div>
                    </div>
                </div>

                {/* TEAM GRID */}
                <div>
                    <h2 className="text-4xl font-title text-quaternary mb-12 border-b border-gray-300 pb-4 inline-block">Il Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { name: 'Marco Rossi', role: 'Architetto Capo', bio: 'Visionario e fondatore, Marco guida ogni progetto con una passione per il design sostenibile.' },
                            { name: 'Luca Bianchi', role: 'Interior Designer', bio: 'Maestro dei materiali e della luce, Luca trasforma gli spazi vuoti in ambienti accoglienti.' },
                            { name: 'Giulia Verdi', role: 'Project Manager', bio: 'Il punto di riferimento per i clienti. Giulia assicura che ogni scadenza sia rispettata con precisione.' }
                        ].map(member => (
                            <div key={member.name} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 mx-auto md:mx-0"></div>
                                <h3 className="text-2xl font-title text-quaternary mb-1">{member.name}</h3>
                                <p className="text-sm uppercase tracking-widest text-tertiary mb-4">{member.role}</p>
                                <p className="text-gray-600 leading-relaxed font-body">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
}
