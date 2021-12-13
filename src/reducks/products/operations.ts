import type { Dispatch } from 'redux'
import { db, FirebaseTimestamp } from '../../firebase'
import { collection, setDoc, getDocs, doc, orderBy, query, deleteDoc } from "firebase/firestore";
import { push } from 'connected-react-router';
import { Image, Size } from './types';
import { deleteProductAction, fetchProductsAction } from './actions';
import { RootState } from '../store/store';

const productsRef = collection(db, "products");

// 商品を削除する
export const deleteProduct = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // データベースから削除
    deleteDoc(doc(productsRef, id)).then(() => {
      const prevProducts = getState().products.list;
      // 削除した商品以外で、storeの商品リストを更新
      const newProducts = prevProducts.filter((product: any) => product.id !== id);
      dispatch(deleteProductAction(newProducts));
    });
  }
}

// firestoreから商品情報を取得する
export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    const q = query(productsRef, orderBy('updated_at', 'desc'));
    // firestoreからgetしたデータが全てsnapshotsには入ってくる
    getDocs(q).then((snapshots) => {
      const productList: any[] = [];

      snapshots.forEach((snapshot) => {
        productList.push(snapshot.data());
      });
      dispatch(fetchProductsAction(productList))
    });
  }
}

// 商品情報を保存する
export const saveProduct = (id: string, images: Array<Image>, name: string, description: string, category: string, gender: string, price: string, sizes: Array<Size>) => {
  return async (dispatch: Dispatch) => {
    // 現在の時刻をタイムスタンプ型で取得する
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category,
      description,
      gender,
      images,
      name,
      price: parseInt(price, 10), // 10進数の数値に
      sizes,
      updated_at: timestamp,
    }

    let newData;
    // 新しい商品の追加の場合
    // 新しくIDを自動生成
    if (id === '') {
      const ref = doc(productsRef);
      id = ref.id;

      newData = {
        ...data,
        created_at: timestamp,
        id: id,
      }
    } else {
      // 既存の商品の更新の場合
      newData = {
        ...data,
      }
    }
    // 新しい商品情報をデータベースにセット
    return setDoc(doc(productsRef, id), newData, { merge: true }).then(() => {
      dispatch(push('/'))
    }).catch((error) => {
      throw new Error(error);
    });
  }
}