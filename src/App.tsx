import React from 'react';
import './App.css';
import { ProductManager } from './components/ProductManager';
import { Providers } from './providers/Providers';

const App: React.FC = () => {
  return (
    <Providers>
      <ProductManager />
    </Providers>
  );
};

export default App;
