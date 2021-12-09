import { UserState } from './types';

// Action typeを定義してexport
// reducersでインポートして伝える
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
      username: userState.username
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
      uid: '',
      username: ''
    }
  }
}