import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout, { PRLogo } from '../components/Layout';
import { useServices, useUnits, useAcademy, useTestimonials } from '../hooks/useContent';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, GraduationCap, Award, BookOpen, Quote, ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax slower
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

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
      const scrollAmount = carouselRef.current.clientWidth * 0.6;
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
  }, [featuredServices]); 

  const isLoading = servicesLoading || unitsLoading || academyLoading || testimonialsLoading;

  if (isLoading) {
    return <Loading fullScreen />;
  }

  const initialTestimonials = testimonials.slice(0, 3);
  const moreTestimonials = testimonials.slice(3);

  return (
    <Layout>
      {/* SECTION 1: MODERN EDITORIAL HERO */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-brand-brown">
        {/* Parallax Image Background */}
        <motion.div style={{ y: y1, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-transparent to-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1594744803329-a584af1dd51e?q=80&w=2787&auto=format&fit=crop" 
            alt="Patricia Rios High Fashion" 
            className="w-full h-[120%] object-cover object-top opacity-90 brightness-95"
          />
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 max-w-[1400px] mx-auto px-6">
          <motion.div style={{ y: yText }} className="max-w-5xl">
             {/* Editorial Label */}
             <div className="flex items-center gap-4 mb-6 md:mb-8 overflow-hidden">
                <motion.div 
                  initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: "circOut" }}
                  className="h-[1px] w-12 md:w-20 bg-brand-gold"
                ></motion.div>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-brand-gold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs font-bold font-sans"
                >
                  High-End Beauty & Education
                </motion.span>
             </div>

             {/* Staggered Headline Reveal */}
             <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-serif text-brand-white leading-[0.85] tracking-tighter mb-8 md:mb-12">
                <div className="overflow-hidden">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                    PATRÍCIA
                  </motion.div>
                </div>
                <div className="overflow-hidden flex items-baseline gap-4">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="italic text-brand-gold font-light pr-4">
                    RIOS
                  </motion.div>
                </div>
             </h1>

             {/* Description & CTA */}
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-brand-white/20 pt-8 md:pt-10">
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                  className="text-brand-white/80 text-base md:text-xl font-light max-w-xl leading-relaxed font-sans"
                >
                  Especialista em Micropigmentação Realista e Mentora de Profissionais de Elite. Onde a arte encontra a técnica de precisão.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
                  className="flex gap-4 md:gap-6"
                >
                   <Link to="/catalogo">
                     <Button variant="outline-light" className="px-10 py-4 hover:bg-brand-white hover:text-brand-brown">Agendar Visita</Button>
                   </Link>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY - Asymmetric Layout */}
      <section className="py-24 md:py-40 bg-brand-cream relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
                
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 relative">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="relative z-10 overflow-hidden rounded-sm"
                    >
                        <img 
                          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop" 
                          alt="Atendimento Patricia Rios" 
                          className="w-full aspect-[3/4] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>
                    
                    {/* Floating Element */}
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                      viewport={{ once: true }}
                      className="absolute -bottom-10 -right-4 md:-right-10 z-20 bg-brand-brown text-brand-gold p-6 md:p-10 max-w-xs shadow-2xl"
                    >
                       <p className="font-serif italic text-2xl md:text-3xl leading-tight">"A beleza está na harmonia, não no excesso."</p>
                    </motion.div>
                </div>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2 lg:pt-20">
                    <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block font-sans">A Filosofia</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-brown mb-10 leading-[0.9]">
                      Naturalidade <br/>que <span className="italic text-brand-gold">empodera</span>.
                    </h2>
                    <p className="text-brand-gray text-lg md:text-xl leading-loose mb-16 font-light font-sans">
                      Cada rosto é uma tela única. Meus atendimentos são pautados no visagismo emocional, buscando resgatar a autoestima através de técnicas que respeitam a anatomia e a história de cada cliente.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <div className="w-12 h-12 rounded-full border border-brand-brown/10 flex items-center justify-center mb-6 text-brand-gold">
                               <Star className="w-5 h-5" />
                            </div>
                            <h4 className="text-brand-brown font-serif text-2xl mb-3">Exclusividade</h4>
                            <p className="text-brand-gray text-sm font-sans leading-relaxed">Protocolos personalizados desenhados especificamente para o seu biotipo facial e estilo de vida.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 rounded-full border border-brand-brown/10 flex items-center justify-center mb-6 text-brand-gold">
                               <Award className="w-5 h-5" />
                            </div>
                            <h4 className="text-brand-brown font-serif text-2xl mb-3">Excelência</h4>
                            <p className="text-brand-gray text-sm font-sans leading-relaxed">Uso exclusivo de insumos de padrão internacional e técnicas de vanguarda no mercado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES - Horizontal Scroll Modern */}
      <section className="py-24 md:py-40 bg-brand-white border-t border-brand-brown/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 px-4">
            <div>
              <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block font-sans">Menu Curado</span>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-brown tracking-tight leading-none">
                Procedimentos <br/><span className="italic text-brand-gold ml-8">Exclusivos</span>
              </h3>
            </div>
            
            <div className="flex gap-4 mt-8 md:mt-0">
               <button 
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="w-14 h-14 border border-brand-brown/10 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-brand-gold transition-all duration-300 disabled:opacity-20"
               >
                  <ArrowRight className="w-6 h-6 rotate-180" />
               </button>
               <button 
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="w-14 h-14 border border-brand-brown/10 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-brand-gold transition-all duration-300 disabled:opacity-20"
               >
                  <ArrowRight className="w-6 h-6" />
               </button>
            </div>
          </div>

          <div 
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing px-4"
          >
            {featuredServices.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[85vw] sm:min-w-[400px] md:min-w-[450px] snap-start group"
              >
                <Link to="/catalogo" className="block h-full">
                  <div className="relative aspect-[3/4] overflow-hidden mb-8">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-brown/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white text-brand-brown text-[10px] uppercase font-bold px-4 py-2 tracking-widest font-sans">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start border-b border-brand-brown/10 pb-6 group-hover:border-brand-gold/50 transition-colors">
                     <div>
                        <h4 className="text-brand-brown font-serif text-3xl mb-2 group-hover:text-brand-gold transition-colors">{service.title}</h4>
                        <p className="text-brand-gray text-sm font-sans font-light">{service.duration}</p>
                     </div>
                     <span className="text-brand-brown font-serif text-xl group-hover:translate-x-2 transition-transform">{service.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ACADEMY - Clean & Impactful */}
      <section id="academy" className="py-24 md:py-40 bg-brand-cream relative">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                {/* Title Col */}
                <div className="lg:col-span-5 sticky top-32 self-start">
                    <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block font-sans">Education</span>
                    <h2 className="text-6xl md:text-8xl font-serif text-brand-brown leading-none mb-10">
                      PR <br/><span className="italic text-brand-gold">Academy</span>
                    </h2>
                    <p className="text-brand-gray text-xl font-light font-sans leading-relaxed mb-12">
                      Transformamos esteticistas em empresárias da beleza de alto faturamento. Domine a técnica e a gestão.
                    </p>
                    <Link to="/academy">
                      <Button variant="primary" className="bg-brand-brown text-brand-gold hover:bg-brand-gold hover:text-brand-brown px-10 py-4 w-full md:w-auto">
                         Explorar Cursos
                      </Button>
                    </Link>
                    
                    <div className="mt-20 flex flex-col gap-6 border-l border-brand-brown/10 pl-8">
                       <div className="flex items-center gap-4">
                          <span className="text-4xl font-serif text-brand-gold">500+</span>
                          <span className="text-xs uppercase tracking-widest text-brand-brown">Alunas<br/>Formadas</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-4xl font-serif text-brand-gold">100%</span>
                          <span className="text-xs uppercase tracking-widest text-brand-brown">Aprovação<br/>Técnica</span>
                       </div>
                    </div>
                </div>

                {/* Products Col */}
                <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-20 lg:mt-20">
                    {academyProducts.map((product, idx) => (
                        <motion.div 
                          key={product.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="group relative cursor-pointer"
                        >
                            <div className="aspect-[16/9] overflow-hidden mb-6 rounded-sm relative">
                                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                                <div className="absolute top-6 left-6 bg-brand-white text-brand-brown text-[10px] uppercase font-bold px-3 py-1 font-sans tracking-widest">
                                   {product.type}
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                   <h3 className="text-3xl md:text-4xl font-serif text-brand-brown mb-3 group-hover:text-brand-gold transition-colors">{product.title}</h3>
                                   <p className="text-brand-gray font-light max-w-md text-sm md:text-base">{product.description}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-brand-brown/20 flex items-center justify-center text-brand-brown group-hover:bg-brand-brown group-hover:text-brand-gold transition-all duration-300">
                                   <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS - Clean Grid */}
      <section className="py-24 md:py-40 bg-brand-champagne relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block font-sans">Social Proof</span>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-brown">Vozes Reais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialTestimonials.map((testimonial, idx) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-white p-10 relative group hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="text-6xl text-brand-gold/20 font-serif absolute top-6 right-8">"</div>
                <p className="text-brand-gray text-lg italic font-light mb-8 relative z-10 leading-relaxed font-serif">
                  {testimonial.text}
                </p>
                <div className="flex flex-col border-t border-brand-brown/5 pt-6">
                  <span className="text-brand-brown font-serif text-xl">{testimonial.name}</span>
                  <span className="text-brand-gold text-[10px] uppercase tracking-widest font-bold font-sans mt-1">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/catalogo">
                <span className="inline-block border-b border-brand-brown text-brand-brown uppercase tracking-widest text-xs py-2 hover:text-brand-gold hover:border-brand-gold transition-colors cursor-pointer">
                    Ver todos os relatos
                </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: UNIDADES - Split Screen */}
      <section className="bg-brand-brown text-brand-white">
          {units.map((unit, idx) => (
              <div key={unit.slug} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[80vh]`}>
                  <div className="w-full lg:w-1/2 relative overflow-hidden group">
                      <img src={unit.heroImage} alt={unit.name} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                  </div>
                  <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center bg-brand-brown relative z-10">
                      <div className="mb-8 flex items-center gap-3">
                          <MapPin className="text-brand-gold w-5 h-5" />
                          <span className="text-brand-gold text-xs uppercase tracking-widest">{unit.city}</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-none">{unit.name}</h2>
                      <p className="text-brand-white/70 text-lg font-light leading-relaxed mb-12 max-w-xl">
                          {unit.description.substring(0, 150)}...
                      </p>
                      <Link to={`/unidade/${unit.slug}`}>
                          <Button variant="outline-light" className="px-10 py-4 hover:bg-brand-white hover:text-brand-brown">
                              Explorar Unidade
                          </Button>
                      </Link>
                  </div>
              </div>
          ))}
      </section>

      {/* SECTION 7: FINAL CTA - Minimalist & Bold */}
      <section className="py-32 md:py-48 bg-brand-gold relative overflow-hidden flex items-center justify-center">
         <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-serif text-brand-brown mb-12 leading-[0.85] tracking-tight">
               Agende sua <br/>transformação.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/catalogo">
                  <Button variant="primary" className="bg-brand-white text-brand-brown hover:bg-brand-brown hover:text-brand-white px-12 py-5 shadow-2xl min-w-[250px] text-sm">
                    Menu de Serviços
                  </Button>
                </Link>
                <Link to="/academy">
                  <Button variant="primary" className="bg-brand-brown text-brand-gold hover:bg-brand-white hover:text-brand-brown px-12 py-5 shadow-xl min-w-[250px] text-sm">
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