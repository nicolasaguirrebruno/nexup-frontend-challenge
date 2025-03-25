import React from 'react';
import { Product } from '../models/Product';
import styles from './styles/productList.module.css';
import { Chip, LoadingSpinner } from '../shared';
import { useProducts } from '../hooks/useProducts';

interface ProductListProps {
  productList: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productList,
}) => {
  const formatMoney = (moneyValue: number) => {
    return `$${moneyValue.toFixed(2)}`;
  };

  const { isProductsLoading } = useProducts();
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        {!isProductsLoading &&
          productList.length > 0 &&
          productList.map((product) => (
            <tbody className={styles.tableBody}>
              <tr key={product.id}>
                <td>
                  <Chip status={product.status} />
                </td>

                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{product.stock}</td>
              </tr>
            </tbody>
          ))}
      </table>

      {!isProductsLoading && !productList.length && (
        <div className={styles.spinnerContainer}>
          <p>There are not products with the filters you introduced.</p>
        </div>
      )}

      {isProductsLoading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : null}
    </div>
  );
};
