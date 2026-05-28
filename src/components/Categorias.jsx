import React from 'react';

import {
  FiMonitor,
  FiSmartphone,
  FiHeadphones,
  FiTablet,
  FiArrowRight
} from 'react-icons/fi';

import '../styles/Categorias.css';

const categorias = [

  {
    icon: <FiMonitor size={26} />,
    label: 'Computación',
    sub: 'Laptops, Monitores y Periféricos',
    count: 84,
    color: '#2563eb',
    action: () => {
      alert('Entrando a Computación');
    }
  },

  {
    icon: <FiSmartphone size={26} />,
    label: 'Smartphones',
    sub: 'Todas las marcas premium',
    count: 63,
    color: '#06b6d4',
    action: () => {
      alert('Entrando a Smartphones');
    }
  },

  {
    icon: <FiHeadphones size={26} />,
    label: 'Audio Premium',
    sub: 'Sonido envolvente profesional',
    count: 41,
    color: '#f97316',
    action: () => {
      alert('Entrando a Audio');
    }
  },

  {
    icon: <FiTablet size={26} />,
    label: 'Tablets',
    sub: 'Trabajo y entretenimiento',
    count: 29,
    color: '#10b981',
    action: () => {
      alert('Entrando a Tablets');
    }
  },

];

export default function Categorias() {

  return (

    <section className="vf-categorias" id="categorias">

      <div className="vf-categorias-header fade-up">

        <span className="vf-cat-badge">
          CATEGORÍAS
        </span>

        <h2>
          Explora Tecnología de Última Generación
        </h2>

        <p>
          Descubre dispositivos premium diseñados para
          productividad, entretenimiento y estilo moderno.
        </p>

      </div>

      <div className="vf-categorias-grid">

        {categorias.map((cat, i) => (

          <div
            key={i}
            className="vf-cat-card fade-up"
            style={{
              animationDelay: `${i * 0.12}s`
            }}
          >

            <div
              className="vf-cat-glow"
              style={{
                background: `${cat.color}20`
              }}
            ></div>

            <div
              className="vf-cat-icon-box"
              style={{
                background: `${cat.color}15`,
                color: cat.color
              }}
            >
              {cat.icon}
            </div>

            <h3 className="vf-cat-label">
              {cat.label}
            </h3>

            <p className="vf-cat-sub">
              {cat.sub}
            </p>

            <div className="vf-cat-footer">

              <span
                className="vf-cat-count"
                style={{
                  color: cat.color
                }}
              >
                {cat.count} productos
              </span>

              <button
                className="vf-cat-btn"
                style={{
                  background: `${cat.color}15`,
                  color: cat.color
                }}
                onClick={cat.action}
              >

                Ver Más

                <FiArrowRight />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}