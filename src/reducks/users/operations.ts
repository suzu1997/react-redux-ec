import { push } from 'connected-react-router';
import type { Dispatch } from 'redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { signInAction } from './actions';


// ログインを行う
export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    // validation
    if (email === '' || password === '') {
      alert('必須項目が未入力です');
      return;
    }
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        getDoc(doc(db, "users", uid)).then((snapshot) => {
          const userData = snapshot.data();
          if (userData) {
            dispatch(signInAction({
              isSignedIn: true,
              role: userData.role,
              uid: uid,
              username: userData.username,
            }))
            dispatch(push('/'));
          }
        });
      }
    })
  }
}
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