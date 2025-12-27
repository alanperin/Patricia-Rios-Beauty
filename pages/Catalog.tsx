import React, { useState } from 'react';
import Layout from '../components/Layout';
import { MAIN_WHATSAPP } from '../constants';
import { useServices } from '../hooks/useContent';
import { ServiceCategory, ServiceItem } from '../types';
import Loading from '../components/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2, List, Clock, MessageCircle } from 'lucide-react';

const Catalog: React.FC = () => {
  const [filter, setFilter] = useState<ServiceCategory | 'Todos'>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Hook de Dados
  const { services, loading } = useServices();

  const filteredServices = filter === 'Todos' 
    ? services 
    : services.filter(service => service.category === filter);

  const categories = ['Todos', ...Object.values(ServiceCategory)];

  if (loading) return <Loading fullScreen />;

  return (
    <Layout>
      <div className="pt-24 md:pt-32 pb-20 bg-brand-cream min-h-screen text-brand-brown selection:bg-brand-gold selection:text-brand-white">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block font-sans">Menu de Procedimentos</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-brown mb-6">Catálogo Digital</h1>
            <p className="max-w-xl mx-auto text-brand-gray font-light font-sans mb-8 text-sm md:text-base">
              Explore nossos tratamentos exclusivos. Cada procedimento é realizado com técnicas de vanguarda e insumos de padrão internacional.
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

            {/* View Mode Toggle (Hidden on very small screens, default grid) */}
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

          {/* Content */}
          <motion.div layout className={`min-h-[400px] ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8' : 'flex flex-col gap-6'}`}>
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                viewMode === 'grid' 
                  ? <ServiceCardGrid key={service.id} service={service} />
                  : <ServiceCardList key={service.id} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-32 text-brand-gray/40 font-serif italic text-xl">
              Nenhum serviço encontrado nesta categoria.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// --- GRID VIEW COMPONENT ---
const ServiceCardGrid: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const whatsappUrl = `https://wa.me/${MAIN_WHATSAPP}?text=Olá! Vi o *${service.title}* no catálogo e gostaria de saber mais detalhes e disponibilidade.`;

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
              <span className="text-xl font-serif text-brand-brown">{service.price}</span>
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
const ServiceCardList: React.FC<{ service: ServiceItem }> = ({ service }) => {
    const whatsappUrl = `https://wa.me/${MAIN_WHATSAPP}?text=Olá! Vi o *${service.title}* no catálogo e gostaria de saber mais detalhes e disponibilidade.`;
  
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
                 <span className="block text-xl font-serif text-brand-brown">{service.price}</span>
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