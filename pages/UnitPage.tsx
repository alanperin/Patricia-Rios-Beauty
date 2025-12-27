import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import InstagramFeed from '../components/InstagramFeed';
import { useUnit, useServices } from '../hooks/useContent';
import Loading from '../components/Loading';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, MapPin, Clock } from 'lucide-react';

const UnitPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Data Fetching
  const { unit, loading: unitLoading } = useUnit(slug);
  const { services, loading: servicesLoading } = useServices();

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, 400]);
  const contentY = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (unitLoading || servicesLoading) return <Loading fullScreen />;
  
  if (!unit) {
    return <Navigate to="/" replace />;
  }

  const whatsappLink = `https://wa.me/${unit.whatsapp}?text=Olá! Vim pelo site e gostaria de agendar um momento especial no ${unit.name} (Unidade ${unit.city.split('-')[0].trim()}).`;
  
  // Filtra serviços desta unidade que sejam destaque
  const featuredServices = services.filter(s => s.featured && s.availableIn && s.availableIn.includes(unit.slug)).slice(0, 3);

  return (
    <Layout>
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-brand-brown">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/30 via-transparent to-brand-brown/90 z-10" />
          <img 
            src={unit.heroImage} 
            alt={unit.name} 
            className="w-full h-[120%] object-cover object-center opacity-90"
          />
        </motion.div>
        
        <div className="relative z-20 h-full flex flex-col justify-end pb-20 md:pb-32 max-w-[1400px] mx-auto px-6">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             style={{ y: contentY }}
           >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                 <div className="h-[1px] w-8 md:w-12 bg-brand-gold"></div>
                 <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold font-sans shadow-black drop-shadow-md">
                    O Santuário
                 </span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-brand-white leading-none mb-4 md:mb-6 drop-shadow-2xl">
                {unit.name.replace('Loft Beauty ', '')}
              </h1>
              <p className="text-lg md:text-2xl font-light text-brand-white/90 max-w-xl font-sans leading-relaxed drop-shadow-md">
                {unit.city}
              </p>
           </motion.div>
        </div>
      </section>

      {/* 2. THE CONCEPT & ATMOSPHERE */}
      <section className="py-20 md:py-40 bg-brand-cream relative text-brand-brown">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1">
               <motion.span 
                 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                 className="text-brand-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-4 md:mb-6 block font-sans"
               >
                 O Conceito
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                 className="text-3xl md:text-4xl lg:text-6xl font-serif text-brand-brown mb-6 md:mb-8 leading-tight"
               >
                 Um refúgio para <br/> sua <span className="italic text-brand-gold">melhor versão</span>.
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                 className="text-brand-gray text-base md:text-lg leading-loose font-light font-sans mb-10 md:mb-12 text-justify"
               >
                 {unit.description}
               </motion.p>
               
               {/* Amenities Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4 border-t border-brand-brown/10 pt-8">
                  {unit.amenities?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-brand-brown font-serif italic text-sm md:text-base">
                       <Sparkles className="w-4 h-4 text-brand-gold" />
                       <span>{item}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="space-y-4 mt-12"
                >
                   {unit.galleryImages[0] && (
                     <img src={unit.galleryImages[0]} className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Interior Detail" />
                   )}
                </motion.div>
                <motion.div 
                   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                   className="space-y-4"
                >
                   {unit.galleryImages[1] && (
                      <img src={unit.galleryImages[1]} className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Interior Detail" />
                   )}
                   <div className="p-4 md:p-6 bg-white border border-brand-brown/5 text-center shadow-md">
                      <p className="font-serif italic text-brand-gold text-lg md:text-2xl">"O luxo está em cada detalhe."</p>
                   </div>
                </motion.div>
            </div>
         </div>
      </section>

      {/* 3. EXCLUSIVE MENU PREVIEW */}
      <section className="py-20 md:py-32 bg-brand-champagne text-brand-brown">
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
              <div className="w-full md:w-auto">
                 <span className="text-brand-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-4 block font-sans">Menu de Procedimentos</span>
                 <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-brown">Signature</h2>
              </div>
              <p className="max-w-md text-left md:text-right text-brand-gray font-light mt-6 md:mt-0 font-sans text-sm md:text-base">
                Uma seleção curada dos procedimentos mais desejados pelas mulheres que frequentam nosso Loft em {unit.city.split('-')[0]}.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, idx) => (
                 <motion.div 
                   key={service.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="group cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-300 pb-6 rounded-sm"
                 >
                    <div className="relative overflow-hidden aspect-[4/5] mb-6">
                       <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                       
                       {/* Gradiente permanente para garantir a leitura do texto */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                       
                       {/* Conteúdo sempre visível (Preço e Botão) */}
                       <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                          <span className="text-white font-bold text-lg drop-shadow-md">{service.price}</span>
                          <span className="bg-brand-white text-brand-brown text-[10px] uppercase font-bold px-3 py-1 shadow-lg hover:bg-brand-gold transition-colors">Agendar</span>
                       </div>
                    </div>
                    <div className="flex justify-between items-start px-6">
                       <div>
                          <h3 className="text-2xl font-serif mb-2 text-brand-brown group-hover:text-brand-gold transition-colors">{service.title}</h3>
                          <p className="text-brand-gray text-xs uppercase tracking-widest font-sans">{service.category} • {service.duration}</p>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
           
           <div className="mt-12 md:mt-16 text-center">
              <a href={`#/catalogo/${unit.slug}`}>
                 <Button variant="outline" className="px-8 md:px-12 w-full md:w-auto">
                    Ver Menu Completo
                 </Button>
              </a>
           </div>
        </div>
      </section>

      {/* 4. LOCATION & CONTACT */}
      <section className="bg-brand-cream text-brand-brown border-t border-brand-brown/5">
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-auto lg:min-h-[600px]">
            <div className="relative w-full h-[400px] lg:h-auto grayscale-[50%] hover:grayscale-0 transition-all duration-700 order-2 lg:order-1">
               <iframe 
                  src={unit.mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title={`Mapa ${unit.name}`}
                  className="absolute inset-0"
               ></iframe>
            </div>
            
            <div className="p-8 md:p-12 lg:p-32 flex flex-col justify-center bg-brand-white/50 order-1 lg:order-2">
               <span className="text-brand-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-4 md:mb-6 font-sans">
                  Visite-nos
               </span>
               <h2 className="text-3xl md:text-5xl font-serif mb-8 md:mb-12 text-brand-brown">
                  Estamos esperando <br/> por você.
               </h2>
               
               <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                  <div className="flex gap-4 md:gap-6">
                     <MapPin className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                     <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-2 font-sans text-brand-brown">Endereço</h4>
                        <p className="font-serif text-lg md:text-xl leading-relaxed max-w-xs text-brand-gray">{unit.address}</p>
                     </div>
                  </div>
                  
                  <div className="flex gap-4 md:gap-6">
                     <Clock className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                     <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-2 font-sans text-brand-brown">Horário de Atendimento</h4>
                        <p className="font-serif text-base md:text-lg text-brand-gray">Segunda a Sexta: 08h às 19h</p>
                        <p className="font-serif text-base md:text-lg text-brand-gray">Sábados: 08h às 14h</p>
                     </div>
                  </div>
               </div>
               
               <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <Button variant="primary" className="w-full md:w-auto shadow-xl">
                     Agendar via WhatsApp
                  </Button>
               </a>
            </div>
         </div>
      </section>

      {/* 5. INSTAGRAM INSPIRATION */}
      <div className="bg-brand-white py-12">
          <InstagramFeed handle={unit.instagramHandle} />
      </div>

    </Layout>
  );
};

export default UnitPage;