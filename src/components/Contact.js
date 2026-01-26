import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './common/Magnetic';

/**
 * The Contact section is now the "Foundation" stage.
 * The roof animation has been removed as requested.
 * Background is transparent to show the excavation/foundation site.
 */
export default function Contact() {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', project: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Animazione rimossa poiché non c'è più il tetto.
    // Lasciamo il context vuoto o aggiungiamo animazioni per il form se necessario in futuro.
    const ctx = gsap.context(() => { }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      setSent(true);
      setFormState({ name: '', email: '', project: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-transparent flex flex-col items-center justify-center py-20" // Modificato: bg-transparent
    >
      {/* Modificato: Box form con trasparenza bg-white/90 */}
      <div className="relative z-10 max-w-lg w-full bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-secondary/20">
        <h2 className="text-3xl font-title text-quaternary mb-6">Contattaci</h2>
        {sent ? (
          <p className="text-text">Grazie per averci contattato! Ti risponderemo al più presto.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-text mb-1" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                required
                className="px-3 py-2 border border-secondary rounded bg-white/50 text-text focus:outline-none focus:border-quaternary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="px-3 py-2 border border-secondary rounded bg-white/50 text-text focus:outline-none focus:border-quaternary"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-text mb-1" htmlFor="project">
                Tipo di progetto
              </label>
              <select
                id="project"
                name="project"
                value={formState.project}
                onChange={handleChange}
                required
                className="px-3 py-2 border border-secondary rounded bg-white/50 text-text focus:outline-none focus:border-quaternary"
              >
                <option value="">Seleziona</option>
                <option value="Progettazione">Progettazione</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Ristrutturazione">Ristrutturazione</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
            <Magnetic>
              <button
                type="submit"
                className="mt-4 bg-quaternary text-primary py-2 px-6 rounded hover:bg-secondary transition-colors font-bold"
              >
                Invia
              </button>
            </Magnetic>
          </form>
        )}
        {/* Calendly or booking embed placeholder */}
        <div className="mt-8">
          <h3 className="text-xl font-title text-quaternary mb-2">Prenota un appuntamento</h3>
          <div className="w-full h-72 bg-secondary/50 flex items-center justify-center rounded border border-dashed border-quaternary">
            <p className="text-text font-medium">Integrazione calendario disponibile qui.</p>
          </div>
        </div>
      </div>
    </section>
  );
}