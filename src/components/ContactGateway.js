import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './common/Magnetic';

export default function ContactGateway() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // Simple fade in for the CTA
        gsap.fromTo(".contact-cta",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[50vh] flex flex-col items-center justify-center py-20"
        >
            <div className="contact-cta text-center z-10 flex flex-col items-center">
                <div className="eraser-mask mb-8">
                    <h2 className="text-5xl md:text-7xl font-title text-quaternary mb-0 eraser-text-shadow">
                        Hai un progetto?
                    </h2>
                </div>
                <Magnetic>
                    <a
                        href="/contact"
                        className="inline-block bg-quaternary text-white px-10 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
                    >
                        PARLIAMONE
                    </a>
                </Magnetic>
            </div>
        </section>
    );
}
