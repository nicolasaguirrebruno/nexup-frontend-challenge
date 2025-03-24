import { ProductStatus } from '../models';

type StatusColorConfig = {
  border: string;
  text: string;
  background: string;
};

export const STATUS_COLORS: Record<ProductStatus, StatusColorConfig> = {
  [ProductStatus.Active]: {
    border: '#24BBA1',
    text: '#167061',
    background: '#D9FFDD',
  },
  [ProductStatus.Inactive]: {
    border: '#C1121F',
    text: '#C1121F',
    background: '#FFEAEB',
  },
};
