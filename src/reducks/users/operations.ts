import { push } from 'connected-react-router';
import type { Dispatch } from 'redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from '@firebase/auth';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { getDoc, setDoc, doc, collection, query, orderBy, getDocs, deleteDoc } from "firebase/firestore";
import { deleteFavoriteAction, fetchFavoriteProductsAction, fetchOrdersHisrtoryAction, fetchProductsInCartAction, signInAction, signOutAction, updateUserInfoAction } from './actions';
import { RootState } from '../store/store';
import { ProductInCart } from './types';
import toast from 'react-hot-toast';

// ユーザー情報を更新する
export const updateUserInfo = (name: string, email: string, phone: string, zipcode: string, address: string, birthDate: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;

    const userRef = doc(db, 'users', uid);

    const data = {
      name,
      email,
      phone,
      zipcode,
      address,
      birthDate,
    }
    console.log('operations', data);

    // 新しいユーザー情報をデータベースにセット
    await setDoc(userRef, data, { merge: true });

    // ユーザーの情報を取得
    getDoc(userRef).then((snapshot) => {
      const userData = snapshot.data();
      if (userData) {
        // ストアの中身を更新
        dispatch(updateUserInfoAction({
          address: userData.address,
          birthDate: userData.birthDate,
          cart: userData.cart,
          email: userData.email,
          isSignedIn: true,
          orders: userData.orders,
          phone: userData.phone,
          role: userData.role,
          uid: uid,
          username: userData.username,
          zipcode: userData.zipcode,
        }))
      }
    });

    dispatch(push('/user/myPage'));
    toast.success('会員情報を保存しました');
  }
}

// お気に入りから商品を削除する
export const removeFavorite = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;

    const favoriteRef = doc(db, 'users', uid, 'favorite', id);
    // データベースから削除
    deleteDoc(favoriteRef).then(() => {
      const prevFavorite = getState().users.favorite;
      // 削除した商品以外で、お気に入りリストを更新
      const newFavorite = prevFavorite.filter((product: any) => product.id !== id);
      dispatch(deleteFavoriteAction(newFavorite));
    });

  }
}

// お気に入りリストに商品を追加する
export const addProductToFavorite = (data: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;
    // 'favorite' : ユーザーの持つサブコレクション
    const favoriteRef = doc(collection(db, 'users', uid, 'favorite'));

    const product = {
      ...data,
      id: favoriteRef.id
    }
    await setDoc(favoriteRef, product);
    toast.success('お気に入りに追加しました');
  }
}

// お気に入りリストを取得する
export const fetchFavoriteProducts = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;
    const list: Array<any> = [];

    const favoriteRef = collection(db, 'users', uid, 'favorite');
    const q = query(favoriteRef, orderBy('added_at', 'desc'));
    getDocs(q).then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push(data);
      })
      dispatch(fetchFavoriteProductsAction(list));
    });
  }
}

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
    toast.success('商品をカートに追加しました');
    dispatch(push('/'));
  }
}

// 注文履歴を取得する
export const fetchOrdersHistory = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;
    const list: Array<any> = [];

    const ordersRef = collection(db, 'users', uid, 'orders');
    const q = query(ordersRef, orderBy('updated_at', 'desc'));
    getDocs(q).then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const data = snapshot.data();
        list.push(data);
      })
      dispatch(fetchOrdersHisrtoryAction(list));
    });
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
              address: userData.address,
              birthDate: userData.birthDate,
              cart: userData.cart,
              email: userData.email,
              isSignedIn: true,
              orders: userData.orders,
              phone: userData.phone,
              role: userData.role,
              uid: uid,
              username: userData.username,
              zipcode: userData.zipcode,
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
      toast.error('必須項目が未入力です');
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      toast.success('入力されたアドレスにパスワードリセット用のメールを送信しました。');
      dispatch(push('/signin'));
    }).catch(() => {
      toast.error('パスワードリセットに失敗しました。通信状態を確認してください。');
    })
  }
}

// ログインを行う
export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    // validation
    if (email === '' || password === '') {
      toast.error('必須項目が未入力です');
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
              address: userData.address,
              birthDate: userData.birthDate,
              cart: userData.cart,
              email: userData.email,
              isSignedIn: true,
              orders: userData.orders,
              phone: userData.phone,
              role: userData.role,
              uid: uid,
              username: userData.username,
              zipcode: userData.zipcode,
            }))
            dispatch(push('/'));
          }
        });
        toast.success('ログインしました');
      }
    }).catch(() => {
      toast.error('メールアドレス、またはパスワードが間違っています。');
    });
  }
}
// アカウント登録を行う
export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    // validation
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      toast.error('必須項目が未入力です');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('パスワードが一致しません。もう一度お試しください。');
      return;
    };
    if (password.length < 6) {
      toast.error('パスワードは6文字以上で入力してください。');
      return;
    }
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
        toast.success('新規登録が完了しました');
      }
    }).catch((error) => {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        toast.error('新規登録に失敗しました。既に登録されているメールアドレスです。');
      }
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        toast.error('新規登録に失敗しました。不正な形式のメールアドレスです。');
      }
      if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        toast.error('新規登録に失敗しました。パスワードは6文字以上で入力してください。');
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
      toast.success('ログアウトしました');
    })
  }
}
