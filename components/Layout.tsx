import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUnits } from '../hooks/useContent';
import Button from './Button';
import CustomCursor from './CustomCursor';
import { Menu, X, Instagram, Facebook, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const PRLogo = ({ className = "w-10 h-10", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill={color} aria-hidden="true">
    <path d="M30,10 L30,90 M25,10 L50,10 C70,10 80,20 80,40 C80,60 70,70 50,70 M50,70 L80,90" stroke={color} strokeWidth="4" fill="none" />
    <path d="M40,10 L40,90" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const { units, loading } = useUnits();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Academy', path: '/academy' },
    { label: 'Catálogo', path: '/catalogo' },
  ];

  // Cores dinâmicas baseadas no scroll e página
  const logoColor = isHome && !scrolled ? '#FFFFFF' : '#2A231C';
  const textColor = isHome && !scrolled ? 'text-brand-white' : 'text-brand-brown';
  const buttonVariant = isHome && !scrolled ? 'outline-light' : 'primary';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-cream text-brand-brown selection:bg-brand-gold selection:text-brand-white relative">
      {/* Global Grain Texture */}
      <div className="bg-noise"></div>
      
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* HEADER MODERNO */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent
          ${scrolled 
            ? 'bg-brand-cream/80 backdrop-blur-xl py-3 shadow-sm border-brand-brown/5' 
            : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-4 group relative z-50">
            <PRLogo className={`transition-all duration-500 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`} color={logoColor} />
            <div className="flex flex-col">
              <span className={`font-serif text-lg tracking-[0.15em] leading-none group-hover:text-brand-gold transition-colors duration-300 ${textColor}`}>
                PATRICIA RIOS
              </span>
              <span className={`text-[8px] uppercase tracking-[0.4em] mt-1 font-medium transition-colors duration-300 ${isHome && !scrolled ? 'text-brand-white/60' : 'text-brand-gold'}`}>
                Loft Beauty
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-[11px] uppercase tracking-[0.25em] font-medium hover:text-brand-gold transition-all duration-300 relative group py-2 ${textColor}`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isHome && !scrolled ? 'bg-brand-white' : 'bg-brand-gold'}`}></span>
              </Link>
            ))}
            
            {/* Dropdown Unidades */}
            <div className="relative group cursor-pointer py-2">
              <span className={`text-[11px] uppercase tracking-[0.25em] font-medium group-hover:text-brand-gold transition-colors flex items-center gap-1 ${textColor}`}>
                Unidades
              </span>
              <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                 <div className="bg-white/90 backdrop-blur-xl border border-brand-brown/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden min-w-[200px]">
                   {!loading && units.map(unit => (
                      <Link 
                        key={unit.slug} 
                        to={`/unidade/${unit.slug}`}
                        className="block px-6 py-4 text-[10px] uppercase tracking-widest text-brand-brown hover:bg-brand-champagne/30 hover:text-brand-gold transition-colors border-b border-brand-brown/5 last:border-0"
                      >
                        {unit.city.split('-')[0]}
                      </Link>
                   ))}
                 </div>
              </div>
            </div>

            <Button 
              variant={buttonVariant} 
              className="px-8 py-2.5 text-[10px] backdrop-blur-sm tracking-widest"
            >
              Agendar
            </Button>
          </nav>

          {/* MOBILE TOGGLE */}
          <button 
            className={`md:hidden relative z-50 p-2 -mr-2 transition-colors duration-300 ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU - Full Screen Editorial */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-brand-brown z-40 md:hidden flex flex-col"
          >
             <div className="flex flex-col items-center justify-center flex-grow gap-8 p-6 w-full relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-brand-white/5 rounded-full pointer-events-none animate-spin-slow"></div>

                {navLinks.map((link, idx) => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-serif text-brand-cream hover:text-brand-gold transition-all duration-300 hover:scale-105 hover:italic"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="w-12 h-[1px] bg-brand-gold/30 my-2"></div>
                
                <div className="space-y-6 text-center">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-brand-gold mb-2 opacity-80">Unidades Loft</p>
                  {!loading && units.map(unit => (
                     <Link 
                        key={unit.slug} 
                        to={`/unidade/${unit.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xl font-serif text-brand-white/70 hover:text-brand-white transition-colors"
                     >
                        {unit.name.replace('Loft Beauty ', '')}
                     </Link>
                  ))}
                </div>
             </div>
             <div className="p-8 w-full border-t border-brand-white/10 bg-brand-brown/50 backdrop-blur-sm">
                <Button variant="primary" className="w-full">Agendar Agora</Button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full overflow-x-hidden relative z-10">
        {children}
      </main>

      {/* FOOTER - Refined Layout */}
      <footer className="bg-brand-brown text-brand-cream border-t border-brand-gold/10 pt-24 pb-12 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
            {/* Brand Column */}
            <div className="col-span-1 lg:col-span-4">
               <div className="flex items-center gap-3 mb-8">
                  <PRLogo className="w-10 h-10" color="#C5A059" />
                  <span className="font-serif text-2xl tracking-widest text-brand-gold">PATRICIA RIOS</span>
               </div>
               <p className="text-brand-white/60 text-base font-light leading-relaxed mb-8 font-sans max-w-sm">
                 Elevando o padrão da beleza e da educação profissional. Técnica, arte e sofisticação em cada detalhe.
               </p>
               <div className="flex gap-6 text-brand-gold">
                 <Instagram className="w-5 h-5 hover:text-brand-white cursor-pointer transition-colors hover:scale-110 duration-300" />
                 <Facebook className="w-5 h-5 hover:text-brand-white cursor-pointer transition-colors hover:scale-110 duration-300" />
               </div>
            </div>

            {/* Links Columns */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold mb-8">Menu</h4>
              <ul className="space-y-4 text-sm text-brand-white/60 font-light">
                <li><Link to="/" className="hover:text-brand-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
                <li><Link to="/academy" className="hover:text-brand-white hover:translate-x-1 transition-all inline-block">Academy</Link></li>
                <li><Link to="/catalogo" className="hover:text-brand-white hover:translate-x-1 transition-all inline-block">Procedimentos</Link></li>
                <li><a href="#" className="hover:text-brand-white hover:translate-x-1 transition-all inline-block">Contato</a></li>
              </ul>
            </div>

            <div className="col-span-1 lg:col-span-3">
              <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold mb-8">Unidades</h4>
              <ul className="space-y-6 text-sm text-brand-white/60 font-light">
                {!loading ? units.map(unit => (
                  <li key={unit.slug}>
                    <Link to={`/unidade/${unit.slug}`} className="block hover:text-brand-white transition-colors mb-1 font-medium text-brand-cream text-base">
                      {unit.name}
                    </Link>
                    <div className="flex items-start gap-2 text-xs opacity-60 mt-1">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-brand-gold" />
                      <span>{unit.city}</span>
                    </div>
                  </li>
                )) : (
                  <li><span className="text-xs opacity-50">Carregando unidades...</span></li>
                )}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="col-span-1 lg:col-span-3">
               <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.25em] font-bold mb-8">Newsletter</h4>
               <p className="text-brand-white/60 text-sm font-light mb-6">Receba novidades exclusivas e tendências.</p>
               <div className="flex flex-col gap-4">
                 <input type="email" placeholder="Seu melhor e-mail" className="bg-brand-white/5 border border-brand-white/10 outline-none text-brand-white placeholder-brand-white/20 text-sm w-full px-4 py-3 rounded-sm focus:border-brand-gold/50 transition-colors" />
                 <button className="bg-brand-gold text-brand-brown text-xs uppercase font-bold px-6 py-3 hover:bg-white transition-colors tracking-widest w-full">Assinar</button>
               </div>
            </div>
          </div>

          <div className="border-t border-brand-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-white/30 uppercase tracking-widest text-center md:text-left gap-4 font-medium">
            <p>&copy; {new Date().getFullYear()} Patricia Rios Beauty.</p>
            <p>Design & Tecnologia de Luxo</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;