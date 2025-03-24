import { Stock } from '../models';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { ProductStatus } from '../models/ProductStatus';

const products = [
  {
    id: 1,
    name: 'Banana',
    status: ProductStatus.Active,
    category: ProductCategory.Fruit,
    price: 1.99,
    stock: 40,
  },
  {
    id: 2,
    name: 'Carrot',
    status: ProductStatus.Active,
    category: ProductCategory.Vegetables,
    price: 0.89,
    stock: 75,
  },
  {
    id: 3,
    name: 'Apple',
    status: ProductStatus.Inactive,
    category: ProductCategory.Fruit,
    price: 2.5,
    stock: 0,
  },
  {
    id: 4,
    name: 'Beef',
    status: ProductStatus.Active,
    category: ProductCategory.Meat,
    price: 12.99,
    stock: 50,
  },
  {
    id: 5,
    name: 'Lettuce',
    status: ProductStatus.Inactive,
    category: ProductCategory.Vegetables,
    price: 1.2,
    stock: 0,
  },
  {
    id: 6,
    name: 'Chicken',
    status: ProductStatus.Active,
    category: ProductCategory.Meat,
    price: 9.49,
    stock: 30,
  },
  {
    id: 7,
    name: 'Orange',
    status: ProductStatus.Active,
    category: ProductCategory.Fruit,
    price: 2.75,
    stock: 20,
  },
  {
    id: 8,
    name: 'Tomato',
    status: ProductStatus.Inactive,
    category: ProductCategory.Vegetables,
    price: 1.15,
    stock: 10,
  },
  {
    id: 9,
    name: 'Pork',
    status: ProductStatus.Active,
    category: ProductCategory.Meat,
    price: 11.35234,
    stock: 0,
  },
  {
    id: 10,
    name: 'Strawberry',
    status: ProductStatus.Active,
    category: ProductCategory.Fruit,
    price: 3.25542,
    stock: 15,
  },
  {
    id: 11,
    name: 'Broccoli',
    status: ProductStatus.Inactive,
    category: ProductCategory.Vegetables,
    price: 1.75564,
    stock: 5,
  },
  {
    id: 12,
    name: 'Salmon',
    status: ProductStatus.Active,
    category: ProductCategory.Meat,
    price: 14.54343,
    stock: 12,
  },
  {
    id: 13,
    name: 'Pear',
    status: ProductStatus.Inactive,
    category: ProductCategory.Fruit,
    price: 2.35213,
    stock: 0,
  },
  {
    id: 14,
    name: 'Spinach',
    status: ProductStatus.Active,
    category: ProductCategory.Vegetables,
    price: 1.923453,
    stock: 33,
  },
  {
    id: 15,
    name: 'Lamb',
    status: ProductStatus.Inactive,
    category: ProductCategory.Meat,
    price: 13.6,
    stock: 22,
  },
  {
    id: 16,
    name: 'Grapes',
    status: ProductStatus.Active,
    category: ProductCategory.Fruit,
    price: 4.1,
    stock: 60,
  },
];
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
