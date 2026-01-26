import Head from 'next/head';
import Contact from '../components/Contact'; // Reusing the form logic
import Magnetic from '../components/common/Magnetic';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contatti | Arch Studio</title>
            </Head>

            <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

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

                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 w-full mt-4">
                        {/* Map Placeholder */}
                        Mappa Interattiva
                    </div>
                </div>

                {/* Form Column */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-fit self-center">
                    {/* Integrating the existing Contact component logic visually adapted if needed */}
                    {/* For now, we render the component. In a real scenario we might pass props to style it differently or just import the form part. layout already handles it nicely. */}
                    <Contact />
                </div>

            </section>
        </>
    );
}
