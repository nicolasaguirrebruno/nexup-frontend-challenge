import React from 'react';
import styled from 'styled-components';
import { ProductStatus } from '../models/ProductStatus';
import { STATUS_COLORS } from '../constants/colorStatus';

interface ChipProps {
  status: ProductStatus;
}

const ChipWrapper = styled.div<ChipProps>`
  background-color: ${({ status }) => STATUS_COLORS[status].background};
  color: ${({ status }) => STATUS_COLORS[status].text};
  border: 1px solid ${({ status }) => STATUS_COLORS[status].border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-block;
`;

export const Chip = ({ status }: ChipProps) => {
  return <ChipWrapper status={status}>{status}</ChipWrapper>;
};
