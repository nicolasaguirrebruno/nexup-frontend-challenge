import styles from './styles/products.module.css';
import { ProductCategory, Stock } from '../models';

export const CategoryFilter = () => {
  return (
    <section className={styles.filterContainer}>
      <input
        placeholder="Search products"
        className={styles.searchInput}
        type="text"
      />
      <select className={styles.select}>
        {Object.keys(ProductCategory).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select className={styles.select}>
        {Object.keys(Stock).map((key) => (
          <option key={key} value={Stock[key as keyof typeof Stock]}>
            {Stock[key as keyof typeof Stock]}
          </option>
        ))}
      </select>
    </section>
  );
};
