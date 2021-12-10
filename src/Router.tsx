import { Route, Switch } from 'react-router';

import { SignIn, Home, SignUp } from './templates';
import { Auth } from './Auth';

export const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      {/* 認証が必要なページをAuthコンポーネントで囲んで監視 */}
      <Auth>
        <Route exact path={'(/)?'} component={Home} />
      </Auth>
    </Switch>
  );
};
