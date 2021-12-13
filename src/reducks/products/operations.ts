import type { Dispatch } from 'redux'
import { db, FirebaseTimestamp } from '../../firebase'
import { collection, setDoc, getDocs, doc, orderBy, query } from "firebase/firestore";
import { push } from 'connected-react-router';
import { Image, Size } from './types';
import { fetchProductsAction } from './actions';

const productsRef = collection(db, "products");

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