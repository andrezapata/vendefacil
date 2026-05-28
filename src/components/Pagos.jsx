import React, { useState } from 'react';

import {
  FiCreditCard,
  FiSmartphone,
  FiShield,
  FiDollarSign,
  FiCheckCircle,
  FiShoppingCart
} from 'react-icons/fi';

import '../styles/Pagos.css';

const pagos = [

  {
    id:1,
    icon:<FiCreditCard />,
    titulo:'Tarjetas',
    desc:'Visa, Mastercard y American Express.',
    color:'#2563eb',
  },

  {
    id:2,
    icon:<FiSmartphone />,
    titulo:'Yape & Plin',
    desc:'Paga rápido desde tu celular.',
    color:'#10b981',
  },

  {
    id:3,
    icon:<FiDollarSign />,
    titulo:'Transferencia',
    desc:'Pagos bancarios seguros y rápidos.',
    color:'#f97316',
  },

  {
    id:4,
    icon:<FiShield />,
    titulo:'Pago Seguro',
    desc:'Protección avanzada en todas tus compras.',
    color:'#8b5cf6',
  },

];

export default function Pagos() {

  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const seleccionarMetodo = (metodo) => {

    setMetodoSeleccionado(metodo);

    setShowConfirm(true);

    setTimeout(() => {

      setShowConfirm(false);

    }, 3500);

  };

  return (

    <section
      className="vf-pagos"
      id="pagos"
    >

      {/* ALERTA */}

      {showConfirm && metodoSeleccionado && (

        <div className="vf-pago-alert">

          <FiCheckCircle />

          <span>
            Método seleccionado:
            {' '}
            <strong>
              {metodoSeleccionado.titulo}
            </strong>
          </span>

        </div>

      )}

      {/* HEADER */}

      <div className="vf-pagos-header fade-up">

        <span className="vf-pagos-badge">
          MÉTODOS DE PAGO
        </span>

        <h2>
          Compra Fácil y Segura
        </h2>

        <p>
          Elige tu método de pago favorito
          con máxima seguridad y rapidez.
        </p>

      </div>

      {/* GRID */}

      <div className="vf-pagos-grid">

        {pagos.map((p, i) => (

          <div
            key={i}
            className={`vf-pago-card fade-up ${
              metodoSeleccionado?.id === p.id
                ? 'active'
                : ''
            }`}
            style={{
              animationDelay:`${i * .1}s`
            }}
          >

            <div
              className="vf-pago-glow"
              style={{
                background:`${p.color}20`
              }}
            ></div>

            <div
              className="vf-pago-icon"
              style={{
                background:`${p.color}15`,
                color:p.color
              }}
            >

              {p.icon}

            </div>

            <h3>
              {p.titulo}
            </h3>

            <p>
              {p.desc}
            </p>

            <button
              type="button"
              className="vf-pago-btn"
              style={{
                background:p.color
              }}
              onClick={() => seleccionarMetodo(p)}
            >

              <FiShoppingCart />

              Seleccionar

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}