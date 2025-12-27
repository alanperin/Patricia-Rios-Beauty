import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { MAIN_WHATSAPP } from '../constants';
import { useServices, useUnits } from '../hooks/useContent';
import { ServiceCategory, ServiceItem, UnitConfig } from '../types';
import Loading from '../components/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2, List, Clock, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Catalog: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [filter, setFilter] = useState<ServiceCategory | 'Todos'>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Ref para scroll automático
  const servicesListRef = useRef<HTMLDivElement>(null);

  // Hook de Dados
  const { services, loading: servicesLoading } = useServices();
  const { units, loading: unitsLoading } = useUnits();

  // Efeito de scroll automático ao mudar filtro
  useEffect(() => {
    if (servicesListRef.current) {
        // Pequeno delay para garantir que a UI atualizou se estivermos trocando de uma lista muito longa para uma curta
        setTimeout(() => {
            servicesListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  }, [filter]);

  if (servicesLoading || unitsLoading) return <Loading fullScreen />;

  // --------------------------------------------------------------------------
  // LÓGICA 1: SE NÃO TIVER SLUG (OU SLUG INVÁLIDO), MOSTRA SELEÇÃO DE UNIDADE
  // --------------------------------------------------------------------------
  const selectedUnit = units.find(u => u.slug === citySlug);

  if (!citySlug || !selectedUnit) {
    return <UnitSelectionScreen units={units} />;
  }

  // --------------------------------------------------------------------------
  // LÓGICA 2: EXIBIÇÃO DO CATÁLOGO FILTRADO PELA UNIDADE
  // --------------------------------------------------------------------------
  
  // 1. Filtra serviços disponíveis nesta unidade
  const unitServices = services.filter(service => 
    service.availableIn && service.availableIn.includes(selectedUnit.slug)
  );

  // 2. Filtra por categoria selecionada
  const filteredServices = filter === 'Todos' 
    ? unitServices 
    : unitServices.filter(service => service.category === filter);

  const categories = ['Todos', ...Object.values(ServiceCategory)];

  // Define qual WhatsApp usar (o da unidade específica)
  const contactNumber = selectedUnit.whatsapp; 

  return (
    <Layout>
      <div className="pt-24 md:pt-32 pb-20 bg-brand-cream min-h-screen text-brand-brown selection:bg-brand-gold selection:text-brand-white">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
                 <Link to="/catalogo" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray hover:text-brand-gold transition-colors flex items-center gap-1">
                    Unidades <ArrowRight className="w-3 h-3" />
                 </Link>
                 <span className="text-brand-gold uppercase tracking-[0.2em] text-[10px] font-bold block font-sans">
                    {selectedUnit.city}
                 </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-brown mb-6">Menu de Serviços</h1>
            <p className="max-w-xl mx-auto text-brand-gray font-light font-sans mb-8 text-sm md:text-base">
              Protocolos exclusivos disponíveis na unidade <strong>{selectedUnit.name}</strong>.
            </p>
            <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto"></div>
          </div>

          {/* Controls: Filter & View Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12 sticky top-16 md:top-24 z-30 bg-brand-cream/95 backdrop-blur-sm py-4 border-b border-brand-brown/5">
            
            {/* Category Filter */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex space-x-2 bg-brand-white p-1 rounded-full w-max mx-auto md:mx-0 shadow-sm border border-brand-brown/5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-4 md:px-6 py-2 rounded-full text-[10px] uppercase tracking-wider transition-all duration-300 whitespace-nowrap font-sans font-medium ${
                      filter === cat 
                        ? 'bg-brand-brown text-brand-white shadow-lg scale-105' 
                        : 'text-brand-gray hover:text-brand-brown hover:bg-brand-cream'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex bg-brand-white p-1 rounded-lg border border-brand-brown/5 shadow-sm">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-brand-champagne shadow-inner text-brand-brown' : 'text-brand-gray/40'}`}
                  aria-label="Visualização em Grade"
                >
                  <Grid2X2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-brand-champagne shadow-inner text-brand-brown' : 'text-brand-gray/40'}`}
                  aria-label="Visualização em Lista"
                >
                  <List className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Anchor for Auto Scroll */}
          <div ref={servicesListRef} className="scroll-mt-48"></div>

          {/* Content */}
          <motion.div layout className={`min-h-[400px] ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8' : 'flex flex-col gap-6'}`}>
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                viewMode === 'grid' 
                  ? <ServiceCardGrid key={service.id} service={service} whatsappNumber={contactNumber} unitName={selectedUnit.name} />
                  : <ServiceCardList key={service.id} service={service} whatsappNumber={contactNumber} unitName={selectedUnit.name} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-32 text-brand-gray/40 font-serif italic text-xl">
              Nenhum serviço encontrado nesta categoria para esta unidade.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// --- COMPONENTE: TELA DE SELEÇÃO DE UNIDADE ---
const UnitSelectionScreen: React.FC<{ units: UnitConfig[] }> = ({ units }) => {
    return (
        <Layout>
            <div className="min-h-screen bg-brand-brown flex items-center justify-center relative overflow-hidden py-20 px-6">
                 {/* Background Grain/Noise */}
                 <div className="absolute inset-0 bg-noise opacity-10"></div>
                 
                 <div className="max-w-6xl w-full z-10">
                     <div className="text-center mb-16">
                         <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block font-sans animate-fade-in">
                            Menu Exclusivo
                         </span>
                         <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-white mb-6 animate-slide-up">
                            Selecione sua <span className="italic text-brand-gold">Unidade</span>
                         </h1>
                         <p className="text-brand-white/60 font-light text-lg max-w-2xl mx-auto font-sans animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            Para garantir a precisão das informações e valores, por favor, escolha o Loft Beauty mais próximo de você.
                         </p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                         {units.map((unit, idx) => (
                             <Link to={`/catalogo/${unit.slug}`} key={unit.slug} className="group relative block h-[400px] md:h-[500px] overflow-hidden rounded-sm shadow-2xl">
                                 <img 
                                    src={unit.heroImage} 
                                    alt={unit.name} 
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500"></div>
                                 
                                 <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                                     <div className="flex items-center gap-2 mb-3 opacity-80">
                                         <MapPin className="w-4 h-4 text-brand-gold" />
                                         <span className="text-brand-white text-xs uppercase tracking-widest">{unit.city}</span>
                                     </div>
                                     <h2 className="text-3xl md:text-5xl font-serif text-brand-white mb-6 group-hover:translate-x-2 transition-transform duration-500">
                                         {unit.name.replace("Loft Beauty", "").trim()}
                                     </h2>
                                     <span className="inline-flex items-center gap-3 text-brand-gold text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-6 transition-all duration-300">
                                         Ver Catálogo <ArrowRight className="w-4 h-4" />
                                     </span>
                                 </div>
                             </Link>
                         ))}
                     </div>
                 </div>
            </div>
        </Layout>
    )
}

// --- GRID VIEW COMPONENT ---
const ServiceCardGrid: React.FC<{ service: ServiceItem, whatsappNumber: string, unitName: string }> = ({ service, whatsappNumber, unitName }) => {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá! Vim pelo catálogo online da unidade *${unitName}* e me interessei pelo *${service.title}*. Poderia me dar mais detalhes?`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full rounded-sm ${service.featured ? 'border border-brand-gold' : 'border border-brand-brown/5'}`}
    >
      <div className="h-64 md:h-72 overflow-hidden relative">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {service.featured && (
             <div className="absolute top-4 right-4 bg-brand-white/90 backdrop-blur-md text-brand-brown text-[9px] uppercase font-bold px-3 py-1.5 tracking-[0.2em] shadow-sm">
                 Destaque
             </div>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.25em] font-sans">{service.category}</span>
          {service.duration && (
            <div className="flex items-center gap-1 text-[10px] text-brand-gray font-sans tracking-wide border border-brand-brown/10 px-2 py-1 rounded-full">
               <Clock className="w-3 h-3" />
               {service.duration}
            </div>
          )}
        </div>
        
        <h3 className="font-serif text-xl md:text-2xl text-brand-brown mb-4 group-hover:text-brand-gold transition-colors leading-tight">{service.title}</h3>
        
        <p className="text-brand-gray text-sm leading-relaxed mb-6 font-sans font-light line-clamp-3 flex-grow">
          {service.description}
        </p>
        
        <div className="pt-6 border-t border-brand-brown/5 flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-[9px] text-brand-gray uppercase tracking-wider mb-1 font-sans">Investimento</span>
              <span className="text-lg font-serif text-brand-brown">{service.price}</span>
            </div>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-brand-brown/10 text-brand-brown rounded-full hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all text-[10px] uppercase font-bold tracking-widest group-hover:shadow-lg"
            >
               Consultar <MessageCircle className="w-3 h-3" />
            </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- LIST VIEW COMPONENT ---
const ServiceCardList: React.FC<{ service: ServiceItem, whatsappNumber: string, unitName: string }> = ({ service, whatsappNumber, unitName }) => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá! Vim pelo catálogo online da unidade *${unitName}* e me interessei pelo *${service.title}*. Poderia me dar mais detalhes?`;
  
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="group bg-white p-4 md:p-6 shadow-sm border border-brand-brown/5 hover:border-brand-gold/30 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-center rounded-sm"
      >
        <div className="w-full md:w-32 h-48 md:h-24 flex-shrink-0 overflow-hidden rounded-sm relative">
             <img 
               src={service.imageUrl} 
               alt={service.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             {service.featured && (
                <div className="absolute top-2 left-2 bg-brand-gold text-brand-white text-[8px] uppercase font-bold px-2 py-1">★</div>
             )}
        </div>

        <div className="flex-grow text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                <h3 className="font-serif text-xl text-brand-brown group-hover:text-brand-gold transition-colors">{service.title}</h3>
                <span className="hidden md:inline text-brand-gray/20">•</span>
                <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider font-sans">{service.category}</span>
            </div>
            <p className="text-brand-gray text-sm leading-relaxed font-sans font-light max-w-2xl">
                {service.description}
            </p>
        </div>

        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 md:border-l border-brand-brown/10 pt-4 md:pt-0 md:pl-6">
             <div className="text-right md:text-center">
                 <span className="block text-[9px] text-brand-gray uppercase tracking-wider mb-1 font-sans">Investimento</span>
                 <span className="block text-lg font-serif text-brand-brown">{service.price}</span>
             </div>
             
             <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-brand-brown text-brand-white rounded-full hover:bg-[#25D366] transition-colors text-[10px] uppercase font-bold tracking-widest whitespace-nowrap shadow-lg"
             >
                Agendar
             </a>
        </div>
      </motion.div>
    );
};

export default Catalog;