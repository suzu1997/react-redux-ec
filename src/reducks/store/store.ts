import {
  createStore as reduxCreateStore,
  combineReducers,
} from 'redux';

import { UsersReducer } from '../users/reducers';

export type RootState = {
  users: ReturnType<typeof UsersReducer>;
 }

const createStore = () => {
  // reduxのcreateStoreメソッドをreturn
  return reduxCreateStore(
    // combineReducersでstateを生成
    // 分割したReducersをまとめる
    combineReducers({
      users: UsersReducer
    })
  )
}

export default createStore