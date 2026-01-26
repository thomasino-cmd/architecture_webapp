import Head from 'next/head';
import PortfolioLayout from '../components/portfolio/PortfolioLayout';

export default function PortfolioPage() {
    return (
        <>
            <Head>
                <title>Portfolio | Architecture Studio</title>
                <meta name="description" content="Esplora i nostri progetti di architettura sulla mappa interattiva." />
            </Head>
            <main>
                <PortfolioLayout />
            </main>
        </>
    );
}
