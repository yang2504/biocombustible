import React from 'react';

const FOOTER_NAV = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Únete', href: '#cta' },
];

const FOOTER_LEGAL = [
  { label: 'Política de privacidad', href: '#' },
  { label: 'Términos de uso', href: '#' },
  { label: 'Contacto', href: '#' },
];

const handleScroll = (e, href) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer = () => {
  return (
    <footer style={{ background: '#14532d' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: '#16a34a' }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C8.5 2 6 5.5 6 9c0 4.4 4.5 10.1 5.5 11.3.3.3.7.5 1 .5s.7-.2 1-.5C14.5 19.1 18 13.4 18 9c0-3.5-2.5-7-6-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">
                Greenside<span style={{ color: '#86efac' }}>.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: '#86efac' }}>
              Empresa boliviana que recolecta aceite reciclado, lo convierte en biocombustible
              y premia a los clientes con puntos canjeables.
            </p>
            <div className="text-xs" style={{ color: '#4ade80' }}>
              📍 Bolivia · Cochabamba, Santa Cruz, La Paz
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#bbf7d0' }}>
              Navegación
            </h4>
            <ul className="space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: '#86efac' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#bbf7d0' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: '#86efac' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderTop: '1px solid rgba(134,239,172,0.2)', color: '#86efac' }}
        >
          <div>© {new Date().getFullYear()} Greenside Solutions. Todos los derechos reservados.</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            <span>Sistema activo · Bolivia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
