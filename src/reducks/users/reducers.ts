import * as Actions from './actions';
import initialState from '../store/initialState';
import { Action } from './types';

// 第一引数にState(現在のstateの状態)。初期状態をデフォルトとして設定
// 第二引数にactionがreturnした値(typeとpayload)
export const UsersReducer = (state = initialState.users, action: Action) => {
  // Actionsのtypeに応じてstateをどう変更するのか決める
  switch (action.type) {
    case Actions.DELETE_FAVORITE_PRODUCTS:
      return {
        ...state,
        favorite: [...action.payload],
      }
    case Actions.FETCH_FAVORITE_PRODUCTS:
      return {
        ...state,
        favorite: [...action.payload],
      }
    case Actions.FETCH_ORDERS_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      }
    case Actions.FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      }
    case Actions.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SIGN_IN:
      // スプレット構文で展開してマージ
      // stateの中身をaction.payloadで上書き
      // action.payloadで指定されていない値がstoreから消えてしまうことを防ぐ
      return {
        ...state,
        ...action.payload
      }
    case Actions.SIGN_OUT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}