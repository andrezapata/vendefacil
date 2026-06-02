import React, { useState } from 'react';
import {
  FiStar, FiShoppingCart, FiHeart,
  FiFilter, FiX, FiTrash2, FiCreditCard,
  FiSmartphone, FiDollarSign, FiCheckCircle,
  FiLock, FiArrowRight, FiCopy, FiFileText,
  FiHome, FiPrinter, FiEdit2, FiSave
} from 'react-icons/fi';
import '../styles/Productos.css';

const productos = [
  { id:1, nombre:'Smartwatch Elite Pro X',        precio:349,  categoria:'SMARTWATCH', reviews:'4.8 (120 reseñas)', emoji:'⌚', desc:'GPS integrado y batería extrema.',       badge:'DESTACADO',  badgeColor:'#2563eb' },
  { id:2, nombre:'Aura Wireless Noise Canceling', precio:299,  categoria:'AUDIO',      reviews:'4.9 (98 reseñas)',  emoji:'🎧', desc:'Audio premium y cancelación de ruido.', badge:'NUEVO',      badgeColor:'#10b981' },
  { id:3, nombre:'VendeFácil UltraBook Pro',       precio:1299, categoria:'LAPTOP',     reviews:'4.7 (55 reseñas)',  emoji:'💻', desc:'Potencia extrema para productividad.',  badge:'TOP VENTAS', badgeColor:'#f97316' },
  { id:4, nombre:'Nexus Infinity Fold',            precio:1399, categoria:'SMARTPHONE', reviews:'4.6 (77 reseñas)',  emoji:'📱', desc:'Pantalla AMOLED plegable futurista.',   badge:'EXCLUSIVO',  badgeColor:'#8b5cf6' },
];

const generarBoleta = () => 'VF-' + Date.now().toString().slice(-8);
const getFecha = () => {
  const now = new Date();
  return now.toLocaleDateString('es-PE', { day:'2-digit', month:'long', year:'numeric' })
    + ' — ' + now.toLocaleTimeString('es-PE', { hour:'2-digit', minute:'2-digit' });
};

function ModalBoleta({ boleta, onClose }) {
  const handleInicio = () => { onClose(); window.scrollTo({ top:0, behavior:'smooth' }); };
  return (
    <div className="vf-modal-overlay" onClick={onClose}>
      <div className="vf-modal vf-boleta-modal" onClick={e => e.stopPropagation()}>
        <button className="vf-modal-close" onClick={onClose}><FiX /></button>
        <div className="vf-boleta-header">
          <div className="vf-boleta-logo">
            <div className="vf-boleta-logo-box">VF</div>
            <span>VendeFácil</span>
          </div>
          <div className="vf-boleta-titulo">
            <h3>BOLETA DE VENTA</h3>
            <span className="vf-boleta-num">N° {boleta.numero}</span>
          </div>
        </div>
        <div className="vf-boleta-divider" />
        <div className="vf-boleta-info-grid">
          <div className="vf-boleta-info-item"><span>Fecha y hora</span><strong>{boleta.fecha}</strong></div>
          <div className="vf-boleta-info-item"><span>Método de pago</span><strong>{boleta.metodo}</strong></div>
          <div className="vf-boleta-info-item"><span>Estado</span><strong className="vf-boleta-estado"><FiCheckCircle size={13} /> Pagado</strong></div>
          <div className="vf-boleta-info-item"><span>Vendedor</span><strong>VendeFácil Store</strong></div>
        </div>
        <div className="vf-boleta-divider" />
        <h4 className="vf-boleta-subtitulo">Detalle de Productos</h4>
        <div className="vf-boleta-items">
          {boleta.items.map((item, i) => (
            <div key={i} className="vf-boleta-item">
              <span className="vf-boleta-item-emoji">{item.emoji}</span>
              <div className="vf-boleta-item-info">
                <strong>{item.nombre}</strong>
                <span>Cant: {item.cantidad} x S/ {item.precio}</span>
              </div>
              <strong className="vf-boleta-item-total">S/ {item.precio * item.cantidad}</strong>
            </div>
          ))}
        </div>
        <div className="vf-boleta-divider" />
        <div className="vf-boleta-totales">
          <div className="vf-boleta-total-row"><span>Subtotal</span><span>S/ {boleta.total}</span></div>
          <div className="vf-boleta-total-row"><span>Envio</span><span className="vf-boleta-gratis">Gratis</span></div>
          <div className="vf-boleta-total-row vf-boleta-total-final"><strong>TOTAL</strong><strong>S/ {boleta.total}</strong></div>
        </div>
        <div className="vf-boleta-divider" />
        <p className="vf-boleta-gracias">Gracias por tu compra! <br /><span>Recibiras tu pedido en 2-5 dias habiles.</span></p>
        <div className="vf-boleta-btns">
          <button className="vf-boleta-btn-print" onClick={() => window.print()}><FiPrinter size={15} /> Imprimir Boleta</button>
          <button className="vf-boleta-btn-inicio" onClick={handleInicio}><FiHome size={15} /> Volver al Inicio</button>
        </div>
      </div>
    </div>
  );
}

function ModalExito({ boleta, onVerBoleta, onClose }) {
  const handleInicio = () => { onClose(); window.scrollTo({ top:0, behavior:'smooth' }); };
  return (
    <div className="vf-modal-overlay" onClick={onClose}>
      <div className="vf-modal" onClick={e => e.stopPropagation()}>
        <button className="vf-modal-close" onClick={onClose}><FiX /></button>
        <div className="vf-modal-success">
          <div className="vf-success-icon"><FiCheckCircle /></div>
          <h3>Pago Exitoso!</h3>
          <p>Tu compra fue procesada correctamente.</p>
          <p style={{ color:'#64748b', fontSize:12, marginTop:4 }}>Boleta N° {boleta.numero}</p>
          <div className="vf-exito-btns">
            <button className="vf-boleta-btn-ver" onClick={onVerBoleta}><FiFileText size={15} /> Ver Boleta</button>
            <button className="vf-boleta-btn-inicio" onClick={handleInicio}><FiHome size={15} /> Volver al Inicio</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalTarjeta({ total, items, onClose, onPagar }) {
  const [card, setCard]     = useState({ numero:'', nombre:'', expiry:'', cvv:'' });
  const [fase, setFase]     = useState('form');
  const [boleta, setBoleta] = useState(null);
  const formatNumero = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = (v) => { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? d.slice(0,2)+'/'+d.slice(2) : d; };
  const handlePagar = () => {
    if(!card.numero || !card.nombre || !card.expiry || !card.cvv) { alert('Completa todos los campos'); return; }
    const b = { numero: generarBoleta(), fecha: getFecha(), metodo: 'Tarjeta de Credito/Debito', total, items };
    setBoleta(b); setFase('exito'); onPagar(b);
  };
  if(fase === 'boleta' && boleta) return <ModalBoleta boleta={boleta} onClose={onClose} />;
  if(fase === 'exito'  && boleta) return <ModalExito boleta={boleta} onVerBoleta={() => setFase('boleta')} onClose={onClose} />;
  return (
    <div className="vf-modal-overlay" onClick={onClose}>
      <div className="vf-modal" onClick={e => e.stopPropagation()}>
        <button className="vf-modal-close" onClick={onClose}><FiX /></button>
        <div className="vf-modal-header">
          <div className="vf-modal-icon" style={{ background:'rgba(37,99,235,0.15)', color:'#2563eb' }}><FiCreditCard size={24} /></div>
          <div><h3>Pago con Tarjeta</h3><p>Visa, Mastercard o American Express</p></div>
        </div>
        <div className="vf-card-preview">
          <div className="vf-card-preview-top"><span>VendeFacil</span><FiCreditCard size={22} /></div>
          <div className="vf-card-number-preview">{card.numero || 'xxxx xxxx xxxx xxxx'}</div>
          <div className="vf-card-preview-bottom">
            <div><span>Titular</span><strong>{card.nombre || 'NOMBRE APELLIDO'}</strong></div>
            <div><span>Vence</span><strong>{card.expiry || 'MM/AA'}</strong></div>
          </div>
        </div>
        <div className="vf-modal-form">
          <div className="vf-modal-field">
            <label>NUMERO DE TARJETA</label>
            <input placeholder="1234 5678 9012 3456" value={card.numero} onChange={e => setCard({...card, numero: formatNumero(e.target.value)})} />
          </div>
          <div className="vf-modal-field">
            <label>NOMBRE EN LA TARJETA</label>
            <input placeholder="Como aparece en la tarjeta" value={card.nombre} onChange={e => setCard({...card, nombre: e.target.value.toUpperCase()})} />
          </div>
          <div className="vf-modal-row">
            <div className="vf-modal-field">
              <label>VENCIMIENTO</label>
              <input placeholder="MM/AA" value={card.expiry} onChange={e => setCard({...card, expiry: formatExpiry(e.target.value)})} />
            </div>
            <div className="vf-modal-field">
              <label>CVV</label>
              <input placeholder="..." type="password" maxLength={4} value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value.replace(/\D/g,'').slice(0,4)})} />
            </div>
          </div>
          <div className="vf-modal-secure"><FiLock size={12} /> Pago 100% seguro y encriptado</div>
          <button className="vf-modal-pay-btn" onClick={handlePagar}>Pagar S/ {total} <FiArrowRight /></button>
        </div>
      </div>
    </div>
  );
}

function ModalYape({ total, items, onClose, onPagar }) {
  const [fase, setFase]           = useState('form');
  const [boleta, setBoleta]       = useState(null);
  const [editando, setEditando]   = useState(false);
  const [numero, setNumero]       = useState('+51 901 329 855');
  const [tmpNumero, setTmpNumero] = useState(numero);

  const guardarNumero = () => { setNumero(tmpNumero); setEditando(false); };
  const copiar = (texto) => { navigator.clipboard.writeText(texto); alert('Copiado: ' + texto); };
  const confirmar = () => {
    const b = { numero: generarBoleta(), fecha: getFecha(), metodo: 'Yape / Plin', total, items };
    setBoleta(b); setFase('exito'); onPagar(b);
  };

  if(fase === 'boleta' && boleta) return <ModalBoleta boleta={boleta} onClose={onClose} />;
  if(fase === 'exito'  && boleta) return <ModalExito boleta={boleta} onVerBoleta={() => setFase('boleta')} onClose={onClose} />;

  return (
    <div className="vf-modal-overlay" onClick={onClose}>
      <div className="vf-modal" onClick={e => e.stopPropagation()}>
        <button className="vf-modal-close" onClick={onClose}><FiX /></button>
        <div className="vf-modal-header">
          <div className="vf-modal-icon" style={{ background:'rgba(16,185,129,0.15)', color:'#10b981' }}><FiSmartphone size={24} /></div>
          <div><h3>Yape / Plin</h3><p>Pago rapido desde tu celular</p></div>
        </div>
        <div className="vf-yape-box">
          <div className="vf-qr-placeholder">
            <div className="vf-qr-inner"><span style={{ fontSize:48 }}>📱</span><p>QR de Pago</p></div>
          </div>
          <div className="vf-yape-info">
            <p className="vf-yape-label">Yapea o Plinea al numero:</p>
            {editando ? (
              <div className="vf-editable-row">
                <input className="vf-editable-input" value={tmpNumero} onChange={e => setTmpNumero(e.target.value)} placeholder="+51 999 999 999" autoFocus />
                <button className="vf-editable-save" onClick={guardarNumero}><FiSave size={14} /> Guardar</button>
              </div>
            ) : (
              <div className="vf-yape-numero">
                <strong>{numero}</strong>
                <button onClick={() => copiar(numero)} title="Copiar"><FiCopy size={14} /></button>
                <button onClick={() => { setTmpNumero(numero); setEditando(true); }} title="Editar"><FiEdit2 size={14} /></button>
              </div>
            )}
            <p className="vf-yape-monto">Monto exacto: <strong style={{ color:'#10b981' }}>S/ {total}</strong></p>
            <p className="vf-yape-hint">Copia el numero, abre Yape o Plin y envia el monto exacto.</p>
          </div>
        </div>
        <div className="vf-modal-secure"><FiLock size={12} /> Verifica el monto antes de enviar</div>
        <button className="vf-modal-pay-btn" style={{ background:'linear-gradient(135deg, #10b981, #059669)' }} onClick={confirmar}>
          Ya realice el pago <FiCheckCircle />
        </button>
      </div>
    </div>
  );
}

function ModalTransferencia({ total, items, onClose, onPagar }) {
  const [fase, setFase]         = useState('form');
  const [boleta, setBoleta]     = useState(null);
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState([
    { label:'Banco',   valor:'BCP',                     copiable:false },
    { label:'Cuenta',  valor:'193-12345678-0-12',        copiable:true  },
    { label:'CCI',     valor:'00219300123456780120',     copiable:true  },
    { label:'Titular', valor:'Andre Bryan Zapata Vega',  copiable:false },
  ]);
  const [tmpDatos, setTmpDatos] = useState(datos);

  const guardarDatos = () => { setDatos(tmpDatos); setEditando(false); };
  const cancelar     = () => { setTmpDatos(datos); setEditando(false); };
  const copiar = (label, valor) => { navigator.clipboard.writeText(valor); alert(label + ' copiado: ' + valor); };
  const confirmar = () => {
    const b = { numero: generarBoleta(), fecha: getFecha(), metodo: 'Transferencia Bancaria ' + datos[0].valor, total, items };
    setBoleta(b); setFase('exito'); onPagar(b);
  };

  if(fase === 'boleta' && boleta) return <ModalBoleta boleta={boleta} onClose={onClose} />;
  if(fase === 'exito'  && boleta) return <ModalExito boleta={boleta} onVerBoleta={() => setFase('boleta')} onClose={onClose} />;

  return (
    <div className="vf-modal-overlay" onClick={onClose}>
      <div className="vf-modal" onClick={e => e.stopPropagation()}>
        <button className="vf-modal-close" onClick={onClose}><FiX /></button>
        <div className="vf-modal-header">
          <div className="vf-modal-icon" style={{ background:'rgba(249,115,22,0.15)', color:'#f97316' }}><FiDollarSign size={24} /></div>
          <div><h3>Transferencia Bancaria</h3><p>Deposito a nuestra cuenta {datos[0].valor}</p></div>
        </div>

        {!editando && (
          <button className="vf-editar-datos-btn" onClick={() => { setTmpDatos(datos); setEditando(true); }}>
            <FiEdit2 size={13} /> Editar datos bancarios
          </button>
        )}

        {editando ? (
          <div className="vf-transfer-edit-box">
            {tmpDatos.map((d, i) => (
              <div key={i} className="vf-transfer-edit-row">
                <label>{d.label}</label>
                <input
                  className="vf-editable-input"
                  value={d.valor}
                  onChange={e => {
                    const nuevo = [...tmpDatos];
                    nuevo[i] = { ...nuevo[i], valor: e.target.value };
                    setTmpDatos(nuevo);
                  }}
                />
              </div>
            ))}
            <div className="vf-transfer-edit-btns">
              <button className="vf-editable-save" onClick={guardarDatos}><FiSave size={13} /> Guardar</button>
              <button className="vf-editable-cancel" onClick={cancelar}><FiX size={13} /> Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="vf-transfer-box">
            {datos.map((d, i) => (
              <div key={i} className="vf-transfer-row">
                <span className="vf-transfer-label">{d.label}</span>
                <div className="vf-transfer-valor">
                  <strong>{d.valor}</strong>
                  {d.copiable && (
                    <button onClick={() => copiar(d.label, d.valor)}><FiCopy size={13} /></button>
                  )}
                </div>
              </div>
            ))}
            <div className="vf-transfer-row">
              <span className="vf-transfer-label">Monto</span>
              <div className="vf-transfer-valor"><strong style={{ color:'#f97316' }}>S/ {total}</strong></div>
            </div>
          </div>
        )}

        <p className="vf-transfer-hint">Copia el numero de cuenta o CCI, realiza la transferencia y luego confirma aqui.</p>
        <div className="vf-modal-secure"><FiLock size={12} /> Datos bancarios verificados y seguros</div>
        <button className="vf-modal-pay-btn" style={{ background:'linear-gradient(135deg, #f97316, #ea580c)' }} onClick={confirmar}>
          Confirmar Transferencia <FiCheckCircle />
        </button>
      </div>
    </div>
  );
}

function ProductCard({ p, addToCart }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const handleAdd = () => { addToCart(p); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  return (
    <div className="vf-product-card fade-up">
      <div className="vf-product-img">
        <div className="vf-product-glow" style={{ background:`${p.badgeColor}20` }} />
        <span className="vf-product-badge" style={{ background:p.badgeColor }}>{p.badge}</span>
        <button type="button" className={`vf-product-like ${liked ? 'liked':''}`} onClick={() => setLiked(!liked)}>
          <FiHeart fill={liked ? '#ef4444':'none'} />
        </button>
        <span className="vf-product-emoji">{p.emoji}</span>
      </div>
      <div className="vf-product-body">
        <span className="vf-product-cat">{p.categoria}</span>
        <h3 className="vf-product-name">{p.nombre}</h3>
        <p className="vf-product-desc">{p.desc}</p>
        <div className="vf-product-reviews">
          <FiStar size={14} color="#fbbf24" fill="#fbbf24" />
          <span>{p.reviews}</span>
        </div>
        <div className="vf-product-footer">
          <span className="vf-product-price">S/ {p.precio}</span>
          <button type="button" className={`vf-btn-add ${added ? 'added':''}`} onClick={handleAdd}>
            <FiShoppingCart />
            {added ? 'Anadido!' : 'Anadir al Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Productos() {
  const [filter, setFilter]       = useState('TODOS');
  const [cart, setCart]           = useState([]);
  const [openCart, setOpenCart]   = useState(false);
  const [modalPago, setModalPago] = useState(null);

  const categorias = ['TODOS','SMARTWATCH','AUDIO','LAPTOP','SMARTPHONE'];
  const filtrados  = filter === 'TODOS' ? productos : productos.filter(p => p.categoria === filter);

  const addToCart = (product) => {
    setCart(prev => {
      const existe = prev.find(i => i.id === product.id);
      if(existe) return prev.map(i => i.id === product.id ? {...i, cantidad:i.cantidad+1} : i);
      return [...prev, {...product, cantidad:1}];
    });
    setOpenCart(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const totalProductos = cart.reduce((t,i) => t + i.cantidad, 0);
  const total          = cart.reduce((t,i) => t + (i.precio * i.cantidad), 0);
  const onPagar        = () => { setCart([]); setOpenCart(false); };

  return (
    <section className="vf-productos" id="productos">
      {modalPago === 'tarjeta'       && <ModalTarjeta       total={total} items={cart} onClose={() => setModalPago(null)} onPagar={onPagar} />}
      {modalPago === 'yape'          && <ModalYape          total={total} items={cart} onClose={() => setModalPago(null)} onPagar={onPagar} />}
      {modalPago === 'transferencia' && <ModalTransferencia total={total} items={cart} onClose={() => setModalPago(null)} onPagar={onPagar} />}

      <button type="button" className="vf-floating-cart" onClick={() => setOpenCart(true)}>
        <FiShoppingCart /><span>{totalProductos}</span>
      </button>

      <div className={`vf-cart-sidebar ${openCart ? 'active':''}`}>
        <div className="vf-cart-header">
          <h3>Mi Carrito</h3>
          <button type="button" onClick={() => setOpenCart(false)}><FiX /></button>
        </div>
        <div className="vf-cart-items">
          {cart.length === 0 ? (
            <div className="vf-empty-cart"><span style={{ fontSize:40 }}>🛒</span><p>Tu carrito esta vacio</p></div>
          ) : cart.map(item => (
            <div key={item.id} className="vf-cart-item">
              <div className="vf-cart-item-left">
                <span className="vf-cart-emoji">{item.emoji}</span>
                <div><h4>{item.nombre}</h4><span>Cantidad: {item.cantidad}</span></div>
              </div>
              <div className="vf-cart-item-right">
                <strong>S/ {item.precio * item.cantidad}</strong>
                <button type="button" onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="vf-cart-payments">
            <h4>Elige como pagar</h4>
            <div className="vf-payment-grid">
              <button className="vf-payment-btn" onClick={() => { setOpenCart(false); setModalPago('tarjeta'); }}>
                <div className="vf-payment-icon" style={{ color:'#2563eb' }}><FiCreditCard /></div>
                <span>Tarjeta</span>
              </button>
              <button className="vf-payment-btn" onClick={() => { setOpenCart(false); setModalPago('yape'); }}>
                <div className="vf-payment-icon" style={{ color:'#10b981' }}><FiSmartphone /></div>
                <span>Yape / Plin</span>
              </button>
              <button className="vf-payment-btn" onClick={() => { setOpenCart(false); setModalPago('transferencia'); }}>
                <div className="vf-payment-icon" style={{ color:'#f97316' }}><FiDollarSign /></div>
                <span>Transferencia</span>
              </button>
            </div>
          </div>
        )}
        <div className="vf-cart-footer">
          <h2>Total: S/ {total}</h2>
          <p style={{ color:'#94a3b8', fontSize:12, marginBottom:12 }}>Selecciona un metodo de pago arriba</p>
        </div>
      </div>

      {openCart && <div className="vf-cart-overlay" onClick={() => setOpenCart(false)} />}

      <div className="vf-productos-header fade-up">
        <span className="vf-products-badge">PRODUCTOS PREMIUM</span>
        <h2>Tecnologia Disenada para el Futuro</h2>
      </div>

      <div className="vf-product-filters fade-up">
        <FiFilter />
        {categorias.map((cat, i) => (
          <button type="button" key={i} className={filter === cat ? 'active':''} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>

      <div className="vf-products-grid">
        {filtrados.map(p => <ProductCard key={p.id} p={p} addToCart={addToCart} />)}
      </div>
    </section>
  );
}