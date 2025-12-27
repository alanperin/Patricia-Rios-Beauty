
import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useAcademy } from '../hooks/useContent';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Academy: React.FC = () => {
  // Hook de Dados
  const { products, loading } = useAcademy();

  if (loading) return <Loading fullScreen />;

  return (
    <Layout>
      <div className="pt-32 pb-24 bg-brand-black min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Header */}
          <div className="mb-24 animate-fade-in max-w-4xl">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block font-sans">Nível Profissional</span>
            <h1 className="text-6xl md:text-9xl font-serif text-brand-white leading-none mb-10">PR Academy</h1>
            <p className="text-brand-white/60 text-xl md:text-2xl font-light font-sans leading-relaxed">
              O ecossistema educacional de Patrícia Rios. Transformamos esteticistas em empresárias da beleza de alto faturamento através de técnicas exclusivas e visão estratégica.
            </p>
          </div>

          {/* Grid of Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-gray/30 border border-brand-white/5 overflow-hidden group"
              >
                <div className="h-80 overflow-hidden relative">
                   <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                   <div className="absolute bottom-6 left-6">
                      <span className="bg-brand-gold text-brand-black text-[10px] uppercase font-bold px-4 py-2 font-sans tracking-widest">
                         {product.type}
                      </span>
                   </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-serif text-brand-white mb-6">{product.title}</h3>
                  <p className="text-brand-white/50 text-sm font-light leading-relaxed mb-10 font-sans">
                    {product.description}
                  </p>
                  <Button variant="outline" className="w-full text-brand-gold border-brand-gold hover:bg-brand-gold hover:text-brand-black">
                     Ver Detalhes do Curso
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Waitlist Section */}
          <div className="relative py-24 px-12 bg-brand-gold overflow-hidden text-brand-black text-center">
             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none text-brand-black flex items-center justify-center font-serif text-[20vw] italic select-none">Academy</div>
             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif mb-6">Próximas Turmas</h2>
                <p className="text-brand-black/70 text-lg mb-12 font-sans">
                  Nossos cursos presenciais e mentorias VIP possuem vagas limitadas. Inscreva-se para ser notificada sobre a abertura de novas turmas e conteúdos exclusivos.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="flex-1 px-6 py-4 bg-brand-black/5 border border-brand-black/20 text-brand-black placeholder-brand-black/40 focus:outline-none focus:border-brand-black transition-colors font-sans" 
                  />
                  <Button variant="primary" className="bg-brand-black text-brand-gold hover:bg-brand-gray whitespace-nowrap px-10">
                    Entrar na Lista VIP
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Academy;
