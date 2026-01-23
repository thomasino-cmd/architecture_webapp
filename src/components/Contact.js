import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';    
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/**
 * The Contact section concludes the narrative with the roof being placed.
 * A triangular roof element slides down over the form as the user approaches
 * the bottom of the page. The form collects basic contact information
 * and the type of project. A Calendly embed could replace the placeholder
 * booking container below.
 */
export default function Contact() {
  const sectionRef = useRef(null);
  const roofRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', project: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        roofRef.current,
        { y: '-100%' },
        {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        }
      );
    }, sectionRef);
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
      className="relative min-h-screen bg-tertiary flex flex-col items-center justify-center py-20"
    >
      {/* Roof element */}
      <div
        ref={roofRef}
        className="absolute top-0 left-0 w-full h-1/3 bg-quaternary"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
      />
      <div className="relative z-10 max-w-lg w-full bg-primary p-8 rounded-lg shadow-xl">
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
                className="px-3 py-2 border border-secondary rounded bg-primary text-text focus:outline-none focus:border-quaternary"
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
                className="px-3 py-2 border border-secondary rounded bg-primary text-text focus:outline-none focus:border-quaternary"
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
                className="px-3 py-2 border border-secondary rounded bg-primary text-text focus:outline-none focus:border-quaternary"
              >
                <option value="">Seleziona</option>
                <option value="Progettazione">Progettazione</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Ristrutturazione">Ristrutturazione</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-quaternary text-primary py-2 px-6 rounded hover:bg-secondary transition-colors"
            >
              Invia
            </button>
          </form>
        )}
        {/* Calendly or booking embed placeholder */}
        <div className="mt-8">
          <h3 className="text-xl font-title text-quaternary mb-2">Prenota un appuntamento</h3>
          <div className="w-full h-72 bg-secondary flex items-center justify-center rounded">
            <p className="text-text">Integrazione calendario disponibile qui.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
