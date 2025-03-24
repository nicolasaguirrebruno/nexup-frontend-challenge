import React from 'react';
import { Product } from '../models/Product';
import styles from './styles/products.module.css';
import { Chip } from './Chip';

interface ProductListProps {
  productList: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productList,
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {productList.map((product) => (
            <tr>
              <Chip status={product.status} />
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
