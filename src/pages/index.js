import Head from 'next/head';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

/**
 * The main index page composes all sections into a single continuous scroll.
 * It follows the metaphor of constructing a building: foundations, structure,
 * walls, finishes, and roof. Smooth vertical scrolling is assumed by default.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>Arch Studio – Studio di architetti freelance</title>
        <meta
          name="description"
          content="Arch Studio: progettazione, interior design e ristrutturazioni. Un sito one‑page che racconta visivamente la nascita di un progetto."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Team />
        <Services />
        <Reviews />
        <Contact />
      </main>
    </>
  );
}