import React from 'react';
import { PRLogo } from './Layout';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-brand-cream z-50 flex flex-col items-center justify-center">
        <div className="relative">
           <PRLogo className="w-16 h-16 text-brand-gold animate-pulse" color="#C5A059" />
           <div className="absolute top-0 left-0 w-full h-full animate-ping opacity-20 bg-brand-gold rounded-full blur-xl"></div>
        </div>
        <span className="mt-8 text-[10px] uppercase tracking-[0.4em] text-brand-brown/40 font-sans animate-fade-in">
          Carregando
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-64 flex flex-col items-center justify-center bg-brand-white rounded-sm border border-brand-brown/5 shadow-sm">
       <PRLogo className="w-8 h-8 text-brand-gold/50 animate-pulse mb-4" color="#C5A059" />
       <span className="text-[9px] uppercase tracking-widest text-brand-brown/20 font-sans">
          Atualizando...
       </span>
    </div>
  );
};

export default Loading;