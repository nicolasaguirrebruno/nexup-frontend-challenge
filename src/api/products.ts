import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { ProductStatus } from '../models/ProductStatus';

// Change the return type if necessary
export const getProductList = (): Product[] => {
  return [
    {
      id: 1,
      name: 'Banana',
      status: ProductStatus.Active,
      category: ProductCategory.Fruit,
      price: 1.99,
    },
    {
      id: 2,
      name: 'Carrot',
      status: ProductStatus.Active,
      category: ProductCategory.Vegetables,
      price: 0.89,
    },
    {
      id: 3,
      name: 'Apple',
      status: ProductStatus.Inactive,
      category: ProductCategory.Fruit,
      price: 2.5,
    },
    {
      id: 4,
      name: 'Beef',
      status: ProductStatus.Active,
      category: ProductCategory.Meat,
      price: 12.99,
    },
    {
      id: 5,
      name: 'Lettuce',
      status: ProductStatus.Inactive,
      category: ProductCategory.Vegetables,
      price: 1.2,
    },
    {
      id: 6,
      name: 'Chicken',
      status: ProductStatus.Active,
      category: ProductCategory.Meat,
      price: 9.49,
    },
    {
      id: 7,
      name: 'Orange',
      status: ProductStatus.Active,
      category: ProductCategory.Fruit,
      price: 2.75,
    },
    {
      id: 8,
      name: 'Tomato',
      status: ProductStatus.Inactive,
      category: ProductCategory.Vegetables,
      price: 1.15,
    },
    {
      id: 9,
      name: 'Pork',
      status: ProductStatus.Active,
      category: ProductCategory.Meat,
      price: 11.3,
    },
    {
      id: 10,
      name: 'Strawberry',
      status: ProductStatus.Active,
      category: ProductCategory.Fruit,
      price: 3.25,
    },
    {
      id: 11,
      name: 'Broccoli',
      status: ProductStatus.Inactive,
      category: ProductCategory.Vegetables,
      price: 1.75,
    },
    {
      id: 12,
      name: 'Salmon',
      status: ProductStatus.Active,
      category: ProductCategory.Meat,
      price: 14.5,
    },
    {
      id: 13,
      name: 'Pear',
      status: ProductStatus.Inactive,
      category: ProductCategory.Fruit,
      price: 2.35,
    },
    {
      id: 14,
      name: 'Spinach',
      status: ProductStatus.Active,
      category: ProductCategory.Vegetables,
      price: 1.9,
    },
    {
      id: 15,
      name: 'Lamb',
      status: ProductStatus.Inactive,
      category: ProductCategory.Meat,
      price: 13.6,
    },
    {
      id: 16,
      name: 'Grapes',
      status: ProductStatus.Active,
      category: ProductCategory.Fruit,
      price: 4.1,
    },
  ];
};
