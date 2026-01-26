import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Magnetic from '../common/Magnetic';

const menuLinks = [
    { title: 'Home', href: '/' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'La Nostra Storia', href: '/about' },
    { title: 'Servizi', href: '/services' },
    { title: 'Contatti', href: '/contact' },
];

export default function MenuOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const linkRefs = useRef([]);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const tl = gsap.timeline({ paused: true });

        tl.to(containerRef.current, {
            duration: 0.8,
            clipPath: "circle(150% at 95% 5%)",
            ease: "power4.inOut",
        });

        tl.from(linkRefs.current, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
        }, "-=0.4");

        if (isOpen) {
            tl.play();
        } else {
            tl.reverse();
        }
    }, [isOpen]);

    return (
        <>
            <div className="fixed top-6 right-6 z-[100]">
                <Magnetic>
                    <button
                        onClick={toggleMenu}
                        className="w-16 h-16 rounded-full bg-quaternary text-white flex items-center justify-center pointer-events-auto mix-blend-difference"
                    >
                        <div className={`w-8 flex flex-col items-center gap-1.5 transition-all duration-300 ${isOpen ? 'gap-0' : ''}`}>
                            <span className={`block h-[2px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[1px] w-8' : 'w-8'}`} />
                            <span className={`block h-[2px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[1px] w-8' : 'w-5'}`} />
                        </div>
                    </button>
                </Magnetic>
            </div>

            <div
                ref={containerRef}
                className="fixed inset-0 bg-[#E5DCC5] z-[90] flex items-center justify-center clip-circle-0"
                style={{ clipPath: "circle(0% at 95% 5%)" }}
            >
                <nav className="flex flex-col gap-6 text-center">
                    {menuLinks.map((link, i) => (
                        <div key={link.title} className="overflow-hidden">
                            <div ref={el => linkRefs.current[i] = el}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-title text-5xl md:text-7xl text-quaternary hover:italic transition-all duration-300 block"
                                >
                                    {link.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
}
