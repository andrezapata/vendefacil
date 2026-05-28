import React from 'react';

import {
  FiTruck,
  FiShield,
  FiHeadphones,
  FiArrowRight
} from 'react-icons/fi';

import '../styles/Beneficios.css';

const beneficios = [
  {
    icon: <FiTruck size={28} />,
    color: '#2563eb',
    titulo: 'Envío Gratuito',
    desc: 'En todos los pedidos superiores a S/ 150. Sin cargos ocultos.',
    boton: 'Ver Cobertura',
    action: () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },

  {
    icon: <FiShield size={28} />,
    color: '#10b981',
    titulo: 'Garantía Extendida',
    desc: 'Protegemos tus dispositivos hasta 2 años adicionales.',
    boton: 'Conocer Más',
    action: () => {
      alert('Garantía premium activada para todos los productos.');
    }
  },

  {
    icon: <FiHeadphones size={28} />,
    color: '#f97316',
    titulo: 'Soporte 24/7',
    desc: 'Atención técnica profesional siempre disponible para ti.',
    boton: 'Contactar',
    action: () => {
      window.open(
        'https://wa.me/51999999999',
        '_blank'
      );
    }
  },
];

export default function Beneficios() {

  return (

    <section className="vf-beneficios" id="beneficios">

      <div className="vf-beneficios-header fade-up">

        <span className="vf-badge">
          BENEFICIOS PREMIUM
        </span>

        <h2>
          Compra con confianza y tecnología de primer nivel
        </h2>

        <p>
          Diseñado para ofrecer una experiencia moderna,
          segura y profesional en cada compra.
        </p>

      </div>

      <div className="vf-beneficios-inner">

        {beneficios.map((b, i) => (

          <div
            key={i}
            className="vf-beneficio-card fade-up"
            style={{
              border: `1px solid ${b.color}25`,
              animationDelay: `${i * 0.15}s`
            }}
          >

            <div
              className="vf-beneficio-icon"
              style={{
                background: `${b.color}15`,
                color: b.color
              }}
            >
              {b.icon}
            </div>

            <div className="vf-beneficio-content">

              <h3 className="vf-beneficio-title">
                {b.titulo}
              </h3>

              <p className="vf-beneficio-desc">
                {b.desc}
              </p>

              <button
                className="vf-beneficio-btn"
                style={{
                  background: `${b.color}15`,
                  color: b.color
                }}
                onClick={b.action}
              >

                {b.boton}

                <FiArrowRight />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}