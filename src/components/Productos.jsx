import React, { useState } from 'react';

import {
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiEye,
  FiFilter,
  FiX,
  FiTrash2,
  FiCreditCard,
  FiSmartphone,
  FiDollarSign,
  FiCheckCircle
} from 'react-icons/fi';

import '../styles/Productos.css';

const productos = [

  {
    id:1,
    nombre:'Smartwatch Elite Pro X',
    precio:349,
    categoria:'SMARTWATCH',
    reviews:'4.8 (120 reseñas)',
    emoji:'⌚',
    desc:'GPS integrado y batería extrema.',
    badge:'DESTACADO',
    badgeColor:'#2563eb',
  },

  {
    id:2,
    nombre:'Aura Wireless Noise Canceling',
    precio:299,
    categoria:'AUDIO',
    reviews:'4.9 (98 reseñas)',
    emoji:'🎧',
    desc:'Audio premium y cancelación de ruido.',
    badge:'NUEVO',
    badgeColor:'#10b981',
  },

  {
    id:3,
    nombre:'VendeFácil UltraBook Pro',
    precio:1299,
    categoria:'LAPTOP',
    reviews:'4.7 (55 reseñas)',
    emoji:'💻',
    desc:'Potencia extrema para productividad.',
    badge:'TOP VENTAS',
    badgeColor:'#f97316',
  },

  {
    id:4,
    nombre:'Nexus Infinity Fold',
    precio:1399,
    categoria:'SMARTPHONE',
    reviews:'4.6 (77 reseñas)',
    emoji:'📱',
    desc:'Pantalla AMOLED plegable futurista.',
    badge:'EXCLUSIVO',
    badgeColor:'#8b5cf6',
  },

];

const metodosPago = [

  {
    id:1,
    nombre:'Tarjeta',
    icon:<FiCreditCard />,
    color:'#2563eb'
  },

  {
    id:2,
    nombre:'Yape / Plin',
    icon:<FiSmartphone />,
    color:'#10b981'
  },

  {
    id:3,
    nombre:'Transferencia',
    icon:<FiDollarSign />,
    color:'#f97316'
  }

];

function ProductCard({ p, addToCart }) {

  const [liked, setLiked] = useState(false);

  return (

    <div className="vf-product-card fade-up">

      <div className="vf-product-img">

        <div
          className="vf-product-glow"
          style={{
            background:`${p.badgeColor}20`
          }}
        ></div>

        <span
          className="vf-product-badge"
          style={{
            background:p.badgeColor
          }}
        >
          {p.badge}
        </span>

        <button
          type="button"
          className={`vf-product-like ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
        >

          <FiHeart
            fill={liked ? '#ef4444' : 'none'}
          />

        </button>

        <span className="vf-product-emoji">
          {p.emoji}
        </span>

      </div>

      <div className="vf-product-body">

        <span className="vf-product-cat">
          {p.categoria}
        </span>

        <h3 className="vf-product-name">
          {p.nombre}
        </h3>

        <p className="vf-product-desc">
          {p.desc}
        </p>

        <div className="vf-product-reviews">

          <FiStar
            size={14}
            color="#fbbf24"
            fill="#fbbf24"
          />

          <span>
            {p.reviews}
          </span>

        </div>

        <div className="vf-product-footer">

          <span className="vf-product-price">
            S/ {p.precio}
          </span>

          <div className="vf-product-actions">

            <button
              type="button"
              className="vf-btn-view"
              onClick={() => alert(`Viendo ${p.nombre}`)}
            >

              <FiEye />

            </button>

            <button
              type="button"
              className="vf-btn-add"
              onClick={() => addToCart(p)}
            >

              <FiShoppingCart />

              Comprar

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function Productos() {

  const [filter, setFilter] = useState('TODOS');

  const [cart, setCart] = useState([]);

  const [openCart, setOpenCart] = useState(false);

  const [metodoPago, setMetodoPago] = useState(null);

  const categorias = [
    'TODOS',
    'SMARTWATCH',
    'AUDIO',
    'LAPTOP',
    'SMARTPHONE'
  ];

  const filtrados = filter === 'TODOS'
    ? productos
    : productos.filter(p => p.categoria === filter);

  const addToCart = (product) => {

    setCart(prevCart => {

      const existe = prevCart.find(
        item => item.id === product.id
      );

      if(existe){

        return prevCart.map(item =>

          item.id === product.id
            ? {
                ...item,
                cantidad:item.cantidad + 1
              }
            : item

        );

      }

      return [
        ...prevCart,
        {
          ...product,
          cantidad:1
        }
      ];

    });

    setOpenCart(true);

  };

  const removeFromCart = (id) => {

    setCart(prevCart =>
      prevCart.filter(item => item.id !== id)
    );

  };

  const totalProductos = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const total = cart.reduce(
    (total, item) =>
      total + (item.precio * item.cantidad),
    0
  );

  const finalizarCompra = () => {

    if(!metodoPago){

      alert('Selecciona un método de pago');

      return;

    }

    alert(`Compra realizada con ${metodoPago.nombre}`);

    setCart([]);

    setMetodoPago(null);

    setOpenCart(false);

  };

  return (

    <section
      className="vf-productos"
      id="productos"
    >

      {/* BOTON CARRITO */}

      <button
        type="button"
        className="vf-floating-cart"
        onClick={() => setOpenCart(true)}
      >

        <FiShoppingCart />

        <span>
          {totalProductos}
        </span>

      </button>

      {/* SIDEBAR */}

      <div className={`vf-cart-sidebar ${openCart ? 'active' : ''}`}>

        <div className="vf-cart-header">

          <h3>
            Mi Carrito
          </h3>

          <button
            type="button"
            onClick={() => setOpenCart(false)}
          >

            <FiX />

          </button>

        </div>

        <div className="vf-cart-items">

          {cart.length === 0 ? (

            <p className="vf-empty-cart">
              No hay productos
            </p>

          ) : (

            cart.map(item => (

              <div
                key={item.id}
                className="vf-cart-item"
              >

                <div className="vf-cart-item-left">

                  <span className="vf-cart-emoji">
                    {item.emoji}
                  </span>

                  <div>

                    <h4>
                      {item.nombre}
                    </h4>

                    <span>
                      Cantidad: {item.cantidad}
                    </span>

                  </div>

                </div>

                <div className="vf-cart-item-right">

                  <strong>
                    S/ {item.precio * item.cantidad}
                  </strong>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >

                    <FiTrash2 />

                  </button>

                </div>

              </div>

            ))

          )}

          {/* METODOS DE PAGO */}

          {cart.length > 0 && (

            <div className="vf-cart-payments">

              <h4>
                Método de Pago
              </h4>

              <div className="vf-payment-grid">

                {metodosPago.map(m => (

                  <button
                    key={m.id}
                    type="button"
                    className={`vf-payment-btn ${
                      metodoPago?.id === m.id
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => setMetodoPago(m)}
                  >

                    <div
                      className="vf-payment-icon"
                      style={{
                        color:m.color
                      }}
                    >

                      {m.icon}

                    </div>

                    <span>
                      {m.nombre}
                    </span>

                    {metodoPago?.id === m.id && (
                      <FiCheckCircle className="vf-payment-check" />
                    )}

                  </button>

                ))}

              </div>

            </div>

          )}

        </div>

        <div className="vf-cart-footer">

          <h2>
            Total: S/ {total}
          </h2>

          <button
            type="button"
            className="vf-checkout-btn"
            onClick={finalizarCompra}
          >

            Finalizar Compra

          </button>

        </div>

      </div>

      {/* HEADER */}

      <div className="vf-productos-header fade-up">

        <span className="vf-products-badge">
          PRODUCTOS PREMIUM
        </span>

        <h2>
          Tecnología Diseñada para el Futuro
        </h2>

      </div>

      {/* FILTROS */}

      <div className="vf-product-filters fade-up">

        <FiFilter />

        {categorias.map((cat, i) => (

          <button
            type="button"
            key={i}
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >

            {cat}

          </button>

        ))}

      </div>

      {/* GRID */}

      <div className="vf-products-grid">

        {filtrados.map(p => (

          <ProductCard
            key={p.id}
            p={p}
            addToCart={addToCart}
          />

        ))}

      </div>

    </section>
  );
}