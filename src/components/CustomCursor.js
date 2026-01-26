import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor renders a reactive cursor that adapts to the context.
 * 
 * States:
 * - Default: Tiny crosshair (Architectural precision)
 * - Hover: Expanded circle (Focus/Magnetic interaction)
 */
export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;

        // GSAP quickTo for high-performance movement
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3", inertia: true });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3", inertia: true });

        // Initial hide until mouse moves (prevents jump)
        gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

        const moveCursor = (e) => {
            // Un-hide on first move if hidden
            if (gsap.getProperty(cursor, "scale") === 0) {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            }
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const handleMouseOver = (e) => {
            // Check if the target or any parent has data-magnetic, or is a link/button/input
            const target = e.target;
            const isMagnetic = target.closest('[data-magnetic="true"]');
            const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');

            if (isMagnetic || isInteractive) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver); // Global listener for delegation

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Visual state management
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        if (isHovered) {
            // State: Hover (Circle)
            gsap.to(cursor, {
                width: 60,
                height: 60,
                backgroundColor: "transparent",
                border: "1px solid white",
                mixBlendMode: "difference", /* Ensure visibility */
                duration: 0.3,
                ease: "power2.out"
            });
            // Hide crosshair lines
            gsap.to(".cursor-cross", { opacity: 0, duration: 0.2 });
        } else {
            // State: Default (Crosshair)
            gsap.to(cursor, {
                width: 16,
                height: 16,
                backgroundColor: "transparent",
                border: "none",
                mixBlendMode: "difference",
                duration: 0.3,
                ease: "power2.out"
            });
            // Show crosshair lines
            gsap.to(".cursor-cross", { opacity: 1, duration: 0.2, delay: 0.1 });
        }
    }, [isHovered]);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full flex items-center justify-center pointer-events-none"
        >
            {/* The cross hair is built with two lines */}
            <div className="cursor-cross absolute w-px h-3 bg-white"></div>
            <div className="cursor-cross absolute h-px w-3 bg-white"></div>
        </div>
    );
}
