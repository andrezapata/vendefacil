import React, { useState, useEffect } from 'react';

import {
  FiShoppingCart,
  FiBell,
  FiSearch,
  FiMenu,
  FiX,
  FiUser
} from 'react-icons/fi';

import '../styles/Navbar.css';

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount] = useState(3);

  useEffect(() => {

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);

  }, []);

  const irA = (id) => {

    const section = document.getElementById(id);

    if(section){

      section.scrollIntoView({
        behavior:'smooth'
      });

      setMenuOpen(false);

    }

  };

  return (

    <nav className={`vf-navbar ${scrolled ? 'scrolled' : ''}`}>

      <div className="vf-navbar-inner">

        {/* LOGO */}

        <div
          className="vf-logo"
          onClick={() => irA('inicio')}
        >

          <div className="vf-logo-box">
            VF
          </div>

          <span className="vf-logo-text">
            VendeFácil
          </span>

        </div>

        {/* LINKS */}

        <div className={`vf-nav-links ${menuOpen ? 'active' : ''}`}>

          <button onClick={() => irA('inicio')}>
            Inicio
          </button>

          <button onClick={() => irA('categorias')}>
            Categorías
          </button>

          <button onClick={() => irA('productos')}>
            Productos
          </button>

          <button onClick={() => irA('beneficios')}>
            Beneficios
          </button>

          <button onClick={() => irA('pagos')}>
            Pagos
          </button>

          <button onClick={() => irA('contacto')}>
            Contacto
          </button>

        </div>

        {/* ACTIONS */}

        <div className="vf-nav-actions">

          {/* SEARCH */}

          <button
            className="vf-nav-icon-btn"
            onClick={() => alert('Buscador abierto')}
          >

            <FiSearch />

          </button>

          {/* NOTIFICATIONS */}

          <div className="vf-icon-wrapper">

            <button
              className="vf-nav-icon-btn"
              onClick={() => alert('No tienes nuevas notificaciones')}
            >

              <FiBell />

            </button>

            <span className="vf-notif-dot"></span>

          </div>

          {/* PROFILE */}

          <button
            className="vf-nav-icon-btn"
            onClick={() => alert('Perfil de usuario')}
          >

            <FiUser />

          </button>




            <span className="vf-cart-badge">
              {cartCount}
            </span>

          </div>

          {/* MOBILE BUTTON */}

          <button
            className="vf-mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >

            {menuOpen ? <FiX /> : <FiMenu />}

          </button>

        </div>


    </nav>
  );
}