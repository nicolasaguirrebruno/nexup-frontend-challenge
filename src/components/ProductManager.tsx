import React, { useEffect } from 'react';

import styles from './styles/products.module.css';
import { CategoryFilter } from './CategoryFilter';
import { ProductList } from './ProductList';
import { useProducts } from '../hooks/useProducts';

export const ProductManager: React.FC = () => {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <section className={styles.productManagerContainer}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>See all Nexup&apos;s products!</p>
        </div>

        <div>
          <button className={styles.addButton} type="button">
            New product +
          </button>
        </div>
      </header>
      <CategoryFilter />
      <ProductList productList={products} />
    </section>
  );
};
