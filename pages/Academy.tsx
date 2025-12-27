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
      <div className="pt-24 md:pt-32 pb-20 md:pb-24 bg-brand-cream min-h-screen text-brand-brown">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Header */}
          <div className="mb-16 md:mb-24 animate-fade-in max-w-4xl">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block font-sans">Nível Profissional</span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-brand-brown leading-none mb-6 md:mb-10">PR Academy</h1>
            <p className="text-brand-gray text-lg md:text-2xl font-light font-sans leading-relaxed border-l-2 border-brand-gold pl-6">
              O ecossistema educacional de Patrícia Rios. Transformamos esteticistas em empresárias da beleza de alto faturamento.
            </p>
          </div>

          {/* Grid of Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-32">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-brand-brown/5 overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 rounded-sm"
              >
                <div className="h-64 md:h-80 overflow-hidden relative">
                   <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                   <div className="absolute bottom-6 left-6">
                      <span className="bg-brand-brown text-brand-gold text-[10px] uppercase font-bold px-4 py-2 font-sans tracking-widest shadow-lg">
                         {product.type}
                      </span>
                   </div>
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-xl md:text-2xl font-serif text-brand-brown mb-6 group-hover:text-brand-gold transition-colors">{product.title}</h3>
                  <p className="text-brand-gray text-sm font-light leading-relaxed mb-10 font-sans">
                    {product.description}
                  </p>
                  <Button variant="outline" className="w-full">
                     Ver Detalhes do Curso
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Waitlist Section */}
          <div className="relative py-16 md:py-24 px-6 md:px-12 bg-brand-gold overflow-hidden text-brand-brown text-center rounded-sm shadow-xl">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none text-brand-white flex items-center justify-center font-serif text-[20vw] italic select-none">Academy</div>
             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-6 text-brand-brown">Próximas Turmas</h2>
                <p className="text-brand-brown/80 text-base md:text-lg mb-8 md:mb-12 font-sans font-medium">
                  Nossos cursos presenciais e mentorias VIP possuem vagas limitadas. Inscreva-se para ser notificada sobre a abertura de novas turmas.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="flex-1 px-6 py-4 bg-brand-white/80 backdrop-blur-sm border border-brand-brown/10 text-brand-brown placeholder-brand-brown/50 focus:outline-none focus:border-brand-brown transition-colors font-sans rounded-sm shadow-inner w-full" 
                  />
                  <Button variant="primary" className="bg-brand-brown text-brand-gold hover:bg-brand-white hover:text-brand-brown whitespace-nowrap px-10 shadow-xl w-full md:w-auto">
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