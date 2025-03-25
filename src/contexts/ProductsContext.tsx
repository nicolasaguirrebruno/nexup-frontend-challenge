import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getProductList } from '../api/products';
import { Product, ProductCategory, Stock } from '../models';
import { PaginateInformation } from '../models/paginateInformation';
import { PaginatedProductResult } from '../api/types/Products';
import { PAGE_INFORMATION_INITIAL_STATE } from '../constants';

type PageChange = 'next' | 'previous';

interface ProductsContextType {
  products: Product[];
  getProducts: (paginateInformation: PaginateInformation) => Promise<void>;
  changeProductCategoryFilter: (
    category: ProductCategory | '',
  ) => Promise<void>;
  changeStockOptionFilter: (stockOption: Stock | '') => Promise<void>;
  isProductsLoading: boolean;
  productsFetchError: boolean;
  selectedCategory?: ProductCategory;
  selectedStock?: Stock;
  paginateInformation: PaginateInformation;
  handleProductSearch: (search: string) => void;
  handlePageChange: (change: PageChange) => void;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productsFetchError, setProductsFetchError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [selectedStock, setSelectedStock] = useState<Stock>();
  const [paginateInformation, setPaginateInformation] =
    useState<PaginateInformation>(PAGE_INFORMATION_INITIAL_STATE);

  const [search, setSearch] = useState('');
  const { currentPage, maxPage, itemsPerPage } = paginateInformation;
  const getProducts = useCallback(
    async (page: PaginateInformation) => {
      try {
        setIsProductsLoading(true);
        const finalPageInformation = page || PAGE_INFORMATION_INITIAL_STATE;

        const { products: fetchedProducts, totalPages } =
          await new Promise<PaginatedProductResult>((resolve) => {
            setTimeout(async () => {
              const data = await getProductList(
                finalPageInformation,
                selectedCategory,
                selectedStock,
                search,
              );
              resolve(data);
            }, 500);
          });

        setProducts(fetchedProducts);
        setPaginateInformation({
          ...page,
          maxPage: totalPages,
        });
      } catch (error) {
        // I won't use this, it's just for realism.
        setProductsFetchError(true);
      } finally {
        setIsProductsLoading(false);
      }
    },
    [search, selectedCategory, selectedStock],
  );

  useEffect(() => {
    const resetPage = {
      ...PAGE_INFORMATION_INITIAL_STATE,
    };
    getProducts(resetPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedStock, search]);

  const changeProductCategoryFilter = useCallback(
    async (category: ProductCategory | '') => {
      setSelectedCategory(category || undefined);
    },
    [],
  );

  const changeStockOptionFilter = useCallback(
    async (stockOption: Stock | '') => {
      setSelectedStock(stockOption || undefined);
    },
    [],
  );

  const handleProductSearch = useCallback((productSearch: string) => {
    setSearch(productSearch);
  }, []);

  const handlePageChange = useCallback(
    (change: PageChange) => {
      let newPage = currentPage;

      if (change === 'next' && currentPage < maxPage) {
        newPage = currentPage + 1;
      }

      if (change === 'previous' && currentPage > 1) {
        newPage = currentPage - 1;
      }

      const newPageInfo: PaginateInformation = {
        currentPage: newPage,
        maxPage,
        itemsPerPage,
      };

      getProducts(newPageInfo);
    },
    [currentPage, maxPage, itemsPerPage, getProducts],
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
      handlePageChange,
      paginateInformation,
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
      handlePageChange,
      paginateInformation,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
