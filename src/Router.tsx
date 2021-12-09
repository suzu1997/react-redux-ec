import { Route, Switch } from 'react-router';

import { Login, Home } from './templates';

export const Router = () => {
  return (
    <Switch>
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  );
}; 
