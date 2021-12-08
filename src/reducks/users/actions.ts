// Action typeを定義してexport
// reducersでインポートして伝える
export const SIGN_IN = 'SIGN_IN';

type UserState = {
  uid: string;
  username: string;
}

export const signInAction = (userState: UserState) => {
  // プレーンなオブジェクトを返す
  return {
    // typeとpayloadを記述する
     type: 'SIGN_IN',
     payload: {
        isSignedIn: true,
        uid : userState.uid,
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