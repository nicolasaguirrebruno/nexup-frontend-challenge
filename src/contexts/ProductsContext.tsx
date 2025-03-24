import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { getProductList } from '../api/products';
import { Product, ProductCategory, Stock } from '../models';

interface ProductsContextType {
  products: Product[];
  getProducts: (
    category?: ProductCategory,
    stockOption?: Stock,
    search?: string,
  ) => Promise<void>;
  changeProductCategoryFilter: (
    category: ProductCategory | '',
  ) => Promise<void>;
  changeStockOptionFilter: (stockOption: Stock | '') => Promise<void>;
  isProductsLoading: boolean;
  productsFetchError: boolean;
  selectedCategory?: ProductCategory;
  selectedStock?: Stock;
  handleProductSearch: (search: string) => void;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productsFetchError, setProductsFetchError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [selectedStock, setSelectedStock] = useState<Stock>();

  const getProducts = useCallback(
    async (
      category?: ProductCategory,
      stockOption?: Stock,
      search?: string,
    ) => {
      try {
        setIsProductsLoading(true);
        const fetchedProducts = await new Promise<Product[]>((resolve) => {
          setTimeout(async () => {
            const data = await getProductList(category, stockOption, search);
            resolve(data);
          }, 500);
        });

        setProducts(fetchedProducts);
      } catch (error) {
        setProductsFetchError(true);
      } finally {
        setIsProductsLoading(false);
      }
    },
    [],
  );

  const changeProductCategoryFilter = useCallback(
    async (category: ProductCategory | '') => {
      if (category === '') {
        setSelectedCategory(undefined);
        await getProducts(undefined, selectedStock);
        return;
      }

      setSelectedCategory(category);
      await getProducts(category, selectedStock);
    },
    [getProducts, selectedStock],
  );

  const changeStockOptionFilter = useCallback(
    async (stockOption: Stock | '') => {
      if (stockOption === '') {
        setSelectedStock(undefined);
        await getProducts(selectedCategory, undefined);
        return;
      }

      setSelectedStock(stockOption);
      await getProducts(selectedCategory, stockOption);
    },
    [getProducts, selectedCategory],
  );

  const handleProductSearch = useCallback(
    (search: string) => {
      getProducts(selectedCategory, selectedStock, search);
    },
    [getProducts, selectedCategory, selectedStock],
  );

  const value = useMemo(
    () => ({
      products,
      getProducts,
      changeProductCategoryFilter,
      changeStockOptionFilter,
      isProductsLoading,
      productsFetchError,
      selectedCategory,
      selectedStock,
      handleProductSearch,
    }),
    [
      products,
      getProducts,
      changeProductCategoryFilter,
      changeStockOptionFilter,
      isProductsLoading,
      productsFetchError,
      selectedCategory,
      selectedStock,
      handleProductSearch,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
