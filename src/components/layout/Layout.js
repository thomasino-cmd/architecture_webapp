import CustomCursor from '../CustomCursor';
import MenuOverlay from './MenuOverlay';
import Footer from '../common/Footer';
import ProgressBar from '../ProgressBar';

export default function Layout({ children }) {
    return (
        <>
            <CustomCursor />
            <ProgressBar />
            <MenuOverlay />

            <main className="min-h-screen relative bg-transparent selection:bg-quaternary selection:text-white">
                {children}
            </main>

            <Footer />
        </>
    );
}
