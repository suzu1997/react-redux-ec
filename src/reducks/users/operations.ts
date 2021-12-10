import { push } from 'connected-react-router';
import type { Dispatch } from 'redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from '@firebase/auth';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { getDoc, setDoc, doc } from "firebase/firestore";
import { signInAction, signOutAction } from './actions';

// 認証をリッスン(監視)する
export const ListenAuthState = () => {
  return async (dispatch: Dispatch) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合
        const uid = user.uid;
        // ユーザーの情報を取得
        getDoc(doc(db, "users", uid)).then((snapshot) => {
          const userData = snapshot.data();
          if (userData) {
            // ストアの中身を更新
            dispatch(signInAction({
              isSignedIn: true,
              role: userData.role,
              uid: uid,
              username: userData.username,
            }))
          }
        });
      } else {
        // ユーザーがログインしていない場合、ログインページに飛ぶ
        dispatch(push('/signin'));
      }
    });
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
     // validation
     if (email === '') {
      alert('必須項目が未入力です');
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      alert('入力されたアドレスにパスワードリセット用のメールを送信しました。');
      dispatch(push('/signin'));
    }).catch(() => {
      alert('パスワードリセットに失敗しました。通信状態を確認してください。');
    })
  }
}

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
        // ユーザーの情報を取得
        getDoc(doc(db, "users", uid)).then((snapshot) => {
          const userData = snapshot.data();
          if (userData) {
            // ストアの中身を更新
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

// ログアウトする
export const signOut = () => {
  return async (dispatch: Dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    })
  }
}
