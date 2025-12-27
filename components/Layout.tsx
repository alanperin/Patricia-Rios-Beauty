
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUnits } from '../hooks/useContent';
import Button from './Button';
import { Menu, X, Instagram, Facebook, MapPin, Phone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const PRLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className} text-brand-gold`} fill="currentColor" aria-hidden="true">
    <path d="M30,10 L30,90 M25,10 L50,10 C70,10 80,20 80,40 C80,60 70,70 50,70 M50,70 L80,90" stroke="currentColor" strokeWidth="4" fill="none" />
    <path d="M40,10 L40,90" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Hook de Dados Dinâmicos
  const { units, loading } = useUnits();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Academy', path: '/academy' },
    { label: 'Catálogo', path: '/catalogo' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-black text-brand-white">
      {/* HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled || !isHome 
            ? 'bg-brand-black/90 backdrop-blur-md py-4 border-brand-white/10' 
            : 'bg-transparent py-8 border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <PRLogo className={`transition-all duration-500 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`} />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest leading-none text-brand-white group-hover:text-brand-gold transition-colors">PATRICIA RIOS</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-brand-gold">Beauty & Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-xs uppercase tracking-widest font-bold hover:text-brand-gold transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Dynamic Units Dropdown (Simulated with hover group for simplicity) */}
            <div className="relative group cursor-pointer py-4">
              <span className="text-xs uppercase tracking-widest font-bold group-hover:text-brand-gold transition-colors flex items-center gap-1">
                Unidades
              </span>
              <div className="absolute top-full right-0 w-48 bg-brand-black border border-brand-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-2">
                 {!loading && units.map(unit => (
                    <Link 
                      key={unit.slug} 
                      to={`/unidade/${unit.slug}`}
                      className="block px-6 py-3 text-xs uppercase tracking-widest hover:bg-brand-white/5 hover:text-brand-gold"
                    >
                      {unit.city.split('-')[0]}
                    </Link>
                 ))}
                 {loading && <div className="px-6 py-3 text-[10px] text-brand-gray/50">Carregando...</div>}
              </div>
            </div>

            <Button variant="outline" className="px-6 py-2 text-xs border-brand-white/30 text-brand-white hover:border-brand-gold hover:text-brand-gold">
              Agendar
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-brand-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-brand-black z-40 transition-transform duration-500 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-2xl font-serif text-brand-white hover:text-brand-gold"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-12 h-[1px] bg-brand-white/10 my-4"></div>
            <p className="text-xs uppercase tracking-widest text-brand-gold mb-4">Nossas Unidades</p>
            {!loading && units.map(unit => (
               <Link 
                  key={unit.slug} 
                  to={`/unidade/${unit.slug}`}
                  className="text-xl font-serif text-brand-white/70 hover:text-brand-white"
               >
                  {unit.name}
               </Link>
            ))}
         </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#050505] border-t border-brand-white/5 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-3 mb-6">
                  <PRLogo className="w-8 h-8" />
                  <span className="font-serif text-lg tracking-widest">PATRICIA RIOS</span>
               </div>
               <p className="text-brand-white/40 text-sm font-light leading-relaxed mb-6">
                 Elevando o padrão da beleza e da educação profissional. Técnica, arte e sofisticação em cada detalhe.
               </p>
               <div className="flex gap-4 text-brand-white/60">
                 <Instagram className="w-5 h-5 hover:text-brand-gold cursor-pointer transition-colors" />
                 <Facebook className="w-5 h-5 hover:text-brand-gold cursor-pointer transition-colors" />
               </div>
            </div>

            <div>
              <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-6">Menu</h4>
              <ul className="space-y-4 text-sm text-brand-white/60 font-light">
                <li><Link to="/" className="hover:text-brand-white transition-colors">Home</Link></li>
                <li><Link to="/academy" className="hover:text-brand-white transition-colors">Academy</Link></li>
                <li><Link to="/catalogo" className="hover:text-brand-white transition-colors">Procedimentos</Link></li>
                <li><a href="#" className="hover:text-brand-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-6">Unidades</h4>
              <ul className="space-y-6 text-sm text-brand-white/60 font-light">
                {!loading ? units.map(unit => (
                  <li key={unit.slug}>
                    <Link to={`/unidade/${unit.slug}`} className="block hover:text-brand-white transition-colors mb-1 font-medium text-brand-white/80">
                      {unit.name}
                    </Link>
                    <div className="flex items-start gap-2 text-xs opacity-70">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{unit.city}</span>
                    </div>
                  </li>
                )) : (
                  <li><span className="text-xs opacity-50">Carregando unidades...</span></li>
                )}
              </ul>
            </div>

            <div>
               <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-6">Newsletter</h4>
               <p className="text-brand-white/40 text-sm font-light mb-4">Receba novidades sobre cursos e tendências.</p>
               <div className="flex border-b border-brand-white/20 pb-2">
                 <input type="email" placeholder="E-mail" className="bg-transparent border-none outline-none text-brand-white placeholder-brand-white/20 text-sm w-full" />
                 <button className="text-brand-gold text-xs uppercase font-bold hover:text-white transition-colors">Assinar</button>
               </div>
            </div>
          </div>

          <div className="border-t border-brand-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-white/20 uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Patricia Rios Beauty. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0">Desenvolvido com Tecnologia Headless</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
