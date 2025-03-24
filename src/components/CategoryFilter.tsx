import { useEffect, useState } from 'react';
import { ProductCategory, Stock } from '../models';
import styles from './styles/products.module.css';
import { useProducts } from '../hooks/useProducts';

export const CategoryFilter = () => {
  const {
    changeProductCategoryFilter,
    changeStockOptionFilter,
    handleProductSearch,
    selectedCategory,
    selectedStock,
  } = useProducts();

  const [productSearch, setProductSearch] = useState('');

  const handleFullTextSearch = (search: string) => {
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;

    if (onlyLettersRegex.test(search.trim())) {
      setProductSearch(search);
    }
  };

  const handleCategoryChange = (category: ProductCategory | '') => {
    changeProductCategoryFilter(category);
  };

  const handleStockFilterChange = (stockOption: Stock | '') => {
    changeStockOptionFilter(stockOption);
  };

  const restartFilters = () => {
    handleCategoryChange('');
    handleStockFilterChange('');
    setProductSearch('');
  };

  useEffect(() => {
    handleProductSearch(productSearch);
  }, [productSearch, handleProductSearch]);

  return (
    <section className={styles.filterContainer}>
      <input
        value={productSearch}
        placeholder="Search products by name or category"
        onChange={(e) => handleFullTextSearch(e.target.value as string)}
        className={styles.searchInput}
        type="text"
      />
      <select
        value={selectedCategory ?? ''}
        onChange={(e) =>
          handleCategoryChange(e.target.value as ProductCategory)
        }
        className={styles.select}
      >
        <option disabled={!!selectedCategory} value="">
          Categories
        </option>
        {Object.keys(ProductCategory).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedStock ?? ''}
        onChange={(e) => handleStockFilterChange(e.target.value as Stock)}
        className={styles.select}
      >
        <option disabled={!!selectedStock} value="">
          Stock
        </option>
        {Object.keys(Stock).map((key) => (
          <option key={key} value={Stock[key as keyof typeof Stock]}>
            {Stock[key as keyof typeof Stock]}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={restartFilters}
        className={styles.refreshButton}
      >
        Restart filters
      </button>
    </section>
  );
};
