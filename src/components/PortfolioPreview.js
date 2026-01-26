import Link from 'next/link';
import Magnetic from './common/Magnetic';

export default function PortfolioPreview() {
    return (
        <section className="py-24 px-6 flex flex-col items-center justify-center text-center bg-transparent">
            <div className="eraser-mask mb-12 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-title text-quaternary mb-8 eraser-text-shadow">
                    I Nostri Progetti
                </h2>
                <p className="text-lg text-text max-w-2xl">
                    Esplora una selezione dei nostri lavori più recenti. Ogni progetto è un viaggio unico dalla concezione alla realtà.
                </p>
            </div>

            <Magnetic>
                <Link
                    href="/portfolio"
                    className="inline-block bg-quaternary text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                    ESPLORA PORTFOLIO
                </Link>
            </Magnetic>
        </section>
    );
}
