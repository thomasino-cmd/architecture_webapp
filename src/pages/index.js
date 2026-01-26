import Head from 'next/head';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import ContactGateway from '../components/ContactGateway';
import HouseVisualizer from '../components/HouseVisualizer';
import PortfolioPreview from '../components/PortfolioPreview';

export default function Home() {
  return (
    <>
      <Head>
        <title>Arch Studio – Dalla visione alla realtà</title>
        <meta name="description" content="Arch Studio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        {/* IL REGISTA DI SFONDO */}
        <HouseVisualizer />

        {/* LE SEZIONI (Devono avere gli ID corretti: hero, team, services, contact) */}
        {/* Passiamo una prop 'id' ai componenti per identificarli */}

        <div id="hero">
          <Hero />
        </div>

        <div id="portfolio-preview">
          <PortfolioPreview />
        </div>

        <div id="team">
          <Team />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="reviews">
          <Reviews />
        </div>

        <div id="contact">
          <ContactGateway />
        </div>
      </main>
    </>
  );
}