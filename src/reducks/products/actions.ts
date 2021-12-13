// import { ProductsState } from './types';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

// 商品情報を取得するときのactions
export const fetchProductsAction = (products: Array<any>) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products,
  }
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProductAction = (products: Array<any>) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: products,
  }
}

