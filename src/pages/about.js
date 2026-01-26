import Head from 'next/head';
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

            <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 text-[#111]">
                {/* Texts - Left */}
                <div ref={contentRef} className="md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-6xl md:text-8xl font-title text-quaternary mb-8 leading-none">
                        La Nostra <br /> Storia
                    </h1>
                    <div className="text-lg md:text-xl font-body leading-relaxed space-y-6">
                        <p>
                            Fondato nel 2010, Arch Studio nasce dalla visione condivisa di creare spazi che non siano solo funzionali, ma che raccontino una storia.
                        </p>
                        <p>
                            Crediamo che l&apos;architettura sia un linguaggio emozionale. Ogni linea, ogni materiale, ogni luce è scelta per evocare una sensazione. Dal residenziale al commerciale, il nostro approccio rimane lo stesso: ascoltare il cliente e tradurre i suoi sogni in realtà tangibile.
                        </p>
                        <p>
                            Il nostro team è composto da architetti, designer e ingegneri che collaborano in sinergia. Non costruiamo solo edifici; costruiamo esperienze che durano nel tempo.
                        </p>
                    </div>
                </div>

                {/* Images - Right */}
                <div className="md:w-1/2 grid grid-cols-2 gap-4 h-fit">
                    <div className="relative h-80 w-full bg-gray-200 rounded-lg overflow-hidden translate-y-12">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-quaternary font-title">Visione</div>
                    </div>
                    <div className="relative h-80 w-full bg-gray-200 rounded-lg overflow-hidden">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-quaternary font-title">Realtà</div>
                    </div>
                    <div className="relative h-80 w-full bg-gray-200 rounded-lg overflow-hidden translate-y-12 col-span-2">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center text-quaternary font-title">Il Team</div>
                    </div>
                </div>
            </section>
        </>
    );
}
