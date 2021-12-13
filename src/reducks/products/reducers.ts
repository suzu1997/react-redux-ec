import * as Actions from './actions';
import initialState from '../store/initialState';
import { Action } from './types';

// 第一引数にState(現在のstateの状態)。初期状態をデフォルトとして設定
// 第二引数にactionがreturnした値(typeとpayload)
export const ProductsReducer = (state = initialState.products, action: Action) => {
  // Actionsのtypeに応じてstateをどう変更するのか決める
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      }
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state;
  }
}