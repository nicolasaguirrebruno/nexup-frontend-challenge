import { products } from '../mocks/productsMocks';
import { Stock, PaginateInformation, ProductCategory } from '../models';
import { PaginatedProductResult } from './types/Products';

export const getProductList = (
  paginateInformation: PaginateInformation,
  category?: ProductCategory,
  stockOption?: Stock,
  search?: string,
): PaginatedProductResult => {
  const isAllCategory = category === ProductCategory.All || !category;
  const isAllStock = stockOption === Stock.All || !stockOption;
  const hasSearch = !!search?.trim();
  const { currentPage, itemsPerPage } = paginateInformation;
  let filtered = [...products];

  if (!isAllCategory) {
    filtered = filtered.filter((product) => product.category === category);
  }

  if (!isAllStock) {
    filtered = filtered.filter((product) =>
      stockOption === Stock.HasStock ? product.stock > 0 : product.stock <= 0,
    );
  }

  if (hasSearch) {
    filtered = filtered.filter((product) => {
      const productString =
        `${product.name} ${product.category} `.toLowerCase();
      return productString.includes(search!.toLowerCase());
    });
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    products: filtered.slice(startIndex, endIndex),
    totalPages: Math.ceil(filtered.length / itemsPerPage),
  };
};
