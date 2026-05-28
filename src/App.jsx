import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categorias from './components/Categorias';
import Productos from './components/Productos';
import Beneficios from './components/Beneficios';
import Pagos from './components/Pagos';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Categorias />
      <Productos />
      <Beneficios />
      <Pagos />
      <Footer />
    </div>
  );
}

export default App;