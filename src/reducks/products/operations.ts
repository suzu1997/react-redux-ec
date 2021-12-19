import type { Dispatch } from 'redux'
import { db, FirebaseTimestamp } from '../../firebase'
import { collection, setDoc, getDocs, doc, orderBy, query, deleteDoc, writeBatch, getDoc, where } from "firebase/firestore";
import { push } from 'connected-react-router';
import type { Image, OrderProduct, Size } from './types';
import { deleteProductAction, fetchProductsAction } from './actions';
import { RootState } from '../store/store';
import { ProductInCart } from '../users/types';

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
export const fetchProducts = (gender: string, category: string, keyword: string) => {
  return async (dispatch: Dispatch) => {
    let q = query(productsRef, orderBy('updated_at', 'desc'));
    if (gender !== '') {
      q = query(productsRef, where('gender', '==', gender), orderBy('updated_at', 'desc'));
    }
    if (category !== '') {
      q = query(productsRef, where('category', '==', category), orderBy('updated_at', 'desc'))
    }

    // firestoreからgetしたデータが全てsnapshotsには入ってくる
    getDocs(q).then((snapshots) => {
      const productList: any[] = [];

      snapshots.forEach((snapshot) => {
        productList.push(snapshot.data());
      });
      // キーワードがなければ全てのデータを返す
      if (keyword === '') {
        dispatch(fetchProductsAction(productList))
      } else {
        // キーワードがある場合は、キーワードに一致するものだけを抽出する
        const filteredProducts = productList.filter((product: any) => product.name.includes(keyword))
        dispatch(fetchProductsAction(filteredProducts))
      }
    });
  }
}

// 商品を注文する
export const orderProduct = (productsInCart: Array<ProductInCart>, amount: number) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().users.uid;
    const userRef = doc(db, 'users', uid);
    const timestamp = FirebaseTimestamp.now();

    // 商品リスト
    let products: Array<OrderProduct> = [];
    // 売切れの商品リスト 名前が入る
    let soldOutProducts: Array<string> = [];

    // Get a new write batch
    const batch = writeBatch(db);
    for (const product of productsInCart) {
      // 現在の在庫状況を確認
      const snapshot = await getDoc(doc(productsRef, product.productId));
      const sizes = snapshot.data()?.sizes;

      const updatedSizes = sizes.map((size: Size) => {
        if (size.size === product.size) {
          // 在庫が足りない場合
          if (size.quantity === '0') {
            soldOutProducts.push(product.name);
            return size;
          }
          // 在庫があれば、商品の在庫を1減らす
          return {
            size: size.size,
            quantity: String(Number(size.quantity) - 1),
          }
        } else {
          return size;
        }
      })
      // 注文履歴登録用のデータを作成
      products = [
        ...products,
        {
          id: product.productId,
          images: product.images,
          name: product.name,
          price: product.price,
          size: product.size,
        }
      ]
      // カート内の在庫を更新
      batch.update(doc(db, 'products', product.productId), { sizes: updatedSizes })

      // カート内から削除
      batch.delete(doc(userRef, 'cart', product.cartId));
    }

    // 在庫切れのものがあれば注文処理を中断
    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
      alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました');
      return;
    } else {
      // 在庫切れでなければ注文履歴を登録
      await batch.commit().then(() => {
        const orderRef = doc(collection(userRef, 'orders'));
        // 現在の日時をDate型に変換
        const date = timestamp.toDate();

        // 配達日時 注文から3日後
        // Date型からfirebaseのタイムスタンプ型に変換
        const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

        const history = {
          amount: amount,
          created_at: timestamp,
          id: orderRef.id,
          products: products,
          shipping_date: shippingDate,
          updated_at: timestamp,
        }
        setDoc(orderRef, history).then(() => {
          dispatch(push('/order/complete'))
        });

      }).catch(() => {
        alert('注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。');
      })
    }
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