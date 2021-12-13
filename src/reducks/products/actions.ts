// import { ProductsState } from './types';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

// 商品情報を取得するときのactions
export const fetchProductsAction = (products: Array<any>) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products,
  }
}

