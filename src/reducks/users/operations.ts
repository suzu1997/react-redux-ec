import { push } from 'connected-react-router';
import type { Dispatch } from 'redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from '@firebase/auth';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import { fetchProductsInCartAction, signInAction, signOutAction } from './actions';
import { RootState } from '../store/store';
import { ProductInCart } from './types';

// ショッピングカートに商品を追加する
export const addProductToCart = (data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;
    // 'cart' : ユーザーの持つサブコレクション
    const cartRef = doc(collection(db, 'users', uid, 'cart'));

    const addedProduct: ProductInCart = {
      ...data,
      cartId: cartRef.id
    }
    await setDoc(cartRef, addedProduct);
    dispatch(push('/'));
  }
}

// リスナーで監視したカート情報をストアに反映
export const fetchProductsInCart = (products: Array<ProductInCart>) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchProductsInCartAction(products));
  }
}

// 認証をリッスン(監視)する
// 前回のセッションが残っていれば、自動でstoreに認証情報を追加して認証後画面に遷移
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
              cart: userData.cart
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
              cart: userData.cart
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
