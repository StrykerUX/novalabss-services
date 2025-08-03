"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Una página web realmente me va a traer clientes?",
    answer: "Una página web profesional es la **mejor inversión** que puedes hacer para tu negocio. Te posiciona como una empresa seria y confiable, te da presencia las 24/7 y convierte visitantes en clientes reales. Es la piedra angular de tu crecimiento digital que potencia todas tus estrategias de marketing. Cuando combines tu sitio con redes sociales, publicidad o recomendaciones, cada peso invertido se multiplica. No es un gasto, es la herramienta que hace crecer tu negocio."
  },
  {
    question: "¿Qué pasa si no me gusta el diseño inicial?",
    answer: "Entregamos las primeras 2 secciones de tu sitio para revisión. Si el enfoque no te convence completamente, tienes derecho a un rediseño completo sin costo adicional. Una vez que apruebes la dirección, incluimos 3 rondas de cambios menores (textos, colores, imágenes). Nuestro objetivo es que ames tu sitio web."
  },
  {
    question: "¿Realmente pueden entregar en una semana?",
    answer: "Absolutamente, pero requiere tu colaboración activa. Necesitamos que nos proporciones toda la información de tu negocio (textos, imágenes, logos) y mantengas comunicación constante durante el proceso. Con estos elementos listos y tu feedback oportuno, entregamos en 3-5 días hábiles. Si hay retrasos en la información, el cronograma se ajusta proporcionalmente."
  },
  {
    question: "¿Qué incluye exactamente el servicio bimestral?",
    answer: "Todo lo necesario para que tu sitio funcione: hosting premium, certificado SSL, actualizaciones de seguridad, respaldos automáticos, soporte técnico y hasta 2 horas bimestrales de cambios menores. Básicamente, te olvidas de la parte técnica y te enfocas en tu negocio."
  },
  {
    question: "¿Qué pasa si quiero cancelar el servicio?",
    answer: "Para cancelar debes solicitar la cancelación con un máximo de 15 días antes del próximo cargo bimestral. Tu sitio web seguirá funcionando hasta que termine el ciclo de pago en curso, después dejará de funcionar ya que toda la infraestructura tecnológica, hosting, certificados SSL y soporte están completamente integrados en nuestro servicio."
  }
];

interface FAQItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
      >
        <h3 className="text-white text-lg font-semibold pr-4 leading-relaxed">
          {faq.question}
        </h3>
        <div className={`text-blue-400 text-2xl font-bold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </div>
      </button>
      <div 
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pb-6">
          <p className="text-white/80 leading-relaxed">
            {faq.answer.split('**').map((part, i) => 
              i % 2 === 1 ? (
                <strong key={i} className="text-blue-300 font-semibold">{part}</strong>
              ) : (
                part
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const faqItems = sectionRef.current.querySelectorAll('.faq-item');
    
    gsap.fromTo(faqItems, 
      { 
        opacity: 0, 
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestro servicio de desarrollo web
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <FAQItem
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}