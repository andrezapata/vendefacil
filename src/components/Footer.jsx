import React from 'react';

import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiArrowUpRight,
  FiSend
} from 'react-icons/fi';

import '../styles/Footer.css';

const contactos = [
  {
    text: '+51 901 329 855',
    action: () => {
      window.open('https://wa.me/51999888777', '_blank');
    }
  },

  {
    text: 'andrebryamzapatavega@gmail.com',
    action: () => {
      window.location.href = 'mailto:andrebryamzapatavega@gmail.com';
    }
  },

  {
    text: 'Lima, Perú — Envíos a todo el país',
    action: () => {
      window.open('https://maps.google.com', '_blank');
    }
  },
];

const columnas = [

  {
    title: 'NAVEGACIÓN',

    links: [
      {
        label: 'Inicio',
        action: () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      },

      {
        label: 'Catálogo',
        action: () => {
          alert('Abriendo catálogo');
        }
      },

      {
        label: 'Ofertas',
        action: () => {
          alert('Mostrando ofertas');
        }
      },

      {
        label: 'Contacto',
        action: () => {
          document
            .getElementById('contacto')
            ?.scrollIntoView({
              behavior: 'smooth'
            });
        }
      },
    ]
  },

  {
    title: 'LEGAL',

    links: [
      {
        label: 'Privacidad',
        action: () => {
          alert('Políticas de privacidad');
        }
      },

      {
        label: 'Términos',
        action: () => {
          alert('Términos y condiciones');
        }
      },

      {
        label: 'Devoluciones',
        action: () => {
          alert('Políticas de devoluciones');
        }
      },
    ]
  },

];

const sociales = [

  {
    icon: FiInstagram,
    link: 'https://instagram.com'
  },

  {
    icon: FiFacebook,
    link: 'https://facebook.com'
  },

  {
    icon: FiTwitter,
    link: 'https://twitter.com'
  },

  {
    icon: FiYoutube,
    link: 'https://youtube.com'
  },

];

export default function Footer() {

  return (

    <footer
      className="vf-footer"
      id="contacto"
    >

      <div className="vf-footer-glow"></div>

      <div className="vf-footer-inner">

        <div className="vf-footer-top">

          {/* LOGO */}

          <div className="vf-footer-brand fade-up">

            <div className="vf-footer-logo">

              <div className="vf-footer-logo-box">
                VF
              </div>

              <span className="vf-footer-logo-text">
                VendeFácil
              </span>

            </div>

            <p className="vf-footer-desc">
              Tu tienda de tecnología premium y dispositivos
              digitales diseñados para una experiencia moderna,
              elegante y profesional.
            </p>

            <div className="vf-footer-contact-list">

              {contactos.map((c, i) => (

                <button
                  key={i}
                  className="vf-footer-contact"
                  onClick={c.action}
                >
                  {c.text}
                </button>

              ))}

            </div>

          </div>

          {/* COLUMNAS */}

          <div className="vf-footer-links-container fade-up">

            {columnas.map((col, i) => (

              <div
                key={i}
                className="vf-footer-column"
              >

                <h4 className="vf-footer-col-title">
                  {col.title}
                </h4>

                {col.links.map((l, j) => (

                  <button
                    key={j}
                    className="vf-footer-link"
                    onClick={l.action}
                  >

                    {l.label}

                    <FiArrowUpRight />

                  </button>

                ))}

              </div>

            ))}

          </div>

        </div>

        {/* NEWSLETTER */}

        <div className="vf-footer-newsletter fade-up">

          <div>

            <h3>
              Suscríbete a novedades exclusivas
            </h3>

            <p>
              Recibe ofertas, lanzamientos y tecnología premium.
            </p>

          </div>

          <div className="vf-footer-input-box">

            <input
              type="email"
              placeholder="Ingresa tu correo"
            />

            <button>

              <FiSend />

            </button>

          </div>

        </div>

        {/* REDES */}

        <div className="vf-footer-bottom">

          <div className="vf-footer-socials">

            {sociales.map((s, i) => {

              const Icon = s.icon;

              return (

                <button
                  key={i}
                  className="vf-footer-social-btn"
                  onClick={() => window.open(s.link, '_blank')}
                >

                  <Icon size={18} />

                </button>

              );
            })}

          </div>

          <p className="vf-footer-copy">
            © 2026 VendeFácil · Todos los derechos reservados
          </p>

        </div>

      </div>

    </footer>
  );
}