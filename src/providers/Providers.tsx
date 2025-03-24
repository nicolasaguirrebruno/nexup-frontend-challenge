import React from 'react';
import { ProductsProvider } from '../contexts/ProductsContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};
