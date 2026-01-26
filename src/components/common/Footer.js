import Link from 'next/link';
import Magnetic from './Magnetic';

export default function Footer() {
    return (
        <footer className="w-full bg-[#111] text-white py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-title uppercase tracking-widest mb-2">Arch Studio</h2>
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Arch Studio. P.IVA 12345678901
                    </p>
                </div>

                <nav className="flex gap-6">
                    {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
                        <Magnetic key={social}>
                            <Link href="#" className="text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors">
                                {social}
                            </Link>
                        </Magnetic>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
