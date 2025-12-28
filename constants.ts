
import { ServiceCategory, ServiceItem, UnitConfig, AcademyProduct, Testimonial } from './types';

/**
 * ==============================================================================
 * ARQUIVO DE CONFIGURAÇÃO GERAL E CONTEÚDO
 * ------------------------------------------------------------------------------
 * Para alterar as imagens, substitua os links dentro de 'imageUrl'.
 * Você pode usar links do Google Drive (públicos), Hospedagem de Imagens ou URL do seu site.
 * ==============================================================================
 */

// WhatsApp central para agendamentos do catálogo (Atualizado para o número da unidade Sorriso)
export const MAIN_WHATSAPP = '5566999137037'; 

export const ACADEMY_PRODUCTS: AcademyProduct[] = [
  {
    id: 'mentoria-vip',
    title: 'Mentoria VIP Individual',
    type: 'Mentoria',
    description: 'Acompanhamento exclusivo para profissionais que desejam elevar seu ticket médio e dominar técnicas avançadas de gestão e micropigmentação.',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'curso-nanoblading',
    title: 'Expert em Nanoblading',
    type: 'Presencial',
    description: 'Imersão técnica completa na metodologia Patricia Rios. Do desenho artístico à aplicação perfeita.',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'infoproduto-mapeamento',
    title: 'Masterclass: Mapeamento Áureo',
    type: 'Online',
    description: 'Workshop digital focado na simetria perfeita. O segredo por trás dos olhares mais desejados do Brasil.',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    role: 'Cliente',
    text: 'A Patrícia transformou meu olhar. A técnica de Nanoblading é tão natural que ninguém percebe que fiz um procedimento, apenas comentam como estou mais radiante.',
  },
  {
    id: '2',
    name: 'Letícia Costa',
    role: 'Aluna Academy',
    text: 'O curso de Nanoblading mudou minha carreira. Saí da mentoria com segurança total para aplicar a técnica e meu faturamento dobrou em apenas 3 meses.',
  },
  {
    id: '3',
    name: 'Ana Paula Rocha',
    role: 'Cliente',
    text: 'O atendimento no Loft Beauty é impecável. Desde o café até o resultado final, tudo respira luxo e profissionalismo. Vale cada centavo do investimento.',
  },
  {
    id: '4',
    name: 'Bárbara Mendes',
    role: 'Aluna Academy',
    text: 'A mentoria VIP foi o divisor de águas que eu precisava. A visão estratégica da Patrícia sobre o mercado da beleza é algo que você não encontra em nenhum outro lugar.',
  },
  {
    id: '5',
    name: 'Camila Oliveira',
    role: 'Cliente',
    text: 'Fiz a revitalização labial e estou apaixonada. A cor ficou perfeita e super natural. Acordar pronta todos os dias não tem preço.',
  },
  {
    id: '6',
    name: 'Juliana Ferreira',
    role: 'Aluna Academy',
    text: 'Os conteúdos digitais são riquíssimos. Mesmo sendo online, a clareza da explicação da Patrícia faz parecer que ela está do seu lado.',
  }
];

export const SERVICES: ServiceItem[] = [
  // ==========================================================================
  // CATEGORIA: MICROPIGMENTAÇÃO
  // ==========================================================================
  {
    id: 'nanoblading',
    title: 'Nanoblading Fio a Fio',
    description: 'Técnica hiper-realista que desenha fios ultrafinos, seguindo o caimento natural da sua sobrancelha. Ideal para preencher falhas e dar volume sem perder a leveza.',
    price: 'A partir de R$ 850,00',
    category: ServiceCategory.MICROPIGMENTACAO,
    duration: '2h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1588006173599-2a9000a98343?q=80&w=1000&auto=format&fit=crop', 
    featured: true,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'micro-labial-revitalizacao',
    title: 'Revitalização Labial',
    description: 'Procedimento que devolve a cor saudável aos lábios (efeito lip tint), define o contorno sutilmente e estimula colágeno. Adeus ao batom diário.',
    price: 'A partir de R$ 750,00',
    category: ServiceCategory.MICROPIGMENTACAO,
    duration: '2h',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'micro-labial-neutralizacao',
    title: 'Neutralização Labial',
    description: 'Protocolo especializado para clarear e uniformizar lábios escuros ou manchados, preparando a base para receber tons mais rosados ou naturais.',
    price: 'A partir de R$ 800,00',
    category: ServiceCategory.MICROPIGMENTACAO,
    duration: '2h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1617391654470-7634f378a9c2?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'shadow-line',
    title: 'Shadow Line',
    description: 'Combinação perfeita entre fios realistas e um leve sombreado ao fundo para maior densidade e definição. Ideal para quem gosta de um efeito levemente maquiado.',
    price: 'A partir de R$ 900,00',
    category: ServiceCategory.MICROPIGMENTACAO,
    duration: '2h 45m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1620052309789-a2a1b94d8234?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso']
  },

  // ==========================================================================
  // CATEGORIA: DESIGN & OLHAR
  // ==========================================================================
  {
    id: 'design-personalizado',
    title: 'Design de Sobrancelhas Personalizado',
    description: 'Mapeamento geométrico facial para encontrar o formato ideal para o seu rosto. Limpeza estratégica que valoriza o olhar.',
    price: 'A partir de R$ 60,00',
    category: ServiceCategory.DESIGN_OLHAR,
    duration: '45m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'design-henna',
    title: 'Design com Aplicação de Henna',
    description: 'Design completo finalizado com henna de alta fixação. Proporciona um efeito de preenchimento temporário e definição marcante.',
    price: 'A partir de R$ 85,00',
    category: ServiceCategory.DESIGN_OLHAR,
    duration: '1h',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'lash-lifting',
    title: 'Lash Lifting & Tintura',
    description: 'Curvatura e coloração dos seus cílios naturais. Cria um efeito de rímel duradouro, abrindo o olhar sem a necessidade de extensões.',
    price: 'A partir de R$ 220,00',
    category: ServiceCategory.DESIGN_OLHAR,
    duration: '1h 15m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1587779782352-7b0f796120b4?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'brow-lamination',
    title: 'Brow Lamination',
    description: 'Técnica que alinha os fios naturais da sobrancelha para cima, criando um visual mais cheio, moderno e fashionista.',
    price: 'A partir de R$ 190,00',
    category: ServiceCategory.DESIGN_OLHAR,
    duration: '1h',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso']
  },
  {
    id: 'microagulhamento-sobrancelha',
    title: 'Microagulhamento de Sobrancelhas',
    description: 'Estimulação do crescimento dos fios através de microagulhamento com fatores de crescimento. Ideal para recuperar falhas naturais.',
    price: 'A partir de R$ 180,00',
    category: ServiceCategory.DESIGN_OLHAR,
    duration: '1h',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },

  // ==========================================================================
  // CATEGORIA: CABELO
  // ==========================================================================
  {
    id: 'corte-terapeutico',
    title: 'Corte Terapêutico & Visagismo',
    description: 'Mais que um corte, uma consultoria de imagem. Analisamos seu formato de rosto e textura de fio para criar um look que te representa.',
    price: 'A partir de R$ 150,00',
    category: ServiceCategory.CABELO,
    duration: '1h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'tratamento-capilar',
    title: 'Protocolo de Reconstrução Capilar',
    description: 'Tratamento profundo para fios danificados. Devolve a massa, o brilho e a maciez do cabelo através de ativos nobres.',
    price: 'A partir de R$ 250,00',
    category: ServiceCategory.CABELO,
    duration: '1h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'mechas-criativas',
    title: 'Mechas Criativas & Iluminação',
    description: 'Técnicas de Morena Iluminada, Babylights ou Contour. Preservamos a saúde do fio enquanto criamos pontos de luz estratégicos.',
    price: 'Sob Consulta',
    category: ServiceCategory.CABELO,
    duration: '4h+',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso']
  },

  // ==========================================================================
  // CATEGORIA: MANICURE & SPA
  // ==========================================================================
  {
    id: 'spa-maos-pes',
    title: 'Spa dos Pés e Mãos',
    description: 'Ritual de relaxamento com esfoliação, hidratação profunda e massagem, finalizado com esmaltação perfeita.',
    price: 'A partir de R$ 120,00',
    category: ServiceCategory.MANICURE,
    duration: '1h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'unhas-gel',
    title: 'Alongamento em Gel / Fibra',
    description: 'Unhas longas, resistentes e com acabamento ultra natural. Diversos formatos disponíveis (Amendoado, Stiletto, Bailarina).',
    price: 'A partir de R$ 200,00',
    category: ServiceCategory.MANICURE,
    duration: '2h',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'blindagem-diamante',
    title: 'Blindagem de Diamante',
    description: 'Proteção extra para suas unhas naturais, garantindo que o esmalte dure até 3x mais sem descascar.',
    price: 'A partir de R$ 150,00',
    category: ServiceCategory.MANICURE,
    duration: '1h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso']
  },
  
  // ==========================================================================
  // CATEGORIA: ESTÉTICA FACIAL
  // ==========================================================================
  {
    id: 'limpeza-pele-premium',
    title: 'Limpeza de Pele Premium',
    description: 'Higienização profunda com extração de comedões, peeling ultrassônico e máscara de LED para uma pele renovada.',
    price: 'A partir de R$ 180,00',
    category: ServiceCategory.FACIAL,
    duration: '1h 30m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'buco-linha',
    title: 'Epilação de Buço (Egípcia)',
    description: 'Remoção dos pêlos do buço com linha, garantindo acabamento perfeito e duradouro sem agredir a pele sensível da região.',
    price: 'A partir de R$ 30,00',
    category: ServiceCategory.FACIAL,
    duration: '15m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1000&auto=format&fit=crop', // Imagem reutilizada de rosto
    featured: false,
    availableIn: ['sorriso', 'chapadao']
  },
  {
    id: 'drenagem-facial',
    title: 'Drenagem Linfática Facial',
    description: 'Massagem suave que reduz o inchaço, melhora a circulação e define o contorno do rosto. Perfeito para pré-make.',
    price: 'A partir de R$ 100,00',
    category: ServiceCategory.FACIAL,
    duration: '45m',
    // TROQUE A IMAGEM ABAIXO
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    availableIn: ['sorriso']
  }
];

export const UNITS: Record<string, UnitConfig> = {
  sorriso: {
    slug: 'sorriso',
    name: 'Loft Beauty Sorriso',
    city: 'Sorriso - MT',
    address: 'Rua Cândido Rondon, 2795 - Sala 05 - Centro, Sorriso - MT, 78890-179',
    whatsapp: '5566999137037', 
    whatsappDisplay: '(66) 9 9913-7037', 
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.266872528768!2d-55.7203619!3d-12.5471389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93a0b66113b52d77%3A0x66f600371465227!2sRua%20C%C3%A2ndido%20Rondon%2C%202795%20-%20Centro%2C%20Sorriso%20-%20MT%2C%2078890-000!5e0!3m2!1spt-BR!2sbr!4v1709220000000!5m2!1spt-BR!2sbr', 
    instagramHandle: '@patriciarios.sorriso',
    // TROQUE A IMAGEM DA UNIDADE SORRISO ABAIXO
    heroImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2000&auto=format&fit=crop',
    description: 'Um santuário dedicado à autoestima no coração de Sorriso. Projetado com arquitetura minimalista e sensorial, nosso Loft oferece um ambiente onde o luxo encontra o acolhimento. Cada detalhe, da iluminação à aromaterapia, foi pensado para desconectar você do mundo lá fora e focar no seu momento.',
    amenities: [
      'Ambiente Climatizado',
      'Menu de Cafés Especiais',
      'Wi-Fi de Alta Velocidade',
      'Aromaterapia',
      'Concierge Exclusivo',
      'Estacionamento Privativo'
    ],
    galleryImages: [
      // TROQUE AS IMAGENS DA GALERIA ABAIXO
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  chapadao: {
    slug: 'chapadao', 
    name: 'Loft Beauty Chapadão',
    city: 'Chapadão do Sul - MS',
    address: 'Av. Oito, 832 - Centro, Chapadão do Sul - MS, 79560-000',
    whatsapp: '556735624335',
    whatsappDisplay: '(67) 3562-4335',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.1983577382!2d-52.6247!3d-18.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x949021c17293f91f%3A0x123456789!2sAv.%20Oito%2C%20832%20-%20Centro%2C%20Chapad%C3%A3o%20do%20Sul%20-%20MS%2C%2079560-000!5e0!3m2!1spt-BR!2sbr', 
    instagramHandle: '@patriciarios.chapadao',
    // TROQUE A IMAGEM DA UNIDADE CHAPADÃO ABAIXO
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop',
    description: 'Sofisticação e tecnologia em Chapadão do Sul. Nosso espaço combina design contemporâneo com tecnologia de ponta para oferecer tratamentos de alta performance. Um ambiente intimista, ideal para quem busca privacidade e resultados excepcionais.',
    amenities: [
      'Lounge de Espera VIP',
      'Champagne Bar',
      'Avaliação Visagista',
      'Som Ambiente Curado',
      'Área de Fotos',
      'Consultoria Personalizada'
    ],
    galleryImages: [
      // TROQUE AS IMAGENS DA GALERIA ABAIXO
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595514020180-7212f71695e9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop'
    ]
  }
};

export const INSTAGRAM_WIDGET_ID = 'e9f9c9a0-1234-5678-9012-345678901234';
