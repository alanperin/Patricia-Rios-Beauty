import React from 'react';
import Layout, { PRLogo } from '../components/Layout';
import Button from '../components/Button';
import { useAcademy } from '../hooks/useContent';
import Loading from '../components/Loading';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Crown, Sparkles, MessageCircle } from 'lucide-react';

const Academy: React.FC = () => {
  const { products, loading } = useAcademy();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  if (loading) return <Loading fullScreen />;

  // CONFIGURAÇÃO DO WHATSAPP EXCLUSIVO DA ACADEMY
  const ACADEMY_WHATSAPP = '5566992551600';

  // Mensagens personalizadas para rastreio
  const heroWaMessage = encodeURIComponent("Olá! Estou no site da Academy (Topo) e gostaria de falar com você sobre minha carreira.");
  const ctaWaMessage = encodeURIComponent("Olá! Vim pelo site da Academy (Seção VIP) e quero saber mais sobre o atendimento exclusivo.");
  
  const heroWaLink = `https://wa.me/${ACADEMY_WHATSAPP}?text=${heroWaMessage}`;
  const ctaWaLink = `https://wa.me/${ACADEMY_WHATSAPP}?text=${ctaWaMessage}`;

  return (
    <Layout>
      {/* 1. HERO SECTION: AUTHORITY & PROMISE */}
      <section className="relative min-h-screen flex items-center bg-brand-brown text-brand-cream overflow-hidden">
         {/* Background & Grain */}
         <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/90 to-transparent z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000&auto=format&fit=crop" 
               alt="Mentoria Patricia Rios" 
               className="w-full h-full object-cover object-right opacity-60"
             />
         </motion.div>

         <div className="relative z-20 max-w-[1400px] mx-auto px-6 pt-20 w-full">
            <div className="max-w-3xl">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                  className="flex items-center gap-3 mb-6"
                >
                    <span className="bg-brand-gold text-brand-brown text-[10px] uppercase font-bold px-3 py-1 tracking-widest shadow-[0_0_15px_rgba(197,160,89,0.5)]">
                        Para Profissionais
                    </span>
                    <div className="h-[1px] w-20 bg-brand-white/20"></div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-white leading-[1.1] mb-8"
                >
                  De Esteticista a <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#FBF5E5] to-brand-gold italic">Empresária de Elite</span>.
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl font-light text-brand-white/80 leading-relaxed mb-10 max-w-2xl font-sans"
                >
                  Não venda apenas horas. <strong>Venda Transformação.</strong> Domine as técnicas de <strong>Micropigmentação Realista</strong> e o posicionamento de marca que me fizeram faturar múltiplos 6 dígitos.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                   <a href="#cursos">
                     <Button variant="primary" className="px-10 py-5 text-sm shadow-xl shadow-brand-gold/10">
                        Ver Formações
                     </Button>
                   </a>
                   <a href={heroWaLink} target="_blank" rel="noopener noreferrer">
                     <Button variant="outline-light" className="px-10 py-5 text-sm hover:bg-brand-white hover:text-brand-brown">
                        Fale Comigo
                     </Button>
                   </a>
                </motion.div>
            </div>
         </div>
      </section>

      {/* 2. THE STATS (AUTHORITY BAR) */}
      <section className="bg-brand-brown border-t border-brand-white/5 py-12 md:py-16 relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
               { icon: Users, label: "Alunas Formadas", value: "+500" },
               { icon: TrendingUp, label: "Faturamento Médio/Aluna", value: "3x" },
               { icon: Crown, label: "Reconhecimento", value: "Internacional" },
               { icon: CheckCircle2, label: "Satisfação", value: "100%" },
            ].map((stat, idx) => (
               <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="mb-4 p-3 rounded-full border border-brand-gold/20 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-brown transition-all duration-500">
                     <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl md:text-4xl font-serif text-brand-white mb-1">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-white/50 font-sans">{stat.label}</span>
               </div>
            ))}
         </div>
      </section>

      {/* 3. THE PRODUCTS (DARK LUXURY CARDS) */}
      <section id="cursos" className="py-24 md:py-32 bg-brand-cream relative">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-20">
               <span className="text-brand-brown uppercase tracking-[0.3em] text-xs font-bold mb-4 block font-sans opacity-60">O Ecossistema</span>
               <h2 className="text-4xl md:text-6xl font-serif text-brand-brown">Escolha sua <span className="italic text-brand-gold">Jornada</span></h2>
            </div>

            <div className="flex flex-col gap-12 lg:gap-24">
               {products.map((product, index) => {
                  // Link dinâmico para cada produto
                  const productWaMessage = encodeURIComponent(`Olá! Vim pelo site da Academy e tenho muito interesse no: *${product.title}*. Poderia me passar os detalhes?`);
                  const productLink = `https://wa.me/${ACADEMY_WHATSAPP}?text=${productWaMessage}`;

                  return (
                    <motion.div 
                       key={product.id}
                       initial={{ opacity: 0, y: 50 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ duration: 0.8 }}
                       className="group relative bg-brand-brown rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[500px] lg:min-h-[450px]"
                    >
                       {/* Image Section */}
                       <div className={`w-full lg:w-1/2 relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                          <div className="absolute inset-0 bg-brand-gold/10 z-10 mix-blend-overlay"></div>
                          <img 
                             src={product.imageUrl} 
                             alt={product.title} 
                             className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                          />
                          <div className="absolute top-6 left-6 z-20">
                             <span className="bg-brand-white/95 backdrop-blur-md text-brand-brown text-[10px] uppercase font-bold px-4 py-2 font-sans tracking-widest shadow-lg">
                                {product.type}
                             </span>
                          </div>
                       </div>

                       {/* Content Section */}
                       <div className={`w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-20 ${index % 2 === 1 ? 'lg:order-1 text-right items-end' : 'lg:order-2 text-left items-start'}`}>
                          {/* Decorative Background Icon */}
                          <div className={`absolute top-1/2 -translate-y-1/2 text-brand-white/5 pointer-events-none ${index % 2 === 1 ? 'left-10' : 'right-10'}`}>
                             <PRLogo className="w-64 h-64" />
                          </div>

                          <h3 className="text-3xl md:text-5xl font-serif text-brand-white mb-6 leading-tight">
                             {product.title}
                          </h3>
                          <p className={`text-brand-white/70 font-light font-sans text-base md:text-lg mb-8 leading-relaxed max-w-md ${index % 2 === 1 ? 'ml-auto' : 'mr-auto'}`}>
                             {product.description}
                          </p>
                          
                          <div className="flex flex-col gap-4 w-full sm:w-auto">
                             <ul className={`text-sm text-brand-gold mb-8 space-y-2 font-sans ${index % 2 === 1 ? 'items-end' : 'items-start'}`}>
                                <li className="flex items-center gap-2"><Sparkles className="w-3 h-3" /> Certificado de Excelência</li>
                                <li className="flex items-center gap-2"><Sparkles className="w-3 h-3" /> Suporte VIP</li>
                                <li className="flex items-center gap-2"><Sparkles className="w-3 h-3" /> Material Didático Premium</li>
                             </ul>

                             <a href={productLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <Button variant="primary" className={`w-full sm:w-auto px-8 py-4 ${index % 2 === 1 ? 'ml-auto' : ''}`}>
                                   Aplicar para Vaga
                                </Button>
                             </a>
                          </div>
                       </div>
                    </motion.div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* 4. THE EXCLUSIVE CTA (NO EMAIL FORM) */}
      <section className="py-24 md:py-32 bg-brand-gold relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-brand-gold via-brand-gold to-[#B89248]"></div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8 }}
               className="bg-brand-brown text-brand-white p-10 md:p-16 rounded-sm shadow-2xl border border-brand-white/10"
            >
               <Crown className="w-12 h-12 text-brand-gold mx-auto mb-6" />
               <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  Pronta para o <br/><span className="text-brand-gold italic">Próximo Nível?</span>
               </h2>
               <p className="text-brand-white/80 text-lg mb-10 font-light font-sans max-w-xl mx-auto">
                  Não abrimos inscrições públicas frequentemente. Nossas turmas são reduzidas para garantir a qualidade da mentoria.
                  <br/><br/>
                  Clique abaixo para falar diretamente com meu time de concierges e verificar a disponibilidade para sua região.
               </p>
               
               <a href={ctaWaLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" className="px-10 py-5 text-base w-full md:w-auto flex items-center justify-center gap-3 shadow-glow hover:scale-105 transition-transform">
                     <MessageCircle className="w-5 h-5" />
                     Iniciar Atendimento VIP no WhatsApp
                  </Button>
               </a>
               <p className="mt-6 text-[10px] text-brand-white/30 uppercase tracking-widest">
                  Atendimento Exclusivo • Resposta em até 2 horas
               </p>
            </motion.div>
         </div>
      </section>

    </Layout>
  );
};

export default Academy;