import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const productsSelector = (state: RootState) => state.products;

export const getProductList = createSelector(
  [productsSelector],
  (state) => state.list
)