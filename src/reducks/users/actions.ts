import { Order, ProductInCart, UserState } from './types';

export const DELETE_FAVORITE_PRODUCTS = 'DELETE_FAVORITE_PRODUCTS';

export const deleteFavoriteAction = (favorite: Array<any>) => {
  // プレーンなオブジェクトを返す
  return {
    // typeとpayloadを記述する
    type: 'DELETE_FAVORITE_PRODUCTS',
    payload: favorite
  }
};

export const FETCH_FAVORITE_PRODUCTS = 'FETCH_FAVORITE_PRODUCTS';

export const fetchFavoriteProductsAction = (favorite: Array<any>) => {
  // プレーンなオブジェクトを返す
  return {
    // typeとpayloadを記述する
    type: 'FETCH_FAVORITE_PRODUCTS',
    payload: favorite
  }
};

export const FETCH_ORDERS_HISTORY = 'FETCH_ORDERS_HISTORY';

export const fetchOrdersHisrtoryAction = (history: Array<Order>) => {

  // プレーンなオブジェクトを返す
  return {
    // typeとpayloadを記述する
    type: 'FETCH_ORDERS_HISTORY',
    payload: history
  }
};

// Action typeを定義してexport
// reducersでインポートして伝える
export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART';

export const fetchProductsInCartAction = (products: Array<ProductInCart>) => {

  // プレーンなオブジェクトを返す
  return {
    // typeとpayloadを記述する
    type: 'FETCH_PRODUCTS_IN_CART',
    payload: products
  }
};

export const SIGN_IN = 'SIGN_IN';

export const signInAction = (userState: UserState) => {
  // プレーンなオブジェクトを返す
  return {
    // typeとpayloadを記述する
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    }
  }
};

// ログアウト時に実行するアクション
// 初期状態に戻す
export const SIGN_OUT = 'SIGN_OUT';

export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      role: '',
      uid: '',
      username: '',
    }
  }
}