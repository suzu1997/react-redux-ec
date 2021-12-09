import { Route, Switch } from 'react-router';

import { SignIn, Home, SignUp } from './templates';

export const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  );
};
