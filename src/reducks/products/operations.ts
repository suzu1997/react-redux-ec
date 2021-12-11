import type { Dispatch } from 'redux'
import { db, FirebaseTimestamp } from '../../firebase'
import { collection, setDoc, doc } from "firebase/firestore";
import { push } from 'connected-react-router';
import { Image } from './types';

const productsRef = collection(db, "products");

// 商品情報を保存する
export const saveProduct = (images: Array<Image>, name: string, description: string, category: string, gender: string, price: string) => {
  return async (dispatch: Dispatch) => {
    // 現在の時刻をタイムスタンプ型で取得する
    const timestamp = FirebaseTimestamp.now();
    console.log(timestamp);

    const data = {
      category,
      description,
      gender,
      images,
      name,
      price: parseInt(price, 10), // 10進数の数値に
      updated_at: timestamp,
    }

    const ref = doc(productsRef);
    console.log(productsRef);
    console.log(ref);

    const id = ref.id;
    const newData = {
      ...data,
      created_at: timestamp,
      id: id,
    }
    // 新しい商品情報をデータベースにセット
    return setDoc(ref, newData).then(() => {
      dispatch(push('/'))
    }).catch((error) => {
      throw new Error(error);
    });
  }
}