import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ProductCategory } from '../models/ProductCategory';
import { Product } from '../models/Product';
import { getProductList } from '../api/products';

interface ProductsContextType {
  products: Product[];
  getProducts: (category?: ProductCategory) => Promise<void>;
  changeProductCategoryFilter: (category: ProductCategory) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = useCallback(async (category?: ProductCategory) => {
    const products = await getProductList();

    if (!category) {
      setProducts(products);
      return;
    }

    const filteredProducts = products.filter(
      (product) => product.category === category,
    );

    setProducts(filteredProducts);
  }, []);

  const changeProductCategoryFilter = useCallback(
    async (category: ProductCategory) => {
      await getProducts(category);
    },
    [getProducts],
  );

  const value = useMemo(
    () => ({
      products,
      getProducts,
      changeProductCategoryFilter,
    }),
    [products, getProducts, changeProductCategoryFilter],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
