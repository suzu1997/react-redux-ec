import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';

import { UsersReducer } from '../users/reducers';

export type RootState = {
  users: ReturnType<typeof UsersReducer>;
  router: ReturnType<typeof connectRouter>;
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
      users: UsersReducer
    }),
    // ルーターをmiddlewareとして使用することを宣言
    applyMiddleware(
      routerMiddleware(history)
    )
  )
}

export default createStore