import React, { useEffect } from 'react';

import styles from './styles/productManager.module.css';
import { CategoryFilter } from './CategoryFilter';
import { ProductList } from './ProductList';
import { useProducts } from '../hooks/useProducts';
import { PAGE_INFORMATION_INITIAL_STATE } from '../constants';

export const ProductManager: React.FC = () => {
  const { getProducts } = useProducts();

  useEffect(() => {
    getProducts(PAGE_INFORMATION_INITIAL_STATE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.productManagerContainer}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>See all Nexup&apos;s products!</p>
        </div>

        <div>
          {/* This button doesn't do anything, it's only to get a more realistic interface */}
          <button className={styles.addButton} type="button">
            New product +
          </button>
        </div>
      </header>
      <CategoryFilter />
      <ProductList />
    </section>
  );
};
