
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

  const whatsappLink = `https://wa.me/${unit.whatsapp}?text=Olá! Gostaria de agendar um momento especial no ${unit.name}.`;
  const featuredServices = services.filter(s => s.featured).slice(0, 3);

  return (
    <Layout>
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-brand-black">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-black z-10" />
          <img 
            src={unit.heroImage} 
            alt={unit.name} 
            className="w-full h-[120%] object-cover object-center opacity-90"
          />
        </motion.div>
        
        <div className="relative z-20 h-full flex flex-col justify-end pb-32 max-w-[1400px] mx-auto px-6">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             style={{ y: contentY }}
           >
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-[1px] w-12 bg-brand-gold"></div>
                 <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-sans">
                    The Sanctuary
                 </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-brand-white leading-none mb-6">
                {unit.name.replace('Loft Beauty ', '')}
              </h1>
              <p className="text-xl md:text-2xl font-light text-brand-white/80 max-w-xl font-sans leading-relaxed">
                {unit.city}
              </p>
           </motion.div>
        </div>
      </section>

      {/* 2. THE CONCEPT & ATMOSPHERE */}
      <section className="py-24 md:py-40 bg-brand-black relative">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
               <motion.span 
                 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                 className="text-brand-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-6 block font-sans"
               >
                 O Conceito
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                 className="text-4xl md:text-6xl font-serif text-brand-white mb-8 leading-tight"
               >
                 Um refúgio para <br/> sua <span className="italic text-brand-gold">melhor versão</span>.
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                 className="text-brand-white/60 text-lg leading-loose font-light font-sans mb-12 text-justify"
               >
                 {unit.description}
               </motion.p>
               
               {/* Amenities Grid */}
               <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-brand-white/10 pt-8">
                  {unit.amenities?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-brand-white/80 font-serif italic">
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
                     <img src={unit.galleryImages[0]} className="w-full aspect-[3/4] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" alt="Interior Detail" />
                   )}
                </motion.div>
                <motion.div 
                   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                   className="space-y-4"
                >
                   {unit.galleryImages[1] && (
                      <img src={unit.galleryImages[1]} className="w-full aspect-[3/4] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" alt="Interior Detail" />
                   )}
                   <div className="p-6 bg-brand-gray/20 border border-brand-white/5 text-center">
                      <p className="font-serif italic text-brand-gold text-2xl">"Luxury is in each detail."</p>
                   </div>
                </motion.div>
            </div>
         </div>
      </section>

      {/* 3. EXCLUSIVE MENU PREVIEW */}
      <section className="py-32 bg-brand-white text-brand-black">
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20">
              <div>
                 <span className="text-brand-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-4 block font-sans">Menu de Procedimentos</span>
                 <h2 className="text-5xl md:text-7xl font-serif text-brand-black">Sorriso Signature</h2>
              </div>
              <p className="max-w-md text-right text-brand-gray/60 font-light mt-6 md:mt-0 font-sans">
                Uma seleção curada dos procedimentos mais desejados pelas mulheres que frequentam nosso Loft em Sorriso.
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
                   className="group cursor-pointer"
                 >
                    <div className="relative overflow-hidden aspect-[4/5] mb-6">
                       <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                       <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <span className="text-white font-bold text-lg">{service.price}</span>
                          <span className="bg-brand-white text-brand-black text-[10px] uppercase font-bold px-3 py-1">Agendar</span>
                       </div>
                    </div>
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                          <p className="text-brand-gray/50 text-xs uppercase tracking-widest font-sans">{service.category} • {service.duration}</p>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
           
           <div className="mt-16 text-center">
              <a href="#/catalogo">
                 <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white px-12">
                    Ver Menu Completo
                 </Button>
              </a>
           </div>
        </div>
      </section>

      {/* 4. LOCATION & CONTACT (Editorial Style) */}
      <section className="bg-[#EAEAEA] text-brand-black">
         <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            <div className="relative w-full h-[400px] md:h-auto grayscale invert contrast-[0.9]">
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
            
            <div className="p-12 md:p-32 flex flex-col justify-center">
               <span className="text-brand-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-6 font-sans">
                  Visite-nos
               </span>
               <h2 className="text-4xl md:text-5xl font-serif mb-12">
                  Estamos esperando <br/> por você.
               </h2>
               
               <div className="space-y-8 mb-12">
                  <div className="flex gap-6">
                     <MapPin className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                     <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-2 font-sans">Endereço</h4>
                        <p className="font-serif text-xl leading-relaxed max-w-xs">{unit.address}</p>
                     </div>
                  </div>
                  
                  <div className="flex gap-6">
                     <Clock className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                     <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-2 font-sans">Horário de Atendimento</h4>
                        <p className="font-serif text-lg text-brand-gray/80">Segunda a Sexta: 08h às 19h</p>
                        <p className="font-serif text-lg text-brand-gray/80">Sábados: 08h às 14h</p>
                     </div>
                  </div>
               </div>
               
               <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <Button variant="primary" className="bg-brand-black text-brand-white hover:bg-brand-gold hover:text-brand-black w-full md:w-auto shadow-xl">
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
