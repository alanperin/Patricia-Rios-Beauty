
import { useState, useEffect } from 'react';
import { CMS } from '../lib/cms';
import { ServiceItem, UnitConfig, AcademyProduct, Testimonial } from '../types';

/**
 * Hook para buscar Serviços
 */
export const useServices = () => {
  const [data, setData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CMS.getServices().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { services: data, loading };
};

/**
 * Hook para buscar Unidades
 */
export const useUnits = () => {
  const [data, setData] = useState<UnitConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CMS.getUnits().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { units: data, loading };
};

/**
 * Hook para buscar uma Unidade Específica
 */
export const useUnit = (slug?: string) => {
  const [data, setData] = useState<UnitConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      CMS.getUnitBySlug(slug).then((result) => {
        setData(result || null);
        setLoading(false);
      });
    }
  }, [slug]);

  return { unit: data, loading };
};

/**
 * Hook para buscar Produtos Academy
 */
export const useAcademy = () => {
  const [data, setData] = useState<AcademyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CMS.getAcademyProducts().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { products: data, loading };
};

/**
 * Hook para buscar Depoimentos
 */
export const useTestimonials = () => {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CMS.getTestimonials().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { testimonials: data, loading };
};
