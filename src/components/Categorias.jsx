import React, { useState } from 'react';
import {
  FiMonitor, FiSmartphone, FiHeadphones,
  FiTablet, FiArrowRight, FiX, FiStar,
  FiShoppingCart, FiHeart
} from 'react-icons/fi';
import '../styles/Categorias.css';

// ── PRODUCTOS POR CATEGORÍA ───────────────────────────────
const productosPorCategoria = {
  'Computación': [
    { id:1,  emoji:'💻', nombre:'VendeFácil UltraBook Pro',    precio:1299, badge:'TOP VENTAS', badgeColor:'#f97316', reviews:'4.7 (55)',  desc:'i7 13va Gen, 16GB RAM, SSD 512GB'     },
    { id:2,  emoji:'🖥️', nombre:'Monitor Curvo 32" 4K',        precio:899,  badge:'NUEVO',      badgeColor:'#10b981', reviews:'4.8 (32)',  desc:'144Hz, HDR, panel IPS profesional'    },
    { id:3,  emoji:'⌨️', nombre:'Teclado Mecánico RGB Pro',    precio:189,  badge:'POPULAR',    badgeColor:'#2563eb', reviews:'4.9 (210)', desc:'Switches Cherry MX, retroiluminado'   },
    { id:4,  emoji:'🖱️', nombre:'Mouse Inalámbrico Elite',     precio:129,  badge:'DESTACADO',  badgeColor:'#8b5cf6', reviews:'4.6 (88)',  desc:'DPI ajustable, batería 70h'           },
    { id:5,  emoji:'💾', nombre:'SSD NVMe 1TB Ultra Speed',    precio:219,  badge:'OFERTA',     badgeColor:'#ef4444', reviews:'4.8 (145)', desc:'7000MB/s lectura, PCIe Gen4'          },
    { id:6,  emoji:'🖨️', nombre:'Impresora Multifuncional Pro',precio:349,  badge:'NUEVO',      badgeColor:'#10b981', reviews:'4.5 (67)',  desc:'WiFi, doble cara automática, color'   },
  ],
  'Smartphones': [
    { id:7,  emoji:'📱', nombre:'Nexus Infinity Fold',          precio:1399, badge:'EXCLUSIVO',  badgeColor:'#8b5cf6', reviews:'4.6 (77)',  desc:'Pantalla plegable AMOLED 7.6"'       },
    { id:8,  emoji:'📲', nombre:'Galaxy Ultra X Pro',           precio:1199, badge:'TOP VENTAS', badgeColor:'#f97316', reviews:'4.8 (203)', desc:'Cámara 200MP, S-Pen integrado'        },
    { id:9,  emoji:'📵', nombre:'iPhone 15 Pro Max',            precio:1299, badge:'POPULAR',    badgeColor:'#2563eb', reviews:'4.9 (512)', desc:'Chip A17 Pro, Dynamic Island'         },
    { id:10, emoji:'📳', nombre:'Pixel 8 Pro Google',           precio:899,  badge:'NUEVO',      badgeColor:'#10b981', reviews:'4.7 (134)', desc:'IA integrada, cámara pro Tensor G3'   },
    { id:11, emoji:'📟', nombre:'Motorola Edge 40 Ultra',       precio:699,  badge:'OFERTA',     badgeColor:'#ef4444', reviews:'4.5 (89)',  desc:'165Hz, carga 125W, 5000mAh'          },
    { id:12, emoji:'☎️', nombre:'Xiaomi 14 Ultra',              precio:999,  badge:'DESTACADO',  badgeColor:'#8b5cf6', reviews:'4.8 (167)', desc:'Leica cámara, Snapdragon 8 Gen3'      },
  ],
  'Audio Premium': [
    { id:13, emoji:'🎧', nombre:'Aura Wireless Noise Canceling',precio:299,  badge:'NUEVO',      badgeColor:'#10b981', reviews:'4.9 (98)',  desc:'ANC líder, 40h batería, Hi-Res'      },
    { id:14, emoji:'🎵', nombre:'Sony WH-1000XM5',              precio:349,  badge:'TOP VENTAS', badgeColor:'#f97316', reviews:'4.9 (445)', desc:'Mejor ANC del mercado, LDAC'          },
    { id:15, emoji:'🎶', nombre:'AirPods Pro 2da Gen',          precio:249,  badge:'POPULAR',    badgeColor:'#2563eb', reviews:'4.8 (890)', desc:'ANC adaptivo, chip H2, spatial audio' },
    { id:16, emoji:'🔊', nombre:'Bose QuietComfort Ultra',      precio:329,  badge:'DESTACADO',  badgeColor:'#8b5cf6', reviews:'4.8 (234)', desc:'Immersive Audio, comodidad premium'   },
    { id:17, emoji:'🎤', nombre:'Micrófono USB Blue Yeti',      precio:149,  badge:'OFERTA',     badgeColor:'#ef4444', reviews:'4.7 (567)', desc:'Estudio profesional en casa'          },
    { id:18, emoji:'🔉', nombre:'Parlante JBL Charge 5',        precio:189,  badge:'NUEVO',      badgeColor:'#10b981', reviews:'4.8 (321)', desc:'360° sonido, resistente al agua IP67' },
  ],
  'Tablets': [
    { id:19, emoji:'📱', nombre:'iPad Pro M2 12.9"',            precio:1099, badge:'TOP VENTAS', badgeColor:'#f97316', reviews:'4.9 (678)', desc:'Chip M2, Liquid Retina XDR, 5G'      },
    { id:20, emoji:'🗒️', nombre:'Samsung Tab S9 Ultra',         precio:999,  badge:'EXCLUSIVO',  badgeColor:'#8b5cf6', reviews:'4.8 (234)', desc:'14.6" AMOLED, S-Pen incluido'        },
    { id:21, emoji:'📋', nombre:'Lenovo Tab P12 Pro',           precio:699,  badge:'NUEVO',      badgeColor:'#10b981', reviews:'4.7 (145)', desc:'12.6" AMOLED, Dolby Atmos'           },
    { id:22, emoji:'📓', nombre:'Xiaomi Pad 6 Pro',             precio:499,  badge:'POPULAR',    badgeColor:'#2563eb', reviews:'4.7 (198)', desc:'144Hz, Snapdragon 8+ Gen1'            },
    { id:23, emoji:'📔', nombre:'Huawei MatePad Pro 13.2"',     precio:799,  badge:'DESTACADO',  badgeColor:'#8b5cf6', reviews:'4.6 (87)',  desc:'OLED, M-Pencil 3ra Gen incluido'     },
    { id:24, emoji:'📒', nombre:'Amazon Fire Max 11',           precio:229,  badge:'OFERTA',     badgeColor:'#ef4444', reviews:'4.5 (445)', desc:'11" 2K, octa-core, Alexa integrada'   },
  ],
};

const categorias = [
  {
    icon: <FiMonitor size={26} />,
    label: 'Computación',
    sub: 'Laptops, Monitores y Periféricos',
    count: 6,
    color: '#2563eb'
  },
  {
    icon: <FiSmartphone size={26} />,
    label: 'Smartphones',
    sub: 'Todas las marcas premium',
    count: 6,
    color: '#06b6d4'
  },
  {
    icon: <FiHeadphones size={26} />,
    label: 'Audio Premium',
    sub: 'Sonido envolvente profesional',
    count: 6,
    color: '#f97316'
  },
  {
    icon: <FiTablet size={26} />,
    label: 'Tablets',
    sub: 'Trabajo y entretenimiento',
    count: 6,
    color: '#10b981'
  }
];

// ── MINI CARD dentro del modal ────────────────────────────
function MiniProductCard({
  p,
  agregarAlCarrito
}) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

const handleAdd = () => {
  agregarAlCarrito(p);

  setAdded(true);

  setTimeout(() => {
    setAdded(false);
  }, 1500);
};

  return (
    <div className="vf-mini-card">
      <div className="vf-mini-card-top">
        <span className="vf-mini-badge" style={{ background: p.badgeColor }}>{p.badge}</span>
        <button
          className={`vf-mini-like ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <FiHeart size={13} fill={liked ? '#ef4444' : 'none'} />
        </button>
        <div className="vf-mini-emoji">{p.emoji}</div>
      </div>
      <div className="vf-mini-body">
        <div className="vf-mini-name">{p.nombre}</div>
        <div className="vf-mini-desc">{p.desc}</div>
        <div className="vf-mini-reviews">
          <FiStar size={11} color="#fbbf24" fill="#fbbf24" />
          <span>{p.reviews}</span>
        </div>
        <div className="vf-mini-footer">
          <span className="vf-mini-price">S/ {p.precio}</span>
          <button
            className={`vf-mini-add ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            <FiShoppingCart size={12} />
            {added ? '¡Listo!' : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MODAL DE CATEGORÍA ────────────────────────────────────
function ModalCategoria({ cat, onClose, agregarAlCarrito }) {

  if (!cat) return null;

  const productos = productosPorCategoria[cat.label] || [];

  return (
    <div className="vf-cat-modal-overlay" onClick={onClose}>
      <div className="vf-cat-modal" onClick={(e) => e.stopPropagation()}>

        <div
          className="vf-cat-modal-header"
          style={{ borderBottom: `2px solid ${cat.color}30` }}
        >
          <div className="vf-cat-modal-title">
            <div
              className="vf-cat-modal-icon"
              style={{
                background: `${cat.color}18`,
                color: cat.color
              }}
            >
              {cat.icon}
            </div>

            <div>
              <h2>{cat.label}</h2>
              <p>{cat.sub}</p>
            </div>
          </div>

          <button
            className="vf-cat-modal-close"
            onClick={onClose}
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="vf-cat-modal-grid">
          {productos.map((p) => (
            <MiniProductCard
              key={p.id}
              p={p}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────
export default function Categorias() {
  const [catActiva, setCatActiva] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  return (
    <section className="vf-categorias" id="categorias">

      {/* Modal */}
      {catActiva && (
  <ModalCategoria
    cat={catActiva}
    onClose={() => setCatActiva(null)}
    agregarAlCarrito={agregarAlCarrito}
  />
)}
       


      <div className="vf-categorias-header fade-up">
        <span className="vf-cat-badge">CATEGORÍAS</span>
        <h2>Explora Tecnología de Última Generación</h2>
        <p>Descubre dispositivos premium diseñados para productividad, entretenimiento y estilo moderno.</p>
      </div>

      <div className="vf-categorias-grid">
        {categorias.map((cat, i) => (
          <div
            key={i}
            className="vf-cat-card fade-up"
            style={{ animationDelay:`${i * 0.12}s` }}
          >
            <div className="vf-cat-glow" style={{ background:`${cat.color}20` }} />
            <div className="vf-cat-icon-box" style={{ background:`${cat.color}15`, color:cat.color }}>
              {cat.icon}
            </div>
            <h3 className="vf-cat-label">{cat.label}</h3>
            <p className="vf-cat-sub">{cat.sub}</p>
            <div className="vf-cat-footer">
              <span className="vf-cat-count" style={{ color:cat.color }}>{cat.count} productos</span>
              <button
                className="vf-cat-btn"
                style={{ background:`${cat.color}15`, color:cat.color }}
                onClick={() => setCatActiva(cat)}
              >
                Ver Más <FiArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}