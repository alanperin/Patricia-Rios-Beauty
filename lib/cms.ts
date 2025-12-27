
import { SERVICES, UNITS, ACADEMY_PRODUCTS, TESTIMONIALS } from '../constants';
import { ServiceItem, UnitConfig, AcademyProduct, Testimonial } from '../types';

/**
 * CMS SERVICE LAYER
 * ------------------------------------------------------------------
 * Esta camada atua como uma ponte entre o Frontend e a Fonte de Dados.
 * Atualmente, ela simula chamadas assíncronas usando os dados de 'constants.ts'.
 * 
 * Na Fase 4 (Migração), substituiremos o conteúdo destas funções por
 * chamadas ao cliente do Sanity.io (ex: client.fetch(query)).
 */

// Tempo de resposta simulado (em ms) para testar os estados de loading
const SIMULATED_DELAY = 600;

export const CMS = {
  /**
   * Busca todos os serviços do catálogo
   */
  getServices: async (): Promise<ServiceItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(SERVICES), SIMULATED_DELAY);
    });
  },

  /**
   * Busca todas as unidades (Lofts)
   * Nota: Converte o objeto Record original para Array, padrão de APIs CMS
   */
  getUnits: async (): Promise<UnitConfig[]> => {
    return new Promise((resolve) => {
      const unitsArray = Object.values(UNITS);
      setTimeout(() => resolve(unitsArray), SIMULATED_DELAY);
    });
  },
  
  /**
   * Busca uma unidade específica pelo Slug
   */
  getUnitBySlug: async (slug: string): Promise<UnitConfig | undefined> => {
     return new Promise((resolve) => {
        const unit = Object.values(UNITS).find(u => u.slug === slug);
        setTimeout(() => resolve(unit), SIMULATED_DELAY);
     });
  },

  /**
   * Busca produtos da Academy (Cursos/Mentorias)
   */
  getAcademyProducts: async (): Promise<AcademyProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ACADEMY_PRODUCTS), SIMULATED_DELAY);
    });
  },

  /**
   * Busca depoimentos
   */
  getTestimonials: async (): Promise<Testimonial[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(TESTIMONIALS), SIMULATED_DELAY);
    });
  }
};
