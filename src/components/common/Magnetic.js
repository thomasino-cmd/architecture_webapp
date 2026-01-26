import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, className }) {
    const magneticRef = useRef(null);

    useEffect(() => {
        const el = magneticRef.current;
        if (!el) return;

        // Use QuickTo for high performance mouse tracking prevents garbage collection
        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Attraction force: 0.35 factor
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);

        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    // We clone the child element to inject the ref and data-magnetic attribute.
    // This avoids adding an extra wrapper div which might break layouts.
    // If children is not a single element, we might need a wrapper, 
    // but for this specific use case (Button, Link), a wrapper div is safer to ensure it catches events.
    return (
        <div
            ref={magneticRef}
            className={className}
            data-magnetic="true"
            style={{ display: 'inline-block' }} /* Preserves layout default */
        >
            {children}
        </div>
    );
}
