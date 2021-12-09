import * as Actions from './actions';
import initialState from '../store/initialState';
import { Action } from './types';

// 第一引数にState(現在のstateの状態)。初期状態をデフォルトとして設定
// 第二引数にactionがreturnした値(typeとpayload)
export const UsersReducer = (state = initialState.users, action: Action) => {
  // Actionsのtypeに応じてstateをどう変更するのか決める
  switch (action.type) {
    case Actions.SIGN_IN:
      // スプレット構文で展開してマージ
      // stateの中身をaction.payloadで上書き
      // action.payloadで指定されていない値がstoreから消えてしまうことを防ぐ
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}