import { Product } from "../../models";

export interface PaginatedProductResult {
    products: Product[];
    totalPages: number;
  }
  