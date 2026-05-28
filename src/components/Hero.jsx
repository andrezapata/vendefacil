import React from 'react';

import {
  FiArrowRight,
  FiPlay,
  FiStar
} from 'react-icons/fi';

import '../styles/Hero.css';

export default function Hero() {

  const irProductos = () => {

    const section = document.getElementById('productos');

    if(section){
      section.scrollIntoView({
        behavior:'smooth'
      });
    }

  };

  const irOfertas = () => {

    const section = document.getElementById('categorias');

    if(section){
      section.scrollIntoView({
        behavior:'smooth'
      });
    }

  };

  return (

    <section className="vf-hero" id="inicio">

      {/* GLOWS */}

      <div className="vf-hero-glow"></div>

      <div className="vf-hero-glow2"></div>

      <div className="vf-hero-grid"></div>

      {/* CONTENT */}

      <div className="vf-hero-inner">

        {/* LEFT */}

        <div className="vf-hero-left fade-up">

          {/* BADGE */}

          <div className="vf-hero-badge">

            <span className="vf-hero-badge-dot"></span>

            <span className="vf-hero-badge-text">
              NUEVA COLECCION 2026
            </span>

          </div>

          {/* TITLE */}

          <h1 className="vf-hero-title">

            Tecnología Premium
            para un Mundo
            <span className="vf-hero-title-gradient">
              Más Inteligente
            </span>

          </h1>

          {/* SUBTITLE */}

          <p className="vf-hero-subtitle">

            Descubre dispositivos de última generación,
            diseñados para productividad, entretenimiento
            y experiencias digitales avanzadas.

          </p>

          {/* BUTTONS */}

          <div className="vf-hero-buttons">

            <button
              className="vf-btn-primary"
              onClick={irProductos}
            >

              Ver Productos

              <FiArrowRight />

            </button>

            <button
              className="vf-btn-secondary"
              onClick={irOfertas}
            >

              <FiPlay />

              Explorar Ofertas

            </button>

          </div>

          {/* STATS */}

          <div className="vf-hero-stats">

            <div className="vf-stat-box">

              <h3>15K+</h3>

              <span>Clientes Premium</span>

            </div>

            <div className="vf-stat-box">

              <h3>250+</h3>

              <span>Productos Tech</span>

            </div>

            <div className="vf-stat-box">

              <h3>4.9</h3>

              <span>
                <FiStar />
                Rating Global
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="vf-hero-right fade-up">

          {/* MAIN CARD */}

          <div className="vf-hero-card">

            <div className="vf-hero-card-top">

              <span className="vf-card-badge">
                DESTACADO
              </span>

              <span className="vf-card-stock">
                Disponible
              </span>

            </div>

            <div className="vf-hero-product-image">

              💻

            </div>

            <div className="vf-hero-card-content">

              <h2>
                VendeFácil ProBook X
              </h2>

              <p>
                Rendimiento extremo para trabajo,
                gaming y productividad avanzada.
              </p>

              <div className="vf-hero-price-row">

                <div>

                  <span className="vf-old-price">
                    S/ 1,799
                  </span>

                  <h3>
                    S/ 1,299
                  </h3>

                </div>

                <button>

                  Comprar

                </button>

              </div>

            </div>

          </div>

          {/* FLOATING CARD */}

          <div className="vf-floating-card">

            <div className="vf-floating-icon">
              ⚡
            </div>

            <div>

              <h4>Ultra Performance</h4>

              <span>
                Potencia Inteligente
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}