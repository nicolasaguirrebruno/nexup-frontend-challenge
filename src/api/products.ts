import { products } from '../mocks/productsMocks';
import { Stock } from '../models';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

export const getProductList = (
  category?: ProductCategory,
  stockOption?: Stock,
  search?: string,
): Product[] => {
  const isAllCategory = category === ProductCategory.All || !category;
  const isAllStock = stockOption === Stock.All || !stockOption;
  const hasSearch = !!search?.trim();

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

  return filtered;
};
