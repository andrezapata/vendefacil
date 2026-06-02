import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  FiInstagram, FiFacebook, FiTwitter, FiYoutube,
  FiArrowUpRight, FiSend, FiCheckCircle, FiLoader
} from 'react-icons/fi';
import '../styles/Footer.css';

// ── PON AQUÍ TUS DATOS DE EMAILJS ──────────────────
const EMAILJS_SERVICE_ID  = 'service_pth9zpf';   // ← tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_m2feh3x';  // ← tu Template ID
const EMAILJS_PUBLIC_KEY  = 'ZCWYLAtDXo00E1y8l'; // ← tu Public Key
// ───────────────────────────────────────────────────

const contactos = [
  { text: '+51 901 329 855',                   action: () => window.open('https://wa.me/51901329855', '_blank') },
  { text: 'andrebryamzapatavega@gmail.com',    action: () => { window.location.href = 'mailto:andrebryamzapatavega@gmail.com'; } },
  { text: 'Lima, Perú — Envíos a todo el país', action: () => window.open('https://maps.google.com', '_blank') },
];

const columnas = [
  {
    title: 'NAVEGACIÓN',
    links: [
      { label: 'Inicio',   action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      { label: 'Catálogo', action: () => alert('Abriendo catálogo') },
      { label: 'Ofertas',  action: () => alert('Mostrando ofertas') },
      { label: 'Contacto', action: () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) },
    ]
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacidad',   action: () => alert('Políticas de privacidad') },
      { label: 'Términos',     action: () => alert('Términos y condiciones') },
      { label: 'Devoluciones', action: () => alert('Políticas de devoluciones') },
    ]
  },
];

const sociales = [
  { icon: FiInstagram, link: 'https://instagram.com' },
  { icon: FiFacebook,  link: 'https://facebook.com' },
  { icon: FiTwitter,   link: 'https://twitter.com' },
  { icon: FiYoutube,   link: 'https://youtube.com' },
];

function ContactForm() {
  const [form, setForm]       = useState({ nombre: '', email: '', mensaje: '' });
  const [estado, setEstado]   = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    setEstado('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre:  form.nombre,
          email:   form.email,
          mensaje: form.mensaje,
        },
        EMAILJS_PUBLIC_KEY
      );

      setEstado('success');
      setForm({ nombre: '', email: '', mensaje: '' });

      setTimeout(() => setEstado('idle'), 4000);

    } catch (error) {
      console.error('EmailJS error:', error);
      setEstado('error');
      setTimeout(() => setEstado('idle'), 4000);
    }
  };

  return (
    <div className="vf-contact-section">

      <div className="vf-contact-header">
        <div className="vf-contact-badge">CONTACTO</div>
        <h2 className="vf-contact-title">
          Disponible para proyectos freelance,<br />
          <span className="vf-contact-title-accent">
            consultoría y capacitaciones
          </span>
        </h2>
      </div>

      <div className="vf-contact-form-box">

        {/* Nombre + Email */}
        <div className="row g-3 mb-3">
          <div className="col-md-6 col-12">
            <label className="vf-form-label">NOMBRE COMPLETO</label>
            <input
              className="vf-form-input"
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              disabled={estado === 'loading'}
            />
          </div>
          <div className="col-md-6 col-12">
            <label className="vf-form-label">EMAIL</label>
            <input
              className="vf-form-input"
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              disabled={estado === 'loading'}
            />
          </div>
        </div>

        {/* Mensaje */}
        <div className="mb-3">
          <label className="vf-form-label">MENSAJE</label>
          <textarea
            className="vf-form-input vf-form-textarea"
            name="mensaje"
            placeholder="Cuéntame sobre tu proyecto..."
            value={form.mensaje}
            onChange={handleChange}
            disabled={estado === 'loading'}
            rows={5}
          />
        </div>

        {/* Botón */}
        <button
          className={`vf-form-submit w-100 estado-${estado}`}
          onClick={handleSubmit}
          disabled={estado === 'loading' || estado === 'success'}
        >
          {estado === 'idle' && (
            <><FiSend size={16} /> Enviar Mensaje</>
          )}
          {estado === 'loading' && (
            <><span className="vf-spinner" /> Enviando...</>
          )}
          {estado === 'success' && (
            <><FiCheckCircle size={16} /> ¡Mensaje enviado!</>
          )}
          {estado === 'error' && (
            <><FiSend size={16} /> Error — Intentar de nuevo</>
          )}
        </button>

      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="vf-footer" id="contacto">
      <div className="vf-footer-glow" />

      <div className="vf-footer-inner">

        {/* Formulario */}
        <ContactForm />

        <div className="vf-footer-separator" />

        {/* Top */}
        <div className="vf-footer-top">
          <div className="vf-footer-brand fade-up">
            <div className="vf-footer-logo">
              <div className="vf-footer-logo-box">VF</div>
              <span className="vf-footer-logo-text">VendeFácil</span>
            </div>
            <p className="vf-footer-desc">
              Tu tienda de tecnología premium y dispositivos digitales
              diseñados para una experiencia moderna, elegante y profesional.
            </p>
            <div className="vf-footer-contact-list">
              {contactos.map((c, i) => (
                <button key={i} className="vf-footer-contact" onClick={c.action}>
                  {c.text}
                </button>
              ))}
            </div>
          </div>

          <div className="vf-footer-links-container fade-up">
            {columnas.map((col, i) => (
              <div key={i} className="vf-footer-column">
                <h4 className="vf-footer-col-title">{col.title}</h4>
                {col.links.map((l, j) => (
                  <button key={j} className="vf-footer-link" onClick={l.action}>
                    {l.label} <FiArrowUpRight />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="vf-footer-newsletter fade-up">
          <div>
            <h3>Suscríbete a novedades exclusivas</h3>
            <p>Recibe ofertas, lanzamientos y tecnología premium.</p>
          </div>
          <div className="vf-footer-input-box">
            <input type="email" placeholder="Ingresa tu correo" />
            <button><FiSend /></button>
          </div>
        </div>

        {/* Bottom */}
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