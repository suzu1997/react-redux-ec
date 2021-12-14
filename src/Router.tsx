import { Route, Switch } from 'react-router';

import {
  SignIn,
  SignUp,
  ResetPass,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
} from './templates';
import { Auth } from './Auth';

export const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/resetPassword'} component={ResetPass} />
      {/* 認証が必要なページをAuthコンポーネントで囲んで監視 */}
      <Auth>
        {/* ルートパスで商品一覧を表示 */}
        <Route exact path={'(/)?'} component={ProductList} />
        <Route exact path={'/product/:id'} component={ProductDetail} />
        {/* /product/editは商品の新規追加URL */}
        {/* /product/edit/:id は既存商品の編集URL*/}
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
        <Route exact path={'/cart'} component={CartList} />
        <Route exact path={'/order/confirm'} component={OrderConfirm} />
      </Auth>
    </Switch>
  );
};
