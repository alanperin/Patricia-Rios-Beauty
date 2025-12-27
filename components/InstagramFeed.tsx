import React from 'react';

interface InstagramFeedProps {
  handle: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ handle }) => {
  // NOTE: In production, this would be the script tag or component provided by Behold.so or Elfsight.
  // For this demo, we simulate the visual output.
  
  const posts = [1, 2, 3, 4];

  return (
    <div className="w-full py-12 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-serif text-zinc-900 mb-2">Siga-nos no Instagram</h3>
            <p className="text-gold-600 font-medium">{handle}</p>
          </div>
          <a 
            href={`https://instagram.com/${handle.replace('@', '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm border-b border-zinc-900 pb-0.5 hover:text-gold-600 hover:border-gold-600 transition-colors"
          >
            Ver perfil completo
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((i) => (
            <div key={i} className="aspect-square bg-zinc-200 overflow-hidden relative group cursor-pointer">
              <img 
                src={`https://picsum.photos/400/400?random=${i + 20}`} 
                alt="Instagram Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.5.5 0 0 1 .948.064l.336 2.992a.5.5 0 0 0 .496.444l4.568.125a.5.5 0 0 1 .452.709l-3.336 7.425a.7.7 0 0 1-.639.414l-4.9.006z"></path><path d="M3.8 15.3l-1.3-.3a2 2 0 0 0-2.2 2.7l1.7 4.1a2 2 0 0 0 1.9 1.2h7.6a2 2 0 0 0 2-2v-4.5"></path></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;