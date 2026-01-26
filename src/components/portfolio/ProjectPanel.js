import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProjectPanel = ({ project, isActive, onClose, onNext }) => {
    const panelRef = useRef(null);
    const contentRef = useRef(null);
    const imageRefs = useRef([]);

    // Reset image refs array
    imageRefs.current = [];
    const addToRefs = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (isActive && project) {
            // 1. Panel enters
            // Mobile: from bottom (translateY), Desktop: from left (translateX)
            // We handle this via GSAP + Media Query logic or just check window width
            const isMobile = window.innerWidth < 768;

            const entryVars = isMobile
                ? { y: '0%', x: '0%', duration: 0.8, ease: 'power3.out' }
                : { x: '0%', y: '0%', duration: 0.8, ease: 'power3.out' };

            gsap.to(panelRef.current, entryVars);

            // 2. Content enter animation (staggered)
            gsap.fromTo([contentRef.current, ...imageRefs.current],
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, delay: 0.4, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );

        } else {
            // Panel exits
            const isMobile = window.innerWidth < 768;
            const exitVars = isMobile
                ? { y: '100%', ease: 'power3.inOut', duration: 0.6 }
                : { x: '-100%', ease: 'power3.inOut', duration: 0.6 };

            gsap.to(panelRef.current, exitVars);
        }
    }, [isActive, project]);

    if (!project) return null;

    return (
        <div
            ref={panelRef}
            className={`
        fixed z-20 bg-white shadow-2xl overflow-hidden flex flex-col
        /* Mobile Styles */
        bottom-0 left-0 w-full h-[85vh] transform translate-y-full
        rounded-t-3xl
        /* Desktop Styles */
        md:top-0 md:left-0 md:w-1/2 md:h-full md:rounded-none md:transform md:-translate-x-full
      `}
        >
            {/* Controls Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-30">
                <button
                    onClick={onClose}
                    className="text-sm font-medium tracking-widest uppercase hover:text-[#CC6649] transition-colors"
                >
                    ← Chiudi
                </button>
                <span className="text-xs text-gray-400 tracking-widest">PORTFOLIO</span>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8" ref={contentRef}>
                <div className="max-w-xl mx-auto space-y-12">

                    {/* Header */}
                    <header className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                            {project.title}
                        </h1>
                        <p className="flex items-center text-[#CC6649] font-medium">
                            <span className="mr-2">📍</span> {project.location}
                        </p>
                    </header>

                    {/* Description */}
                    <div className="prose prose-lg text-gray-600 leading-relaxed">
                        <p>{project.description}</p>
                    </div>

                    {/* Gallery */}
                    <div className="space-y-8">
                        {project.images && project.images.map((img, idx) => (
                            <div key={idx} ref={addToRefs} className="relative overflow-hidden group">
                                {/* Placeholder for real images. In production use Next/Image */}
                                <img
                                    src={img}
                                    alt={`${project.title} view ${idx + 1}`}
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Footer / Navigation */}
            <div className="p-6 border-t border-gray-100 bg-white">
                <button
                    onClick={onNext}
                    className="w-full bg-gray-900 text-white py-4 px-6 rounded-none hover:bg-[#CC6649] transition-colors duration-300 flex items-center justify-center font-medium tracking-wide"
                >
                    PROSSIMO PROGETTO
                    <span className="ml-2">→</span>
                </button>
            </div>

        </div>
    );
};

export default ProjectPanel;
