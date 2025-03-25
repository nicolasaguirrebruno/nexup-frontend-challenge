import styles from './styles/productList.module.css';
import { Chip, LoadingSpinner } from '../shared';
import { useProducts } from '../hooks/useProducts';

export const ProductList = () => {
  const formatMoney = (moneyValue: number) => {
    return `$${moneyValue.toFixed(2)}`;
  };

  const { isProductsLoading, paginateInformation, products, handlePageChange } =
    useProducts();
  const isNextDisabled =
    paginateInformation.currentPage === paginateInformation.maxPage;

  const isPreviousDisabled = paginateInformation.currentPage === 1;
  return (
    <section className={styles.container}>
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
            products.length > 0 &&
            products.map((product) => (
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

        {!isProductsLoading && !products.length && (
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
      <div className={styles.tableFooterContainer}>
        {products && products.length > 0 && (
          <tfoot className={styles.tableFooter}>
            <button
              className={
                isPreviousDisabled || isProductsLoading
                  ? styles.disabledFooterButton
                  : styles.footerButton
              }
              onClick={() => handlePageChange('previous')}
              disabled={isPreviousDisabled}
              type="button"
            >
              Previous
            </button>
            <input
              className={styles.input}
              value={paginateInformation.currentPage}
              type="text"
              disabled
            />
            <button
              className={
                isNextDisabled || isProductsLoading
                  ? styles.disabledFooterButton
                  : styles.footerButton
              }
              onClick={() => handlePageChange('next')}
              type="button"
              disabled={isNextDisabled}
            >
              Next
            </button>
          </tfoot>
        )}
      </div>
    </section>
  );
};
