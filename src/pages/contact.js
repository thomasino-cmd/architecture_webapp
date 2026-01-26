import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AppointmentSurvey from '../components/AppointmentSurvey';
import Magnetic from '../components/common/Magnetic';

// Dynamically import Map to avoid SSR issues with Leaflet
const FixedMap = dynamic(() => import('../components/FixedMap'), {
    ssr: false,
});

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contatti | Arch Studio</title>
            </Head>

            <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative">
                <div className="absolute top-24 left-6 md:left-0 z-10">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest text-quaternary hover:bg-quaternary hover:text-white transition-all shadow-md border border-quaternary/20">
                        ← Torna alla Home
                    </Link>
                </div>

                {/* Info Column */}
                <div className="flex flex-col justify-center space-y-8">
                    <h1 className="text-6xl md:text-8xl font-title text-quaternary leading-none">
                        Parliamo <br /> del tuo <br /> Progetto
                    </h1>

                    <div className="space-y-6 text-lg text-gray-700 font-body">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Indirizzo</h3>
                            <p>Via Dell&apos;Architettura 10, 20121 Milano (MI)</p>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Email</h3>
                            <Magnetic>
                                <a href="mailto:info@archstudio.com" className="text-2xl font-title text-quaternary hover:underline">info@archstudio.com</a>
                            </Magnetic>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-1">Telefono</h3>
                            <p>+39 02 1234 5678</p>
                        </div>
                    </div>

                    <div className="h-64 md:h-80 w-full mt-4">
                        <FixedMap />
                    </div>
                </div>

                {/* Form Column */}
                <div className="h-fit self-center w-full">
                    <AppointmentSurvey />
                </div>

            </section>
        </>
    );
}
