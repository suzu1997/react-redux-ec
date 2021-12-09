import { push } from 'connected-react-router';
import type { Dispatch } from 'redux';

import { signInAction } from './actions';
import { RootState } from '../store/store';

export const signIn = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const URL = 'https://api.github.com/users/suzu1997';
      const response = await fetch(URL).then(res => res.json());
      const username = response.login;
      const uid = response.id;

      dispatch(signInAction({
        uid: uid,
// アカウント登録を行う
export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    // validation
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      return;
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください。');
      return;
    };
    return createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      // アカウント登録が成功したら、ユーザー情報をFirestoreに保存する
      if (user) {
        const uid = user.uid;
        // 登録した時刻
        const timestamp = FirebaseTimestamp.now();

        const userInitialDate = {
          created_at: timestamp,
          email: email,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username
        }
        console.log({ userInitialDate });

        // ユーザー情報をデータベースに登録する
        setDoc(doc(db, 'users', uid), userInitialDate).then(() => {
          dispatch(push('/'));
        });
      }
    })
  }
}