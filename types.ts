

export enum ServiceCategory {
  MICROPIGMENTACAO = 'Micropigmentação',
  DESIGN_OLHAR = 'Design & Olhar',
  CABELO = 'Cabelo',
  MANICURE = 'Manicure & Spa',
  FACIAL = 'Estética Facial'
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string; // Formatted price or "Sob Consulta"
  category: ServiceCategory;
  imageUrl?: string;
  duration?: string;
  featured: boolean;
}

export interface UnitConfig {
  slug: string;
  name: string;
  city: string;
  address: string;
  whatsapp: string; // Clean number for API
  whatsappDisplay: string;
  mapEmbedUrl: string; // Google Maps Embed src
  instagramHandle: string;
  heroImage: string;
  // New Fields for High-End Page
  description: string; // Inspirational text about the unit
  amenities: string[]; // List of perks (e.g., "Cappuccino", "Valet")
  galleryImages: string[]; // URLs for the interior gallery
}

export interface NavLink {
  label: string;
  path: string;
  isButton?: boolean;
}

export interface AcademyProduct {
  id: string;
  title: string;
  type: 'Presencial' | 'Online' | 'Mentoria';
  description: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Cliente' | 'Aluna Academy';
  text: string;
  avatar?: string;
}