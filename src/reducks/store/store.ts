import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { History } from 'history';
import thunk from 'redux-thunk';

import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';

export type RootState = {
  users: ReturnType<typeof UsersReducer>;
  products: ReturnType<typeof ProductsReducer>;
  router: RouterState;
}
// history: パスの情報が入ったもの
const createStore = (history: History) => {
  // reduxのcreateStoreメソッドをreturn
  return reduxCreateStore(
    // combineReducersでstateを生成
    // 分割したReducersをまとめる
    combineReducers({
      // パスの情報をstoreで管理できるように
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer
    }),
    // ルーターをmiddlewareとして使用することを宣言
    applyMiddleware(
      routerMiddleware(history),
      thunk // redux-thunkを導入
    )
  )
}

export default createStore