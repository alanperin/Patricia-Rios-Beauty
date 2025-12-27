
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout, { PRLogo } from '../components/Layout';
import { useServices, useUnits, useAcademy, useTestimonials } from '../hooks/useContent';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, GraduationCap, Award, BookOpen, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 300]);
  const y2 = useTransform(scrollY, [0, 800], [0, -150]);
  const opacityText = useTransform(scrollY, [0, 200], [1, 0]);

  // Data Fetching
  const { services, loading: servicesLoading } = useServices();
  const { units, loading: unitsLoading } = useUnits();
  const { products: academyProducts, loading: academyLoading } = useAcademy();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  
  // Carousel Logic
  const featuredServices = services.filter(s => s.featured);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [featuredServices]); // Re-run when data loads

  const isLoading = servicesLoading || unitsLoading || academyLoading || testimonialsLoading;

  if (isLoading) {
    return <Loading fullScreen />;
  }

  const initialTestimonials = testimonials.slice(0, 3);
  const moreTestimonials = testimonials.slice(3);

  return (
    <Layout>
      {/* SECTION 1: ICONIC HERO - FOCUS ON PATRICIA */}
      <section className="relative w-full h-screen overflow-hidden bg-brand-black">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-brand-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1594744803329-a584af1dd51e?q=80&w=2787&auto=format&fit=crop" 
            alt="Patricia Rios Portrait" 
            className="w-full h-[120%] object-cover object-top opacity-90 grayscale-[30%] brightness-90"
          />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col justify-center max-w-[1400px] mx-auto px-6 pt-20">
          <motion.div style={{ opacity: opacityText, y: y2 }} className="max-w-4xl">
            <span className="text-brand-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block animate-fade-in font-sans">
              High-End Beauty & Education
            </span>
            <h1 className="text-7xl md:text-9xl font-serif text-brand-white leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
              PATRÍCIA<br/>
              <span className="text-brand-gold italic">RIOS</span>
            </h1>
            <p className="text-brand-white/70 text-lg md:text-2xl font-light max-w-2xl leading-relaxed mb-12 border-l-2 border-brand-gold pl-8 font-sans">
              Especialista em Micropigmentação Realista e Mentora de Profissionais de Elite. Onde a arte encontra a técnica de precisão.
            </p>
            <div className="flex flex-wrap gap-6">
               <a href="#academy">
                 <Button variant="primary" className="px-10">PR Academy</Button>
               </a>
               <Link to="/catalogo">
                 <Button variant="outline" className="px-10">Ver Procedimentos</Button>
               </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-40">
            <div className="w-[1px] h-12 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY - ATENDIMENTOS & CAROUSEL */}
      <section className="py-32 bg-brand-black relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
                <div className="relative group order-2 lg:order-1">
                    <div className="relative z-10 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop" 
                          alt="Atendimento Patricia Rios" 
                          className="w-full aspect-[4/5] object-cover transition-transform duration-[2s] group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl z-0"></div>
                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 rotate-90 text-[10px] tracking-[1em] uppercase text-brand-gold/30 font-sans hidden xl:block">
                        The Art of Precision
                    </div>
                </div>
                
                <div className="order-1 lg:order-2">
                    <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block font-sans">A Experiência</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-brand-white mb-10 leading-tight">
                      Naturalidade que <br/><span className="italic text-brand-gold">empodera</span>.
                    </h2>
                    <p className="text-brand-white/60 text-lg leading-loose mb-12 font-light font-sans">
                      Cada rosto é uma tela única. Meus atendimentos são pautados no visagismo emocional, buscando resgatar a autoestima através de técnicas que respeitam a anatomia e a história de cada cliente. Não é apenas estética, é confiança renovada.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="border-t border-brand-white/10 pt-6">
                            <Star className="w-6 h-6 text-brand-gold mb-4" />
                            <h4 className="text-brand-white font-serif text-xl mb-2">Exclusividade</h4>
                            <p className="text-brand-white/40 text-sm font-sans">Protocolos personalizados para cada biotipo facial.</p>
                        </div>
                        <div className="border-t border-brand-white/10 pt-6">
                            <Award className="w-6 h-6 text-brand-gold mb-4" />
                            <h4 className="text-brand-white font-serif text-xl mb-2">Excelência</h4>
                            <p className="text-brand-white/40 text-sm font-sans">Insumos de padrão internacional e segurança total.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* INTERACTIVE SERVICES CAROUSEL */}
            <div className="relative mt-32">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-brand-white font-serif text-3xl md:text-5xl tracking-tight">
                  Signature <span className="text-brand-gold italic">Services</span>
                </h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white hover:border-brand-gold hover:text-brand-gold transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white hover:border-brand-gold hover:text-brand-gold transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div 
                ref={carouselRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredServices.map((service) => (
                  <motion.div 
                    key={service.id}
                    className="min-w-[85vw] md:min-w-[400px] snap-start"
                  >
                    <Link to="/catalogo" className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden mb-6">
                        <img 
                          src={service.imageUrl} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute top-6 left-6">
                          <span className="bg-brand-black/80 backdrop-blur-md text-brand-gold text-[10px] uppercase font-bold px-4 py-2 tracking-widest font-sans">
                            {service.category}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-brand-white font-serif text-2xl mb-2 group-hover:text-brand-gold transition-colors">{service.title}</h4>
                      <p className="text-brand-white/40 text-sm font-sans font-light line-clamp-2 mb-4">{service.description}</p>
                      <div className="flex items-center justify-between border-t border-brand-white/10 pt-4">
                        <span className="text-brand-gold font-serif text-lg">{service.price}</span>
                        <span className="text-brand-white text-[10px] uppercase tracking-widest font-bold group-hover:translate-x-2 transition-transform duration-300">Reservar &rarr;</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* SECTION 2.5: TESTIMONIALS - VOICES OF TRANSFORMATION */}
      <section className="py-32 bg-[#0c0c0c] border-y border-brand-white/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block font-sans">Depoimentos</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-white mb-6">Vozes da Transformação</h2>
            <p className="text-brand-white/50 max-w-2xl mx-auto font-sans font-light">
              Histórias reais de alunas que elevaram suas carreiras e clientes que redescobriram sua beleza através do nosso padrão de excelência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialTestimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-gray/20 p-10 border border-brand-white/5 relative group"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors" />
                <p className="text-brand-white/70 italic font-light mb-8 relative z-10 leading-relaxed font-sans">
                  "{testimonial.text}"
                </p>
                <div className="flex flex-col">
                  <span className="text-brand-white font-serif text-lg">{testimonial.name}</span>
                  <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold font-sans">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showAllTestimonials && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 overflow-hidden"
              >
                {moreTestimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="bg-brand-gray/20 p-10 border border-brand-white/5 relative group"
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-gold/20" />
                    <p className="text-brand-white/70 italic font-light mb-8 relative z-10 leading-relaxed font-sans">
                      "{testimonial.text}"
                    </p>
                    <div className="flex flex-col">
                      <span className="text-brand-white font-serif text-lg">{testimonial.name}</span>
                      <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold font-sans">{testimonial.role}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16 text-center">
            {moreTestimonials.length > 0 && (
              !showAllTestimonials ? (
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllTestimonials(true)}
                  className="px-12"
                >
                  Ver Todos os Depoimentos
                </Button>
              ) : (
                <Button 
                  variant="text" 
                  onClick={() => setShowAllTestimonials(false)}
                  className="text-brand-gold hover:text-brand-white"
                >
                  Mostrar Menos
                </Button>
              )
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: ACADEMY & INFOPRODUCTS - THE NEW FOCUS */}
      <section id="academy" className="py-32 bg-brand-white text-brand-black relative">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-2xl">
                    <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block font-sans">Educação de Elite</span>
                    <h2 className="text-5xl md:text-8xl font-serif text-brand-black leading-none">PR Academy</h2>
                    <p className="mt-8 text-brand-gray/70 text-xl font-light font-sans">
                      Domine as técnicas que faturam alto no mercado da beleza. Mentorias, cursos presenciais e produtos digitais desenvolvidos por quem vive o campo de batalha diariamente.
                    </p>
                </div>
                <Link to="/academy">
                    <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white">Ver Portal Academy</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {academyProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      whileHover={{ y: -10 }}
                      className="bg-brand-black/5 group cursor-pointer overflow-hidden"
                    >
                        <div className="h-72 overflow-hidden relative">
                            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 left-4 bg-brand-black text-brand-gold text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 font-sans">
                                {product.type}
                            </div>
                        </div>
                        <div className="p-10">
                            <h3 className="text-2xl font-serif mb-4 group-hover:text-brand-gold transition-colors">{product.title}</h3>
                            <p className="text-brand-gray/60 text-sm font-light leading-relaxed mb-8 font-sans">
                                {product.description}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                                <span className="border-b border-brand-gold pb-1">Saiba Mais</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Infoproducts Trust Bar */}
            <div className="mt-24 py-12 border-y border-brand-black/5 flex flex-wrap justify-around items-center gap-12 opacity-50 grayscale">
                <div className="flex items-center gap-3 font-serif italic text-xl"> <GraduationCap className="w-6 h-6" /> +500 Alunas Formadas</div>
                <div className="flex items-center gap-3 font-serif italic text-xl"> <BookOpen className="w-6 h-6" /> Conteúdo Vitalício</div>
                <div className="flex items-center gap-3 font-serif italic text-xl"> <Star className="w-6 h-6" /> Suporte VIP</div>
            </div>
        </div>
      </section>

      {/* SECTION 4: THE SPACES - LOFT BEAUTY (Secondary Focus) */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-24">
                <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block font-sans">Destinos de Luxo</span>
                <h2 className="text-5xl md:text-7xl font-serif text-brand-white">Nossos Lofts</h2>
                <div className="w-20 h-[1px] bg-brand-gold mx-auto mt-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {units.map((unit) => (
                    <Link to={`/unidade/${unit.slug}`} key={unit.slug} className="group relative aspect-[16/9] overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10"></div>
                        <img src={unit.heroImage} alt={unit.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                        
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-10 md:p-16">
                            <div className="flex items-center gap-3 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                                <MapPin className="w-4 h-4" /> {unit.city}
                            </div>
                            <h3 className="text-3xl md:text-5xl font-serif text-brand-white mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">{unit.name}</h3>
                            <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
                                <span className="text-brand-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                                    Conhecer Loft <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="py-32 bg-brand-gold relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <PRLogo className="w-full h-full text-brand-black" />
         </div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-serif text-brand-black mb-10 leading-none">Agende sua <br/>transformação.</h2>
            <p className="text-brand-black/70 text-xl font-light mb-16 font-sans">
              Seja para um procedimento de elite ou para dar o próximo passo na sua carreira, o padrão Patricia Rios de qualidade espera por você.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link to="/catalogo">
                  <Button variant="primary" className="bg-brand-black text-brand-gold hover:bg-brand-gray px-12 py-5">
                    Menu de Serviços
                  </Button>
                </Link>
                <Link to="/academy">
                  <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-gold px-12 py-5">
                    Cursos & Mentoria
                  </Button>
                </Link>
            </div>
         </div>
      </section>

    </Layout>
  );
};

export default Home;
