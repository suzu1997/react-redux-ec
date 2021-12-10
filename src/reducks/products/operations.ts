import type { Dispatch } from 'redux'
import { db, FirebaseTimestamp } from '../../firebase'
import { collection, setDoc, doc } from "firebase/firestore";
import { push } from 'connected-react-router';

const productsRef = collection(db, "products");

// 商品情報を保存する
export const saveProduct = (name: string, description: string, category: string, gender: string, price: string) => {
  return async (dispatch: Dispatch) => {
    // 現在の時刻をタイムスタンプ型で取得する
    const timestamp = FirebaseTimestamp.now();
    console.log(timestamp);

    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
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

    return setDoc(ref, newData).then(() => {
      dispatch(push('/'))
    }).catch((error) => {
      throw new Error(error);
    });
  }
}