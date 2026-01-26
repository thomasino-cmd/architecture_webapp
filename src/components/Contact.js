import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './common/Magnetic';

export default function AppointmentSurvey() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    timeframe: '',
    contact: ''
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(".survey-container",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  const handleSelect = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const handleContactChange = (e) => {
    setFormData(prev => ({ ...prev, contact: e.target.value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <section ref={sectionRef} className="min-h-[60vh] flex flex-col items-center justify-center py-20 relative px-4">
      <div className="survey-container w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
          <div
            className="h-full bg-quaternary transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="mt-6 text-center">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-5xl font-title text-quaternary">Che progetto hai in mente?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Nuova Costruzione', 'Ristrutturazione', 'Interior Design'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('projectType', opt)}
                    className="p-4 rounded-xl border-2 border-quaternary/20 hover:border-quaternary hover:bg-quaternary hover:text-white transition-all text-gray-700 font-bold"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-5xl font-title text-quaternary">Quando vorresti iniziare?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Subito', 'Tra 3-6 Mesi', 'Solo Info'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect('timeframe', opt)}
                    className="p-4 rounded-xl border-2 border-quaternary/20 hover:border-quaternary hover:bg-quaternary hover:text-white transition-all text-gray-700 font-bold"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={prevStep} className="text-sm text-gray-400 hover:text-quaternary mt-4">← Indietro</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-5xl font-title text-quaternary">Come possiamo contattarti?</h2>
              <input
                type="text"
                placeholder="La tua email o telefono"
                className="w-full text-center text-xl p-4 bg-transparent border-b-2 border-quaternary/30 focus:border-quaternary outline-none placeholder:text-gray-300"
                value={formData.contact}
                onChange={handleContactChange}
              />
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={prevStep} className="text-sm text-gray-400 hover:text-quaternary">← Indietro</button>
                <Magnetic>
                  <button
                    onClick={nextStep}
                    disabled={!formData.contact}
                    className="bg-quaternary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Avanti
                  </button>
                </Magnetic>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl md:text-5xl font-title text-quaternary mb-4">Grazie!</h2>
              <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                Abbiamo ricevuto le tue preferenze.
                <br />
                <span className="font-bold text-quaternary">{formData.projectType}</span> • <span className="font-bold text-quaternary">{formData.timeframe}</span>
              </p>
              <p className="text-gray-500">Ti contatteremo presto a: <span className="font-medium">{formData.contact}</span> per confermare l&apos;appuntamento.</p>

              <Magnetic>
                <a href="/" onClick={() => setStep(1)} className="inline-block mt-8 text-sm uppercase tracking-widest text-quaternary border-b border-quaternary hover:opacity-70">
                  Torna all&apos;inizio
                </a>
              </Magnetic>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}