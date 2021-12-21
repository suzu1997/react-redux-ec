import { Route, Switch } from 'react-router';

import {
  SignIn,
  SignUp,
  ResetPass,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  FavoriteList,
  OrderConfirm,
  OrderComplete,
  OrderHistory,
  Mypage,
  MypageEdit,
} from './templates';
import { Auth } from './Auth';

export const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/resetPassword'} component={ResetPass} />
      <Route exact path={'(/)?'} component={ProductList} />
      <Route exact path='/product/detail/:id' component={ProductDetail} />
      {/* 認証が必要なページをAuthコンポーネントで囲んで監視 */}
      <Auth>
        {/* ルートパスで商品一覧を表示 */}
        {/* /product/editは商品の新規追加URL */}
        {/* /product/edit/:id は既存商品の編集URL*/}
        <Route path='/product/edit(/:id)?' component={ProductEdit} />
        <Route exact path={'/cart'} component={CartList} />
        <Route exact path={'/order/confirm'} component={OrderConfirm} />
        <Route exact path={'/order/complete'} component={OrderComplete} />
        <Route exact path={'/order/history'} component={OrderHistory} />
        <Route exact path={'/favorite'} component={FavoriteList} />
        <Route exact path={'/user/myPage'} component={Mypage} />
        <Route exact path={'/user/myPage/edit'} component={MypageEdit} />
      </Auth>
    </Switch>
  );
};
